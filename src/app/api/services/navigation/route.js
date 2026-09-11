import { NextResponse } from "next/server";

import { client } from "@/lib/sanity/client";
import { servicesNavigationQuery } from "@/lib/sanity/queries";

export async function GET() {
  try {
    const services = await client.fetch(
      servicesNavigationQuery
    );

    return NextResponse.json({
      services: services || [],
    });
  } catch (error) {
    console.error(
      "Services navigation error:",
      error
    );

    return NextResponse.json(
      {
        services: [],
      },
      {
        status: 200,
      }
    );
  }
}