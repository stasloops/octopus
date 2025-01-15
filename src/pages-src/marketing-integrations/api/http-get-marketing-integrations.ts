import { httpLocal } from "@/src/shared/api/instance";

export interface IMarketingIntegrations {
  id: number;
  avatar: string;
  name: string;
  hashtags: string[];
  likes: number;
  comments: number;
  text: string;
}

export interface IGetMarketingIntegrationsSchema {
  payload?: {
    limit?: number;
    offset?: number;
    sort?: string;
    populate?: string;
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
  const response = await httpLocal.get<
    IGetMarketingIntegrationsSchema["response"]
  >(`/marketing-integrations`, {
    params: payload,
  });
  return response.data;
};
