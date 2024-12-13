"use client";

import { FC, useEffect } from "react";
import { IGetBloggerSchema } from "../../api/http-get-blogger";
import { useBloggerTableStore } from "../../modal/store";

interface TableElementProps {
  bloggerTable: IGetBloggerSchema["response"] | null;
}

export const TableElement: FC<TableElementProps> = ({
  bloggerTable: bloggerTableFirst,
}) => {
  const bloggerTable = useBloggerTableStore((state) => state.value);
  const setBloggerTable = useBloggerTableStore((state) => state.setValue);
  useEffect(() => {
    setBloggerTable(bloggerTableFirst);
  }, [bloggerTableFirst]);

  return <></>;
};
