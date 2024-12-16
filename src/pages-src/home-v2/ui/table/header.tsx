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
        }}
      >
        <TableCell sx={{ ...TableCellSX, width: `70px` }}>Аватар</TableCell>
        <TableCell sx={{ ...TableCellSX }}>Имя / Кол-во подписчиков</TableCell>
        <TableCell sx={{ ...TableCellSX }}>Логин / ID</TableCell>
        <TableCell sx={{ ...TableCellSX }}>Статус</TableCell>
        <TableCell sx={{ ...TableCellSX }}>Страна</TableCell>
        <TableCell sx={{ ...TableCellSX }}>Город</TableCell>
        <TableCell sx={{ ...TableCellSX }}></TableCell>
      </TableRow>
    </>
  );
}
