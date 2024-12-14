import { NextResponse } from "next/server";

export async function GET(request: any, context: any) {
  let response = NextResponse.json({
    data: true,
  });
  return response;
}
