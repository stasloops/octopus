import {useBlogers} from "@/entities/bloger";
import {useCallback, useEffect} from "react";
import Loading from "@/pages-src/loading";
import {enqueueSnackbar} from "notistack";
import {TableElement} from "@/widgets/table";

export const DeleteBloggersElement = () => {
  const { mutateAsync, setFilters, isLoading, data } = useBlogers();

  const fetchBloggers = useCallback(async () => {
    try {
      setFilters(prev => ({ ...prev }));
      await mutateAsync();
    } catch (error) {
      enqueueSnackbar('Ошибка при получении блогеров: '+ error, {
        variant: 'error',
      });
    }
  }, [mutateAsync, setFilters]);


  useEffect(() => {
    fetchBloggers();
  }, []);

  if (!data || isLoading) {
    return <Loading />;
  }

  return <TableElement selectable />;
};
