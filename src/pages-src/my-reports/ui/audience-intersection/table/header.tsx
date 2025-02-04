import { TableCell, TableRow } from "@mui/material";
import { LayoutHeight } from "@/widgets/layout/model/const";

export const fixedHeaderContent = () => {
  return (
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
      <TableCell sx={{ color: "#2B3A8B", opacity: "0.4" }}>
        Название отчета
      </TableCell>
      <TableCell sx={{ color: "#2B3A8B", opacity: "0.4" }}>
        Сообщества
      </TableCell>
      <TableCell sx={{ width: "10%" }}>{``}</TableCell>
    </TableRow>
  );
};
