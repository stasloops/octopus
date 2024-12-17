import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import { LayoutHeight } from "../model/const";
import { Header } from "./header";

interface LayoutAllProps {
  headerChildren?: ReactNode;
}

export const Layout: FC<LayoutAllProps> = ({ headerChildren }) => {
  return (
    <>
      <Header headerChildren={headerChildren} />
      <Box sx={{ height: `${LayoutHeight}px` }} />
    </>
  );
};
