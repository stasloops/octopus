import { theme } from "@/shared/lib/theme";
import { fakerRU } from "@faker-js/faker";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useMemo, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";

type TTag = { [tag: string]: number };

const genFakeData = (): TTag => {
  const value: TTag = {};
  const count = fakerRU.number.int({ min: 3, max: 300 });
  for (let index = 0; index < count; index++) {
    const tag = fakerRU.word.noun();
    if (value[tag] !== undefined) continue;
    value[tag] = fakerRU.number.int({ min: 1, max: 1000 });
  }
  return value;
};

interface IDataChart {
  value: number;
  label: string;
}

export const ThemeVideos: FC = () => {
  const { data: bloggerStats } = useGetBloggerMutateStats();
  const [scroll, setScroll] = useState<boolean>(false);
  const [isMany, setIsMany] = useState<boolean>(false);
  const [fakerData] = useState(genFakeData());

  const dataChart: IDataChart[] | null = useMemo(() => {
    const value: IDataChart[] = [];
    for (const key in fakerData) {
      const element = fakerData[key];
      value.push({ value: element, label: key });
    }
    if (value.length > 8) setIsMany(true);
    return value;
  }, [bloggerStats]);

  const summ: number = useMemo(() => {
    if (!dataChart) return 0;
    return dataChart.reduce((acc, el) => acc + el.value, 0);
  }, [dataChart]);

  const onChangeScroll = () => {
    setScroll(!scroll);
  };

  return (
    <>
      {!!dataChart && (
        <Grid2 xs={12} md="auto" lg="auto">
          <Paper
            sx={{
              position: `relative`,
              width: { xs: `100%`, md: `400px`, lg: `400px` },
              height: `500px`,
              padding: 1,
            }}
          >
            <IconButton sx={{ position: `absolute`, top: `0px`, right: `0px` }}>
              <MoreVertIcon />
            </IconButton>
            <Stack spacing={2} height={`100%`}>
              <Typography variant="h6" pr={2} color={theme.palette.error.main}>
                {`Тематика видео в роликах`}
              </Typography>
              <Box
                sx={{
                  position: `relative`,
                  width: `100%`,
                  height: `100%`,
                }}
              >
                <Box
                  sx={{
                    position: `absolute`,
                    width: `100%`,
                    height: `100%`,
                  }}
                >
                  {!scroll && !!isMany && (
                    <Box
                      sx={{
                        position: `absolute`,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: `100px`,
                        background: `linear-gradient(#fff0, 10%, #fff)`,
                        zIndex: 1,
                      }}
                    >
                      <Button
                        onClick={onChangeScroll}
                        sx={{ width: `100%`, height: `100%` }}
                      >
                        Раскрыть
                      </Button>
                    </Box>
                  )}
                  <Box
                    sx={{
                      height: `100%`,
                    }}
                  >
                    <Virtuoso
                      style={{
                        height: "100%",
                        overflow: !!scroll ? `auto` : `hidden`,
                      }}
                      data={dataChart.sort((a, b) => b.value - a.value)}
                      totalCount={200}
                      itemContent={(index, el) => (
                        <StatElement
                          key={index}
                          value={el.value}
                          label={el.label}
                          summ={summ}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid2>
      )}
    </>
  );
};

interface StatElementProps {
  label: string;
  value: number;
  summ: number;
}

const StatElement: FC<StatElementProps> = ({ label, summ, value }) => {
  return (
    <>
      <Stack spacing={`5px`} sx={{ py: `5px`, px: `3px` }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{label}</Typography>
          <Typography>{`${value.toLocaleString("ru-RU")} / ${((value / summ) * 100).toFixed(
            1
          )}%`}</Typography>
        </Stack>
        <Box sx={{ height: `13px`, position: `relative` }}>
          <Box
            sx={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              position: `absolute`,
              background: theme.palette.primary.main,
              opacity: 0.3,
              borderRadius: `10px`,
            }}
          ></Box>
          <Box
            sx={{
              left: 0,
              top: 0,
              bottom: 0,
              position: `absolute`,
              width: `${((value / summ) * 100).toFixed(1)}%`,
              background: theme.palette.primary.main,
              //   opacity: 0.3,
              borderRadius: `10px`,
            }}
          ></Box>
        </Box>
      </Stack>
    </>
  );
};
