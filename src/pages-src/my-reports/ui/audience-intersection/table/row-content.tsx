import { Button, TableCell, Typography } from "@mui/material";
import { IReport } from "../../../api/audience-intersection";

export const rowContent = (index: number, report: IReport) => {
  return (
    <>
      <TableCell>
        <Typography
          component="span"
          sx={{
            display: { xs: "inline-block", md: "none" },
            color: "#2B3A8B",
            opacity: "0.4",
            mr: 1,
          }}
        >
          Название отчета:
        </Typography>
        {report.report_name}
      </TableCell>
      <TableCell>
        <Typography
          component="span"
          sx={{
            display: { xs: "inline-block", md: "none" },
            color: "#2B3A8B",
            opacity: "0.4",
            mr: 1,
          }}
        >
          Сообщества:
        </Typography>
        {report.communities.join(", ")}
      </TableCell>
      <TableCell
        sx={{
          textAlign: { xs: "right", md: "left" },
          width: { md: "10%" },
        }}
      >
        <Button
          variant="contained"
          sx={{
            "@media (max-width: 900px)": {
              width: "100%",
            },
          }}
        >
          Отчёт
        </Button>
      </TableCell>
    </>
  );
};
