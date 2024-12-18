import { http } from "@/src/shared/api/instance";
import { httpServer } from "@/src/shared/api/instance-server";

export interface IBlogger {
  id_: string;
  platform_code: string;
  login: null;
  title: string;
  description: string;
  gender: null;
  years: null;
  status: null;
  location: null;
  is_confirmed: boolean;
  subscribers: number;
  er: number;
  posts: number;
  attributes: null;
  id: number;
  url: string;
  blogger: null;
  platform: null;
}

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
