import {http} from "@/shared/api/instance";
import {SelectedBlogger} from "@/widgets/table/model/selected-bloggers-store";

export const httpDeleteSelectedBloggers = async (bloggers: SelectedBlogger[])=> {
  const ids = bloggers.map(item => item.id).join("|")
  const response = await http.delete("/blogger/platform", {
    params: {
      id__in: ids,
    }
  })
  return response.data;
}