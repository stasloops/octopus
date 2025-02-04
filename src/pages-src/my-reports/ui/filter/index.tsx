import React from "react";
import { DataRangeInput } from "@/pages-src/my-reports/ui/filter/data-range";
import { Box, Typography } from "@mui/material";

const FilterElement = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "20%",
        minWidth: "450px",
        gap: "8px",
        marginTop: "12px",
      }}
    >
      <Typography>Период</Typography>
      <DataRangeInput />
    </Box>
  );
};

export default FilterElement;
