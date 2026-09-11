import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { industriesNavigationQuery } from "@/lib/sanity/queries";



export async function GET() {
  try {
    const industries = await client.fetch(industriesNavigationQuery);

    return NextResponse.json(
      {
        industries: Array.isArray(industries)
          ? industries
          : [],
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );

  } catch (error) {

    console.error(
      "Industries navigation error:",
      error
    );

    return NextResponse.json(
      {
        industries: [],
        error: "Failed to load industries",
      },
      {
        status: 500,
      }
    );
  }
}