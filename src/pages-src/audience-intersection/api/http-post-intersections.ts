import { http } from "@/shared/api/instance";

interface IPayload {
  report_name: string;
  report_type: string;
  communities: string[];
  platforms: number[];
}

export interface IGetIntersectionsSchema {
  payload?: IPayload;
  response: any;
}

export const httpGetIntersections = async (
  payload: IGetIntersectionsSchema["payload"]
) => {
  const response = await http.post<IGetIntersectionsSchema["response"]>(
    `/reports/intersections`,
    payload,
    {
      responseType: `blob`,
    }
  );
  // const response = await httpLocal.get<IGetBloggerSchema["response"]>(
  //   `/blogger`,
  //   {
  //     params: payload,
  //   }
  // );
  return response;
};
