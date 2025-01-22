import { numberShortenCharacrer } from "@/src/shared/lib/number-shorten-character";
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
import { FC, useEffect, useMemo, useState } from "react";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";
import { useCloseAll } from "../../model/store";
import { ExternalLinks } from "./external-links";
import { StatElement } from "./stat";

export const Other: FC = () => {
  const { data: blogger } = useGetBloggerMutateStats();
  const [open, setOpen] = useState<boolean>(false);

  const onChangeOpen = () => {
    setOpen(!open);
  };

  const close = useCloseAll((state) => state.value);
  useEffect(() => {
    setOpen(false);
  }, [close]);

  const param1 = useMemo(() => {
    if (blogger?.audience_in_numbers === undefined) return null;
    return numberShortenCharacrer(blogger.audience_in_numbers || 0);
  }, [blogger?.audience_in_numbers]);

  const param2 = useMemo(() => {
    if (blogger?.posts_ads_perc === undefined) return null;
    return { value: blogger.posts_ads_perc.toFixed(2) };
  }, [blogger?.posts_ads_perc]);

  const param3 = useMemo(() => {
    if (typeof blogger?.posts_swear_perc !== "number") return null;
    return { value: blogger?.posts_swear_perc.toFixed(2) };
  }, [blogger?.posts_swear_perc]);

  if (!blogger) return null;
  return (
    <Paper>
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
          <Typography variant="h6">ПРОЧЕЕ</Typography>
          {!open && <ArrowDropDownIcon />}
          {!!open && <ArrowDropUpIcon />}
        </Stack>
      </ButtonBase>
      <Collapse in={open}>
        <Box sx={{ width: `cacl(100% + 20px)`, padding: 1 }}>
          <Grid2 container spacing={`20px`}>
            <ExternalLinks />
            {!!param1 && (
              <StatElement
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
                label="Процент (%) рекламных постов у блоггера"
                value={<Typography variant="h6">{param2.value}%</Typography>}
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param3 && (
              <StatElement
                label="Процент (%) использования ненормативной лексики в текстовых постах"
                value={<Typography variant="h6">{param3?.value}%</Typography>}
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
