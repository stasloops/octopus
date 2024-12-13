import { TableCell } from "@mui/material";
import { IBlogger } from "../../api/http-get-blogger";

export function rowContent(_index: number, row: IBlogger) {
  if (!row) return null;
  return (
    <>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.id}</TableCell>
    </>
  );
}
