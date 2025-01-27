import { numberShortenCharacrer } from "@/shared/lib/number-shorten-character";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
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
import { FC, useMemo } from "react";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";
import { useCloseAll } from "../../model/store";
import { ExternalLinks } from "./external-links";
import { StatElement } from "./stat";

export const Other: FC = () => {
  const { data: blogger } = useGetBloggerMutateStats();
  const open = useCloseAll((state) => state.group4Open);
  const setOpen = useCloseAll((state) => state.onChangeGroup4Open);

  const onChangeOpen = () => {
    setOpen(!open);
  };

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
    <Paper sx={{ borderRadius: `20px`, px: `24px` }} className="PaperGroup">
      <ButtonBase onClick={onChangeOpen} sx={{ width: `100%` }}>
        <Stack
          direction="row"
          spacing={`15px`}
          sx={{
            justifyContent: "start",
            alignItems: "center",
            height: `64px`,
            width: `100%`,
          }}
        >
          <Typography sx={{ fontWeight: 400, fontSize: `24px` }}>
            ПРОЧЕЕ
          </Typography>
          {!open && <KeyboardArrowDownRoundedIcon />}
          {!!open && <KeyboardArrowUpRoundedIcon />}
        </Stack>
      </ButtonBase>
      <Collapse in={open}>
        <Box sx={{ width: `cacl(100% + 20px)`, pt: `5px`, pb: `27px` }}>
          <Grid2
            container
            spacing={`20px`}
            sx={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <ExternalLinks />
            {!!param1 && (
              <StatElement
                label="Кол-во аудитории в цифрах"
                value={
                  <Tooltip title={param1.origin.toLocaleString("ru-RU")}>
                    <Typography sx={{ fontWeight: 600, fontSize: `20px` }}>
                      {param1.value}
                    </Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param2 && (
              <StatElement
                label="Процент (%) рекламных постов у блогера"
                value={
                  <Typography sx={{ fontWeight: 600, fontSize: `20px` }}>
                    {param2.value}%
                  </Typography>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param3 && (
              <StatElement
                label="Процент (%) использования ненормативной лексики в текстовых постах"
                value={
                  <Typography sx={{ fontWeight: 600, fontSize: `20px` }}>
                    {param3?.value}%
                  </Typography>
                }
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
