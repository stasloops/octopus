import { Layout } from "@/src/widgets/layout";
import { FC } from "react";
import { httpServerGetBlogger } from "../api/http-get-blogger";
import { TableElement } from "./table";
import { TextResultElement } from "./text-result";

interface PageProps {
  search: string;
}

export const Page: FC<PageProps> = async ({ search }) => {
  const bloggers = await httpServerGetBlogger({
    offset: 0,
    limit: 20,
    search,
  });

  return (
    <>
      <Layout />
      <TextResultElement />
      <TableElement bloggerTable={bloggers} />
    </>
  );
};
