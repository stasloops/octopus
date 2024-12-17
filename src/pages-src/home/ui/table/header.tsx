import { SxProps, TableCell, TableRow, Theme } from "@mui/material";

const TableCellSX: SxProps<Theme> = {
  opacity: 0.4,
  color: `#222657`,
};

export function fixedHeaderContent() {
  return (
    <>
      <TableRow
        sx={{
          background: `#fff`,
          display: {
            xs: `none`,
            md: `table-row`,
            lg: `table-row`,
          },
        }}
      >
        <TableCell sx={{ ...TableCellSX, width: `70px` }}>Аватар</TableCell>
        <TableCell sx={{ ...TableCellSX }}>Имя / Кол-во подписчиков</TableCell>
        <TableCell sx={{ ...TableCellSX }}>Логин / ID</TableCell>
        <TableCell sx={{ ...TableCellSX }}>ER, %</TableCell>
        <TableCell sx={{ ...TableCellSX }}></TableCell>
      </TableRow>
    </>
  );
}
