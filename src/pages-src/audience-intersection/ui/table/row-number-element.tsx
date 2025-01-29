import { numberShortenCharacrer } from "@/shared/lib/number-shorten-character";
import { Tooltip, Typography } from "@mui/material";
import { FC, useMemo } from "react";

interface RowNumberElementProps {
  value: number;
}

export const RowNumberElement: FC<RowNumberElementProps> = ({ value }) => {
  const numberShorten = useMemo(
    () => (typeof value === "number" ? numberShortenCharacrer(value) : null),
    [value]
  );

  return (
    <>
      {numberShorten && (
        <Tooltip title={numberShorten.origin.toLocaleString("ru-RU")}>
          <Typography
            sx={{ color: `#2B3A8B`, fontSize: `14px`, fontWeight: 600 }}
          >
            {numberShorten.value}
          </Typography>
        </Tooltip>
      )}
    </>
  );
};
