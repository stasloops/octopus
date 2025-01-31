import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Button, CircularProgress } from "@mui/material";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useGetBloggerMutate } from "../../api/use-blogger";
import { limitCount } from "../../model/const";
import { IFormFilter } from "../../model/form";
import {
  useBloggerTableStore,
  useCheckListStore,
  useTagListStore,
} from "../../model/store";

export const SubmitButton: FC = () => {
  const { handleSubmit } = useFormContext<IFormFilter>();

  const { mutateAsync, isLoading } = useGetBloggerMutate();

  const setBloggerTable = useBloggerTableStore((state) => state.setValue);
  const setCheckListStore = useCheckListStore((state) => state.setValue);
  const setTagListStore = useTagListStore((state) => state.setValue);

  const onSubmit = async ({ names }: IFormFilter) => {
    const res = await mutateAsync({
      offset: 0,
      limit: limitCount,
      title__contain_in: names.split(/\s*,\s*/).join(`|`),
      // search: names
      // sort: `-subscribers`,
    });
    if (!res) return;
    setBloggerTable(res);
    setCheckListStore([]);
    setTagListStore(names.split(/[\s,]+/));
  };

  return (
    <>
      <Box
        sx={{
          width: {
            xs: `100%`,
            md: `auto`,
            lg: `auto`,
          },
          position: `relative`,
          px: {
            xs: `41px`,
            md: 0,
            lg: 0,
          },
        }}
      >
        {!isLoading && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchOutlinedIcon />}
            sx={{
              borderRadius: `20px`,
              width: {
                xs: `100%`,
                md: `98px`,
                lg: `98px`,
              },
            }}
            onClick={handleSubmit(onSubmit)}
          >
            Поиск
          </Button>
        )}
        {!!isLoading && (
          <Button
            variant="contained"
            color="primary"
            disabled
            sx={{ borderRadius: `20px` }}
            startIcon={<CircularProgress color="inherit" size="15px" />}
          >
            Загрузка
          </Button>
        )}
      </Box>
    </>
  );
};
