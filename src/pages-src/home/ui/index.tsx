import { Typography } from "@mui/material";
import { cookies } from "next/headers";

export const Page = async () => {
  const cookieStore = await cookies();
  const ord_token = cookieStore.get("ord_token");

  return (
    <>
      <Typography>Домашняя страница</Typography>
      <Typography>{`ord_token: ${ord_token}`}</Typography>
    </>
  );
};
