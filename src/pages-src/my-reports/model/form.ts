import { z } from "zod";

export interface IFormFilter {
  created_at__gte?: string;
  created_at__lte?: string;
}

export const defaultFormFilter: IFormFilter = {
  created_at__gte: undefined,
  created_at__lte: undefined,
};

export const FormFilterSchema = z.object({
  created_at__gte: z.string().optional(),
  created_at__lte: z.string().optional(),
});
