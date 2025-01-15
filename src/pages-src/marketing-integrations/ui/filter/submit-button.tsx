import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Button, CircularProgress } from "@mui/material";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useMarketingIntegrations } from "../../api/use-marketing-integrations";
import { limitCount } from "../../model/const";
import { IFormFilter } from "../../model/form";
import { useMarketingTableStore } from "../../model/store";

export const SubmitButton: FC = () => {
  const { handleSubmit } = useFormContext<IFormFilter>();

  const { mutateAsync, isLoading } = useMarketingIntegrations();

  const setMarketingTable = useMarketingTableStore((state) => state.setValue);

  const onSubmit = async (data: IFormFilter) => {
    const res = await mutateAsync({
      offset: 0,
      limit: limitCount,
      // sort: `-subscribers`,
    });
    if (!res) return;
    setMarketingTable(res);
  };

  return (
    <>
      {!isLoading && (
        <Button
          variant="contained"
          color="primary"
          endIcon={<SearchOutlinedIcon />}
          sx={{ borderRadius: `20px` }}
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
          endIcon={<CircularProgress color="inherit" size="15px" />}
        >
          Загрузка
        </Button>
      )}
    </>
  );
};
