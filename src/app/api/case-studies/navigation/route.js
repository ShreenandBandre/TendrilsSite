import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { caseStudiesNavigationQuery } from "@/lib/sanity/queries";
export async function GET() {
  try { return NextResponse.json({ caseStudies: (await client.fetch(caseStudiesNavigationQuery)) || [] }); }
  catch (error) { return NextResponse.json({ caseStudies: [], error: error.message }, { status: 200 }); }
}
