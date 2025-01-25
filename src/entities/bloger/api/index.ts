import { IBlogger } from "@/shared/api/blogger/model";
import { http } from "@/shared/api/instance";

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

export interface IGetBlogerSchema {
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

export const getBlogers = async (payload: IGetBlogerSchema["payload"]) => {
  const response = await http.get<IGetBlogerSchema["response"]>(
    `/blogger/platform`,
    {
      params: payload,
    }
  );
  return response.data;
};

