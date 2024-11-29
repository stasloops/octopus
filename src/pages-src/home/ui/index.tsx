import { LinearProgress, Typography } from "@mui/material";
import { cookies } from "next/headers";
import { useBlogger } from "../api/use-blogger";

export const Page = async () => {
  const cookieStore = await cookies();
  const ord_token = cookieStore.get("ord_token");

  const { data, isLoading } = useBlogger();

  return (
    <>
      <Typography>Домашняя страница</Typography>
      <Typography>{`ord_token: ${JSON.stringify(ord_token)}`}</Typography>
      <br />
      <Typography>Тест запроса</Typography>
      {isLoading && <LinearProgress />}
      <Typography>{`ответ: ${!!data ? JSON.stringify(data) : `-`}`}</Typography>
    </>
  );
};
