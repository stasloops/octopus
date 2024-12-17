import { numberShortenCharacrer } from "@/src/shared/lib/number-shorten-character";
import { theme } from "@/src/shared/lib/theme";
import { SxProps, Tooltip, Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { FC, useMemo } from "react";

const TextSX: SxProps<Theme> = {
  color: `#fff`,
  fontWeight: 400,
  fontSize: `11px`,
  background: theme.palette.primary.main,

  padding: `2px 10px 2px 10px`,
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
