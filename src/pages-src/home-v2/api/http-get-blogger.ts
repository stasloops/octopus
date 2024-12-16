import { httpLocal } from "@/src/shared/api/instance";

export interface IBlogger {
  id: number;
  name: string;
  verification: boolean;
  avatar: string;
  firstName: string;
  lastName: string;

  platform: string[];

  subscribers: number;
  status: string;
  country: string;
  city: string;
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
      end?: boolean;
    };
  };
}

export const httpGetBlogger = async (payload: IGetBloggerSchema["payload"]) => {
  // const response = await http.get<IGetBloggerSchema["response"]>(`/blogger`, {
  //   params: payload,
  // });
  const response = await httpLocal.get<IGetBloggerSchema["response"]>(
    `/blogger`,
    {
      params: payload,
    }
  );
  return response.data;
};

export const httpServerGetBlogger = async (
  payload: IGetBloggerSchema["payload"]
) => {
  // const response = await httpServer.get<IGetBloggerSchema["response"]>(
  //   `/blogger`,
  //   {
  //     params: payload,
  //   }
  // );
  const response = await httpLocal.get<IGetBloggerSchema["response"]>(
    `/blogger`,
    {
      params: payload,
    }
  );
  return response.data;
};
