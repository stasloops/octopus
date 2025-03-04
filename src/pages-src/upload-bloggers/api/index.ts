import { http } from "@/shared/api/instance";

export const saveBloggerPlatformCsv = async (file: File): Promise<void> => {
  try {
    await http.postForm("/blogger/platform/save_from_csv", {
      file,
    });
  } catch (error) {
    throw error;
  }
};
