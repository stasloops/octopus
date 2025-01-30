import { downloadFile } from "@/shared/lib/download-file";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, CircularProgress } from "@mui/material";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useGetIntersectionsMutate } from "../../api/use-mutation-intersections";
import { IFormModalFilter } from "../../model/form";
import { useCheckListStore, useTagListStore } from "../../model/store";

interface SubmitButtonProps {
  type: `xlsx` | `pdf`;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ type }) => {
  const { handleSubmit } = useFormContext<IFormModalFilter>();

  const { mutateAsync, isLoading } = useGetIntersectionsMutate();

  const tagListStore = useTagListStore((state) => state.value);
  const сheckListStore = useCheckListStore((state) => state.value);

  const onSubmit = async ({ name }: IFormModalFilter) => {
    const res = await mutateAsync({
      report_name: name,
      report_type: type,
      platforms: сheckListStore,
      communities: tagListStore,
    });
    if (!res) return;
    downloadFile(res.name, res.body, res.mimetype);
  };

  return (
    <>
      {!isLoading && (
        <Button endIcon={<DownloadIcon />} onClick={handleSubmit(onSubmit)}>
          Скачать
        </Button>
      )}
      {!!isLoading && (
        <Button
          disabled
          endIcon={<CircularProgress color="inherit" size="15px" />}
        >
          Загрузка
        </Button>
      )}
    </>
  );
};
