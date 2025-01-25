import { dataTableMarketing } from "@/app/route/_const/marketing-table";
import { sleep } from "@/shared/lib/sleep";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const searchParams = request.nextUrl.searchParams;

  const limit = Number(searchParams.get(`limit`)) || 20;
  const offset = Number(searchParams.get(`offset`)) || 0;

  const data = dataTableMarketing.filter((el) => {
    return el;
  });
  let response = NextResponse.json({
    data: data.slice(offset, offset + limit),
    meta: { limit: limit, offset: offset, total: data.length },
  });
  await sleep(1000);
  return response;
}
