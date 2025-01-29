import { IBlogger } from "@/shared/api/blogger/model";
import { http } from "@/shared/api/instance";

export interface IPayloadParams {
  subscribers__lte?: number;
  er__lte?: number;
  location__in?: string;
  theme_in?: string;
  stat__subscribers_locations__in?: string;
  posts__lte?: number;
  stat__posts_tags__in?: string;
  stat__clips_counters__views__lte?: number;
  is_confirmed?: boolean;
  stat__videos_counters__views__lte?: number;
  stat__posts_counters__views_12_avg__lte?: number;
  
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
