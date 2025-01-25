import { IBlogger } from "@/shared/api/blogger/model";
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

const VirtuosoScroller = forwardRef<HTMLDivElement>((props, ref) => (
  <TableContainer id="Scroller" {...props} ref={ref} sx={{ height: `100%`, overflowX: "initial" }} />
));
VirtuosoScroller.displayName = 'VirtuosoScroller';

const VirtuosoTableHead = forwardRef<HTMLTableSectionElement>((props, ref) => (
  <TableHead {...props} ref={ref} />
));
VirtuosoTableHead.displayName = 'VirtuosoTableHead';

const VirtuosoTableBody = forwardRef<HTMLTableSectionElement>((props, ref) => (
  <TableBody {...props} ref={ref} />
));
VirtuosoTableBody.displayName = 'VirtuosoTableBody';

export const VirtuosoTableComponents: TableComponents<IBlogger> = {
  Scroller: VirtuosoScroller,
  TableHead: VirtuosoTableHead,
  TableBody: VirtuosoTableBody,
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
            px: {
              xs: `18px`,
              md: `38px`,
              lg: `38px`,
            },
            "& .MuiTableCell-head": {
              borderTop: `none`,
              color: `#2B3A8B`,
              opacity: 0.4,
              fontSize: {
                xs: `9px`,
                md: `14px`,
                lg: `14px`,
              },
            },
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
  TableRow: (props, ref) => (
    <>
      <TableRow {...props} sx={{ position: `relative` }} />
    </>
  ),
};
