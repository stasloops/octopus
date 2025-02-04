import React, { FC, useMemo } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

import { useAudienceIntersection } from "../../model/hooks/use-audience-intersection";
import { TableVirtuoso } from "react-virtuoso";
import { IReport } from "../../api/audience-intersection";
import { VirtuosoTableComponents } from "./table/components";
import { fixedHeaderContent } from "./table/header";
import { rowContent } from "./table/row-content";

export const AudienceIntersectionElement = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useAudienceIntersection();

  const reports: IReport[] = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  if (isLoading && !data) {
    return (
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (isError) {
    return (
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="h6" color="error">
                  Ошибка загрузки данных
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Box
      sx={{
        "& .ReactVirtualized__Table__headerRow": {
          position: `sticky`,
          insetBlockStart: 0,
          zIndex: 1,
        },
        pt: `10px`,
        "& [data-virtuoso-scroller]": {
          boxShadow: "none !important",
        },
      }}
    >
      <TableVirtuoso
        useWindowScroll
        allowFullScreen
        data={reports}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
        endReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        context={{
          hasMore: hasNextPage,
        }}
      />
      {isLoading && (
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Box>
  );
};
