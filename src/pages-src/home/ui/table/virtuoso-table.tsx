import {
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { forwardRef } from "react";
import { TableComponents } from "react-virtuoso";
import { IBlogger } from "../../api/http-get-blogger";

export const VirtuosoTableComponents: TableComponents<IBlogger> = {
  Scroller: forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer {...props} ref={ref} sx={{ height: `100%` }} />
  )),
  Table: (props) => {
    const context = (props?.context || {}) as any;
    return (
      <>
        <Table
          {...props}
          sx={{
            borderCollapse: "separate",
            tableLayout: "fixed",
            px: `40px`,
            "& .MuiTableCell-head": { borderTop: `none` },
          }}
          size="small"
          stickyHeader
        />
        {!!context.hasMore && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: `100%`,
              height: `50px`,
            }}
          >
            <CircularProgress size="25px" />
          </Stack>
        )}
      </>
    );
  },
  TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};
