import { numberShortenCharacrer } from "@/src/shared/lib/number-shorten-character";
import { fakerRU } from "@faker-js/faker";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
    Box,
    ButtonBase,
    Collapse,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useMemo, useState } from "react";
import { useBloggerStore } from "../../model/store";
import { StatElement } from "./stat";

export const Other: FC = () => {
  const blogger = useBloggerStore((state) => state.value);
  const [open, setOpen] = useState<boolean>(false);

  const onChangeOpen = () => {
    setOpen(!open);
  };

  const param1 = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 5000000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param2 = useMemo(() => {
    const value = fakerRU.number.float({ min: 0.01, max: 100.0 });
    return { value: value.toFixed(2) };
  }, [blogger]);
  const param3 = useMemo(() => {
    const value = fakerRU.number.float({ min: 0.01, max: 100.0 });
    return { value: value.toFixed(2) };
  }, [blogger]);

  if (!blogger) return null;
  return (
    <Paper elevation={3}>
      <ButtonBase onClick={onChangeOpen} sx={{ width: `100%` }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "start",
            alignItems: "center",
            padding: 1,
            width: `100%`,
          }}
        >
          <Typography variant="h6">КОРОТКИЕ ВИДЕО</Typography>
          {!open && <ArrowDropDownIcon />}
          {!!open && <ArrowDropUpIcon />}
        </Stack>
      </ButtonBase>
      <Collapse in={open}>
        <Box sx={{ width: `cacl(100% + 20px)`, padding: 1 }}>
          <Grid2 container spacing={`20px`}>
            {!!param1 && (
              <StatElement
                error
                label="Кол-во аудитории в цифрах"
                value={
                  <Tooltip title={param1.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param1.value}</Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param2 && (
              <StatElement
                error
                label="Процент (%) рекламных постов у блоггера"
                value={<Typography variant="h6">{param2.value}%</Typography>}
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param3 && (
              <StatElement
                error
                label="Процент (%) использования ненормативной лексики аудиторией"
                value={<Typography variant="h6">{param3.value}%</Typography>}
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
          </Grid2>
        </Box>
      </Collapse>
    </Paper>
  );
};
