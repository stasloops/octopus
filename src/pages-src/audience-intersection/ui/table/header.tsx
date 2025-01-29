import { LayoutHeight } from "@/widgets/layout/model/const";
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
        <TableCell sx={{ width: `60px` }}></TableCell>
        <TableCell sx={{ width: `70px` }}>Аватар</TableCell>
        <TableCell sx={{}}>Имя / Кол-во подписчиков</TableCell>
        <TableCell sx={{}}>Логин / ID</TableCell>
        <TableCell sx={{}}>Кол-во подписчиков</TableCell>
        <TableCell sx={{}}>ER, %</TableCell>
        <TableCell sx={{}}>Качество аудитории, %</TableCell>
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
        <TableCell sx={{ width: `60px` }}></TableCell>
        <TableCell sx={{ width: `140px` }}>Имя / Кол-во подписчиков</TableCell>
        <TableCell sx={{}}></TableCell>
        <TableCell sx={{}}>ER, %</TableCell>
        <TableCell sx={{}}>Качество аудитории, %</TableCell>
        <TableCell sx={{}}></TableCell>
      </TableRow>
    </>
  );
}
