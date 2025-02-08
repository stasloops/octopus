import {useMutation} from "react-query";
import {httpDeleteSelectedBloggers} from "@/widgets/table/api/http-delete-selected-bloggers";
import {enqueueSnackbar} from "notistack";
import {useSelectedBloggers} from "@/widgets/table/model/selected-bloggers-store";

export const useDeleteSelectedBloggers = () => {
  const {selectedBloggers} = useSelectedBloggers();

  return useMutation({
    mutationFn: () => {
      return httpDeleteSelectedBloggers(selectedBloggers)
    },
    onSuccess: () => {
    },
    onError: (error: any) => {
      enqueueSnackbar("Ошибка сервера", { variant: "error" });
      console.log(error);
    },
  })
}