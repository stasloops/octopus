import { Typography } from "@mui/material";
import { cookies } from "next/headers";

export const Page = async () => {
  const cookieStore = await cookies();
  const ord_token = cookieStore.get("ord_token");
  const session = cookieStore.get("session");

  return (
    <>
      <Typography>Домашняя страница</Typography>
      <Typography>{`ord_token: ${JSON.stringify(ord_token)}`}</Typography>
      <Typography>{`session: ${JSON.stringify(session)}`}</Typography>
      <br />
      {/* <TestElement /> */}
    </>
  );
};
