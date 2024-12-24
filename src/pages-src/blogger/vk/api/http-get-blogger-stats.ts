import { http } from "@/src/shared/api/instance";

export interface IGetBloggerSchema {
  payload: {
    id: number;
  };
  response: {
    clips_tags: { [tag: string]: number } | undefined;
    videos_tags: { [tag: string]: number } | undefined;
    posts_tags: { [tag: string]: number } | undefined;

    subscribers_genders:
      | { [gender: string]: { [age: string]: number } }
      | undefined;
    subscribers_locations: { [city: string]: number } | undefined;
  };
}

export const httpGetBloggerStats = (payload: IGetBloggerSchema["payload"]) =>
  http
    .get<IGetBloggerSchema["response"]>(`/blogger/platform/${payload.id}/stats`)
    .then((response) => response.data);
