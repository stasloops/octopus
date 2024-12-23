import { IBlogger } from "@/src/shared/api/blogger/model";
import { http } from "@/src/shared/api/instance";

export interface IGetBloggerSchema {
  payload: {
    id: number;
  };
  response: IBlogger;
}

export const httpGetBlogger = (payload: IGetBloggerSchema["payload"]) =>
  http
    .get<IGetBloggerSchema["response"]>(`/blogger/platform/${payload.id}`)
    .then((response) => response.data);
