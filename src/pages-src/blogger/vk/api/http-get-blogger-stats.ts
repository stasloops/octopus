import { http } from "@/src/shared/api/instance";

export interface IGetBloggerSchema {
  payload: {
    id: number;
  };
  response: {
    audience_in_numbers: number;
    posts_ads_perc: number;
    posts_swear_perc: number;
    clips_themes: { [city: string]: number } | undefined;

    clips_tags: { [tag: string]: number } | undefined;
    videos_tags: { [tag: string]: number } | undefined;
    posts_tags: { [tag: string]: number } | undefined;

    videos_views_history: { [value: string]: number } | undefined;
    posts_views_history: { [value: string]: number } | undefined;
    clips_views_history: { [value: string]: number } | undefined;

    subscribers_genders:
      | { [gender: string]: { [age: string]: number } }
      | undefined;
    subscribers_locations: { [city: string]: number } | undefined;

    posts_counters:
      | {
          views: number;
          likes: number;
          comments: number;
          reposts: number;
          views_12_avg: number;
          likes_12_avg: number;
          comments_12_avg: number;
          reposts_12_avg: number;
          comments_replies: number;
          comments_replies_12_avg: number;
        }
      | undefined;
    videos_counters:
      | {
          views: number;
          likes: number;
          comments: number;
          reposts: number;
          views_12_avg: number;
          likes_12_avg: number;
          comments_12_avg: number;
          reposts_12_avg: number;
          comments_replies: number;
          comments_replies_12_avg: number;
        }
      | undefined;
    clips_counters:
      | {
          views: number;
          likes: number;
          comments: number;
          reposts: number;
          views_12_avg: number;
          likes_12_avg: number;
          comments_12_avg: number;
          reposts_12_avg: number;
          comments_replies: number;
          comments_replies_12_avg: number;
        }
      | undefined;
  };
}

export const httpGetBloggerStats = (payload: IGetBloggerSchema["payload"]) =>
  http
    .get<IGetBloggerSchema["response"]>(`/blogger/platform/${payload.id}/stats`)
    .then((response) => response.data);
