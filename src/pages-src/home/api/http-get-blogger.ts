import { http } from "@/src/shared/api/instance";

interface ITableSchema {
  payload?: any;
  response: any;
}

export const httpGetBlogger = (payload: ITableSchema["payload"]) => {
  return http
    .get<ITableSchema["response"]>(`/bloggers`, {
      params: payload,
    })
    .then((response) => response.data);
};
