import { LayoutHeight } from "@/src/widgets/layout/model/const";
import { TableCell, TableRow } from "@mui/material";

export function fixedHeaderContent() {
  return (
    <>
      <TableRow
        sx={{
          position: `sticky`,
          top: `${LayoutHeight}px`,
          background: `#fff`,
          display: {
            xs: `none`,
            md: `table-row`,
            lg: `table-row`,
          },
        }}
      >
        <TableCell sx={{ width: `70px` }}>Аватар</TableCell>
        <TableCell sx={{}}>Имя / Кол-во подписчиков</TableCell>
        <TableCell sx={{}}>Описание</TableCell>
        <TableCell sx={{}}>Логин / ID</TableCell>
        <TableCell sx={{}}>ER, %</TableCell>
        <TableCell sx={{}}></TableCell>
      </TableRow>
      <TableRow
        sx={{
          position: `sticky`,
          top: `${LayoutHeight}px`,
          background: `#fff`,
          display: {
            xs: `table-row`,
            md: `none`,
            lg: `none`,
          },
        }}
      >
        <TableCell sx={{ width: `140px` }}>Имя / Кол-во подписчиков</TableCell>
        <TableCell sx={{}}></TableCell>
        <TableCell sx={{}}>ER, %</TableCell>
        <TableCell sx={{}}></TableCell>
        <TableCell sx={{ width: `120px` }}>Описание</TableCell>
      </TableRow>
    </>
  );
}
