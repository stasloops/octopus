import { FC, ReactNode } from "react";
import { Header } from "./header";

interface LayoutAllProps {
  headerChildren?: ReactNode;
}

export const Layout: FC<LayoutAllProps> = ({ headerChildren }) => {
  return (
    <>
      <Header headerChildren={headerChildren} />
      {/* <Box sx={{ height: `${LayoutHeight}px` }} /> */}
    </>
  );
};
