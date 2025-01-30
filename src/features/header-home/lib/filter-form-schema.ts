import { z } from "zod";

export const filterFormSchema = z.object({
  search: z.string().optional(),
  subscribers: z.string().optional(),
  geography: z.string().optional(),
  brandMentions: z.string().optional(),
  erRate: z.string().refine(
    (val) => {
      if (!val) return true;
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    { message: "ER должен быть от 0 до 100" }
  ),
  otherSocialAccount: z.string().optional(),
  advertisers: z.string().optional(),
  subscriptions: z.string().optional(),
  postsCount: z.string().optional(),
  verifiedAccount: z.string().optional(),
  location: z.string().optional(),
  postTags: z.string().optional(),
  vkVideoViews: z.string().optional(),
  communityTheme: z.string().optional(),
  clipsViews: z.string().optional(),
  averageReach: z.string().optional(),
});

export type FilterFormData = z.infer<typeof filterFormSchema>;