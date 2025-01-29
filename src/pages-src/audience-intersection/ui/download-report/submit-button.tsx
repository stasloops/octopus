import DownloadIcon from "@mui/icons-material/Download";
import { Button, CircularProgress } from "@mui/material";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { IFormFilter } from "../../model/form";
import { useCheckListStore } from "../../model/store";

interface SubmitButtonProps {
  type: `xlsx` | `pdf`;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ type }) => {
  const { handleSubmit } = useFormContext<IFormFilter>();

  const isLoading = false;

  const сheckListStore = useCheckListStore((state) => state.value);

  const onSubmit = async ({ names }: IFormFilter) => {};

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
