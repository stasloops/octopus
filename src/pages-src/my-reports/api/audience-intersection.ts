import { http } from "@/shared/api/instance";

export interface IReport {
  report_name: string;
  report_type: string;
  communities: string[];
  platforms: number[];
  id: number;
  created_at: string;
}

interface IPayloadParams {
  created_at__gte?: string;
  created_at__lte?: string;
}

export interface IPayload extends IPayloadParams {
  limit?: number;
  offset?: number;
  sort?: string;
  populate?: string;
  search?: string;
  id__in?: string;
}

export interface IGetIntersectionsSchema {
  payload?: IPayload;
  response: {
    data: IReport[];
    meta: {
      limit: number;
      offset: number;
      total: number;
      end?: boolean;
    };
  };
}

export const getAudienceIntersection = async (
  payload: IGetIntersectionsSchema["payload"]
) => {
  const response = await http.get<IGetIntersectionsSchema["response"]>(
    `reports/intersections`,
    {
      params: payload,
    }
  );
  return response.data;
};
