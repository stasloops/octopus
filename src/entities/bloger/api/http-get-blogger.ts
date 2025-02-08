import { IBlogger } from "@/shared/api/blogger/model";
import { http } from "@/shared/api/instance";
import { httpServer } from "@/shared/api/instance-server";

interface IPayloadParams {
  er__lte?: number;
  posts__lte?: number;
  subscribers__lte?: number;
  search?: string;
}


interface IPayload extends IPayloadParams {
  limit?: number;
  offset?: number;
  sort?: string;
  populate?: string;
  id__in?: string;
}

export interface IGetBloggerSchema {
  payload?: IPayload;
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
