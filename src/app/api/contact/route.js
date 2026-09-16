import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Sends the enquiry to your inbox via SMTP. Configure these env vars:
// EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO (recipient address).
async function sendEnquiryEmail(payload) {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
    console.warn("Email not sent: EMAIL_HOST/EMAIL_USER/EMAIL_PASS/EMAIL_TO not configured.");
    return false;
  }
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Tendrils Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: payload.email,
      subject: `New enquiry from ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company || "Not specified"}`,
        `Website: ${payload.website || "Not specified"}`,
        `Service: ${payload.service || "Not specified"}`,
        "",
        payload.message,
      ].join("\n"),
    });
    return true;
  } catch (error) {
    console.error("Enquiry email failed", error);
    return false;
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const required = ["name", "email", "message"];
    const missing = required.filter((field) => !payload?.[field]);
    if (missing.length) return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });

    const emailSent = await sendEnquiryEmail(payload);

    if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
      if (emailSent) {
        return NextResponse.json({ message: "Thanks. Your enquiry has been received. We will get back to you shortly." });
      }
      return NextResponse.json({ error: "Contact form is not connected yet. Add HUBSPOT_PRIVATE_APP_TOKEN or EMAIL_* env vars to the server environment." }, { status: 503 });
    }

    const [firstName, ...rest] = String(payload.name).trim().split(/\s+/);
    const lastName = rest.join(" ");
    const properties = {
      email: payload.email,
      firstname: firstName || payload.name,
      lastname: lastName,
      company: payload.company || "",
      website: payload.website || "",
      lifecyclestage: "lead",
    };

    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ properties }),
    });

    if (!response.ok && response.status !== 409) {
      const body = await response.text();
      console.error("HubSpot contact creation failed", response.status, body);
      return NextResponse.json({ error: "We could not submit the enquiry right now. Please try again shortly." }, { status: 502 });
    }

    let contactId = null;
    if (response.ok) {
      const created = await response.json();
      contactId = created.id;
    }

    // Store the enquiry details as a HubSpot note when the token has note permissions.
    if (contactId) {
      const noteBody = [
        `Tendrils website enquiry`,
        `Service: ${payload.service || "Not specified"}`,
        `Website: ${payload.website || "Not specified"}`,
        `Project details: ${payload.message}`,
      ].join("\n");
      const noteResponse = await fetch("https://api.hubapi.com/crm/v3/objects/notes", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          properties: { hs_timestamp: new Date().toISOString(), hs_note_body: noteBody },
          associations: [{ to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }] }],
        }),
      });
      if (!noteResponse.ok) console.warn("HubSpot note creation failed; contact was still created.");
    }

    return NextResponse.json({ message: "Thanks. Your enquiry has been received. We will get back to you shortly." });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}