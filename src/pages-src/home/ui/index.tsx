import { Layout } from "@/src/widgets/layout";
import { FC } from "react";
import { TextResultElement } from "./text-result";

interface PageProps {}

export const Page: FC<PageProps> = async ({}) => {
  // const bloggers = await ()

  return (
    <>
      <Layout />
      <TextResultElement />
    </>
  );
};
