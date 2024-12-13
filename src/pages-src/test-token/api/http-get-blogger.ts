import { http } from "@/src/shared/api/instance";

interface ITableSchema {
  payload?: {
    limit?: number;
    offset?: number;
    sort?: string;
    populate?: string;
    search?: string;
    id__in?: string;
  };
  response: {
    data: any[];
    meta: {
      limit: number;
      offset: number;
    };
  };
}

export const httpGetBlogger = (payload: ITableSchema["payload"]) => {
  return http
    .get<ITableSchema["response"]>(`/blogger`, {
      params: payload,
    })
    .then((response) => response.data);
};
