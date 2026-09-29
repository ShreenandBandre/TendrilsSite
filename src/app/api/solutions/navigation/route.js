import {NextResponse} from "next/server";
import {client} from "@/lib/sanity/client";
import {solutionsNavigationQuery} from "@/lib/sanity/queries";
export async function GET(){try{return NextResponse.json({solutions:(await client.fetch(solutionsNavigationQuery))||[]},{headers:{"Cache-Control":"public, s-maxage=300, stale-while-revalidate=600"}})}catch(error){return NextResponse.json({solutions:[],error:error.message},{status:200})}}
