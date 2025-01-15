import { IBlogger } from "@/src/shared/api/blogger/model";
import { http } from "@/src/shared/api/instance";
import { httpServer } from "@/src/shared/api/instance-server";

export interface IGetBloggerSchema {
  payload?: {
    limit?: number;
    offset?: number;
    sort?: string;
    populate?: string;
    search?: string;
    id__in?: string;
  };
  response: {
    data: IBlogger[];
    meta: {
      limit: number;
      offset: number;
      total: number;
      end?: boolean;
    };
  };
}

export const httpGetBlogger = async (payload: IGetBloggerSchema["payload"]) => {
  const response = await http.get<IGetBloggerSchema["response"]>(
    `/blogger/platform`,
    {
      params: payload,
    }
  );
  // const response = await httpLocal.get<IGetBloggerSchema["response"]>(
  //   `/blogger`,
  //   {
  //     params: payload,
  //   }
  // );
  return response.data;
};

export const httpServerGetBlogger = async (
  payload: IGetBloggerSchema["payload"]
) => {
  const response = await httpServer.get<IGetBloggerSchema["response"]>(
    `/blogger/platform`,
    {
      params: payload,
    }
  );
  // const response = await httpLocal.get<IGetBloggerSchema["response"]>(
  //   `/blogger`,
  //   {
  //     params: payload,
  //   }
  // );
  return response.data;
};
