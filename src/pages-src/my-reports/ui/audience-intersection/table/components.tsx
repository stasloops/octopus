import React, {forwardRef} from "react";
import {TableComponents} from "react-virtuoso";
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow,} from "@mui/material";
import {IReport} from "../../../api/audience-intersection";

const VirtuosoScroller = forwardRef<HTMLDivElement>((props, ref) => (
  <TableContainer
    component={Paper}
    {...props}
    ref={ref}
    sx={{ height: "100%", overflowX: "initial" }}
  />
));
VirtuosoScroller.displayName = "VirtuosoScroller";

const VirtuosoTableHead = forwardRef<HTMLTableSectionElement>((props, ref) => (
  <TableHead {...props} ref={ref} />
));
VirtuosoTableHead.displayName = "VirtuosoTableHead";

const VirtuosoTableBody = forwardRef<HTMLTableSectionElement>((props, ref) => (
  <TableBody {...props} ref={ref} />
));
VirtuosoTableBody.displayName = "VirtuosoTableBody";

export const VirtuosoTableComponents: TableComponents<IReport> = {
  Scroller: VirtuosoScroller,
  Table: (props) => (
    <Table
      {...props}
      sx={{
        borderCollapse: "separate",
        tableLayout: "fixed",
        "& .MuiTableCell-root": {
          px: 2,
        },
        "@media (max-width: 900px)": {
          "& .MuiTableCell-root": {
            display: "block",
            width: "100%",
            textAlign: "left",
            borderBottom: "none",
            px: 2,
            py: 1,
          },
        },
      }}
    />
  ),
  TableHead: VirtuosoTableHead,
  TableRow: (props) => (
    <TableRow
      {...props}
      sx={{
        position: "relative",
        "@media (max-width: 900px)": {
          display: "block",
          mb: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          borderRadius: "20px",
          bgcolor: "background.paper",
        },
      }}
    />
  ),
  TableBody: VirtuosoTableBody,
};
