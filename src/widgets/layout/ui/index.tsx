import { Box } from "@mui/material";
import { FC } from "react";
import { LayoutHeight } from "../model/const";
import { Header } from "./header";

interface LayoutAllProps {}

export const Layout: FC<LayoutAllProps> = ({}) => {
  return (
    <>
      <Header />
      <Box sx={{ height: `${LayoutHeight}px` }} />
    </>
  );
};
