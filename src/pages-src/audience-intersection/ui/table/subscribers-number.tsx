import { numberShortenCharacrer } from "@/shared/lib/number-shorten-character";
import { theme } from "@/shared/lib/theme";
import { SxProps, Tooltip, Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { FC, useMemo } from "react";

const TextSX: SxProps<Theme> = {
  color: `#fff`,
  fontWeight: 400,
  fontSize: {
    xs: `9px`,
    md: `11px`,
    lg: `11px`,
  },
  background: theme.palette.primary.main,

  padding: {
    xs: `2px 5px 2px 5px`,
    md: `2px 10px 2px 10px`,
    lg: `2px 10px 2px 10px`,
  },
  borderRadius: `26px`,
};

interface SubscribersElementProps {
  value: number;
}

export const SubscribersElement: FC<SubscribersElementProps> = ({ value }) => {
  const shorten = useMemo(() => numberShortenCharacrer(value), [value]);

  return (
    <>
      {!!shorten.characrer && (
        <>
          <Tooltip title={value.toLocaleString("ru-RU")}>
            <Typography sx={TextSX}>{shorten.value}</Typography>
          </Tooltip>
        </>
      )}
      {!shorten.characrer && (
        <>
          <Typography sx={TextSX}>{shorten.value}</Typography>
        </>
      )}
    </>
  );
};
