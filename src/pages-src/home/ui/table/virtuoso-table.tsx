import { IBlogger } from "@/src/shared/api/blogger/model";
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

export const VirtuosoTableComponents: TableComponents<IBlogger> = {
  Scroller: forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer
      id="Scroller"
      {...props}
      ref={ref}
      sx={{ height: `100%`, overflowX: "initial" }}
      // style={{ overflowX: "initial" }}
    />
  )),
  Table: (props) => {
    const context = (props?.context || {}) as any;
    return (
      <>
        <Table
          stickyHeader
          {...props}
          sx={{
            borderCollapse: "separate",
            tableLayout: "fixed",
            px: `38px`,
            "& .MuiTableCell-head": { borderTop: `none` },
            "& .MuiTableCell-root": { px: 0 },
          }}
          size="small"
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
  TableRow: TableRow,
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};
