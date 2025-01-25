import { http } from "@/shared/api/instance";

export interface IMarketingIntegrations {
  id: number;
  url: string;
  content: string;
  blogger_id: null | number;
  published_at: Date;
  metrics: {
    er: number;
    er2?: number;
    er3?: number;
    comments: number;
    likes: number;
    reports: number;
    views: number;
  };
  // name: string;
  // hashtags: string[];
}

export interface IGetMarketingIntegrationsSchema {
  payload?: {
    limit?: number;
    offset?: number;
    sort?: string;
    populate?: string;
    published_at__gte?: string;
    published_at__lte?: string;
    search?: string;
    id__in?: string;
  };
  response: {
    data: IMarketingIntegrations[];
    meta: {
      limit: number;
      offset: number;
      total: number;
      end?: boolean;
    };
  };
}

// export const httpGetBlogger = async (payload: IGetBloggerSchema["payload"]) => {
//   const response = await http.get<IGetBloggerSchema["response"]>(
//     `/blogger/platform`,
//     {
//       params: payload,
//     }
//   );
//   return response.data;
// };

export const httpMarketingIntegrations = async (
  payload: IGetMarketingIntegrationsSchema["payload"]
) => {
  const response = await http.get<IGetMarketingIntegrationsSchema["response"]>(
    `/blogger/post`,
    {
      params: payload,
    }
  );
  return response.data;
};
