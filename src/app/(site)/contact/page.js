
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();

    // Store the form element before the async operation.
    // event.currentTarget can become null after await.
    const formElement = event.currentTarget;

    setStatus("loading");
    setMessage("");

    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(form)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to submit your request."
        );
      }

      // Reset the form using the stored reference.
      formElement.reset();

      setStatus("success");
      setMessage(
        data.message || "Thanks. We will get back to you shortly."
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error.message || "Unable to submit your request."
      );
    }
  }

  return (
    <main className="relative min-h-screen bg-[#121110] px-6 pb-28 pt-36 text-[#F5F2EC] overflow-hidden">

      {/* Background Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient Glows */}
      <div className="pointer-events-none absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#C9A227]/10 blur-[150px]" />

      <div className="pointer-events-none absolute right-[-10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-amber-900/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] items-start">

          {/* LEFT SIDE: Heading & Contact Info */}
          <div className="space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#C9A227] mb-6">
                <Sparkles size={12} />
                Get in Touch
              </div>

              <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-6xl leading-[1.05]">
                Let's build what comes next.
              </h1>

              <p className="mt-6 text-base leading-relaxed text-white/70 font-medium max-w-md">
                Tell us what you are trying to improve, integrate, automate,
                or scale. The more context you share, the better we can
                prepare.
              </p>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-4 pt-4 border-t border-white/10">

              {/* Email */}
              <a
                href="mailto:pranath@tendrils.io"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#1A1816]/80 p-4 transition-all duration-300 hover:border-[#C9A227]/60 hover:bg-[#1E1B18]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-[#121110] transition-colors">
                  <Mail size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Direct Email
                  </p>

                  <p className="font-medium text-white truncate">
                    pranath@tendrils.io
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-white/40 group-hover:text-[#C9A227] transition-colors mr-2"
                />
              </a>

              {/* Phone */}
              <a
                href="tel:+12143029093"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#1A1816]/80 p-4 transition-all duration-300 hover:border-[#C9A227]/60 hover:bg-[#1E1B18]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-[#121110] transition-colors">
                  <Phone size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Phone Support
                  </p>

                  <p className="font-medium text-white truncate">
                    +1 (214) 302-9093
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-white/40 group-hover:text-[#C9A227] transition-colors mr-2"
                />
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#1A1816]/80 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#C9A227]">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Global Headquarters
                  </p>

                  <p className="font-medium text-white/90 text-sm mt-0.5 leading-relaxed">
                    1001 W Euless Blvd, Euless, TX 76040, USA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Contact Form */}
          <form
            onSubmit={submit}
            className="rounded-[2.5rem] border border-white/10 bg-[#1A1816]/90 p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              Send us a message
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Name */}
              <label className="text-xs font-bold uppercase tracking-wider text-white/75 block">
                Name *

                <input
                  required
                  name="name"
                  placeholder="John Doe"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#121110] px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                />
              </label>

              {/* Email */}
              <label className="text-xs font-bold uppercase tracking-wider text-white/75 block">
                Work Email *

                <input
                  required
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#121110] px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                />
              </label>

              {/* Company */}
              <label className="text-xs font-bold uppercase tracking-wider text-white/75 block">
                Company

                <input
                  name="company"
                  placeholder="Company Inc."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#121110] px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                />
              </label>

              {/* Website */}
              <label className="text-xs font-bold uppercase tracking-wider text-white/75 block">
                Website

                <input
                  name="website"
                  placeholder="https://"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#121110] px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                />
              </label>
            </div>

            {/* Project Details */}
            <label className="mt-6 block text-xs font-bold uppercase tracking-wider text-white/75">
              Project details *

              <textarea
                required
                name="message"
                rows={5}
                placeholder="Tell us about your requirements, timeline, and technical scope..."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#121110] px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] resize-none"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-8 w-full flex items-center justify-center gap-2 rounded-full bg-[#C9A227] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#121110] transition-all hover:bg-white disabled:opacity-50 shadow-lg shadow-[#C9A227]/20"
            >
              <span>
                {status === "loading"
                  ? "Sending enquiry..."
                  : "Send enquiry"}
              </span>

              <ArrowUpRight size={16} />
            </button>

            {/* Status Message */}
            {message && (
              <p
                className={`mt-4 text-center text-sm font-medium ${
                  status === "error"
                    ? "text-red-400"
                    : "text-emerald-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}


