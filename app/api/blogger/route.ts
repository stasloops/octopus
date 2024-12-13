// Это симуляция запроса на бек, тут ничего не меняй!!!

import { dataTableBlogger } from "@/app/api/_const/data-table";
import { sleep } from "@/src/shared/lib/sleep";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  limit?: number;
  offset?: number;
  search?: string;
};

export async function GET(request: NextRequest, context: any) {
  const searchParams = request.nextUrl.searchParams;

  const limit = Number(searchParams.get(`limit`)) || 20;
  const offset = Number(searchParams.get(`offset`)) || 0;
  const search = searchParams.get(`search`) || undefined;

  const data = dataTableBlogger.filter((el) => {
    if (!!search) {
      if (!el?.name) return;
      if (el.name.toLowerCase().includes(search.toLowerCase())) return el;
      if (el.lastName.toLowerCase().includes(search.toLowerCase())) return el;
      if (el.firstName.toLowerCase().includes(search.toLowerCase())) return el;
    }
    if (!search) return el;
  });
  let response = NextResponse.json({
    data: data.slice(offset, offset + limit),
    meta: { limit: limit, offset: offset, total: data.length },
  });
  await sleep(1000);
  return response;
}
