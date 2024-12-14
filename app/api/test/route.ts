import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  let response = NextResponse.json({
    data: true,
  });
  return response;
}
