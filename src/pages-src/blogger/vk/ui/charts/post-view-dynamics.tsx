import { fakerRU } from "@faker-js/faker";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BarChart, PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";
import { FC, useMemo } from "react";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";

type TTag = { [tag: string]: number };

const genFakeData = (): TTag => {
  const value: TTag = {};
  const count = 11;
  for (let index = 0; index <= count; index++) {
    const tag = `${2024}.${index + 1 < 10 ? `0` : ``}${index + 1}`;
    if (value[tag] !== undefined) continue;
    value[tag] = fakerRU.number.int({ min: 1, max: 1000 });
  }
  return value;
};

interface IDataChart {
  value: number;
  label: string;
}

export const PostViewDynamics: FC = () => {
  const { data: bloggerStats } = useGetBloggerMutateStats();

  const dataChart: IDataChart[] | null = useMemo(() => {
    if (!bloggerStats) return null;
    if (bloggerStats.posts_views_history === undefined) return null;
    if (Object.keys(bloggerStats.posts_views_history).length == 0) return null;
    const value: IDataChart[] = [];
    for (const key in bloggerStats.posts_views_history) {
      const element = bloggerStats.posts_views_history[key];
      value.push({ value: element, label: key });
    }
    return value;
  }, [bloggerStats]);

  return (
    <>
      {!!dataChart && (
        <Grid2 xs={12} md={6} lg={4}>
          <Paper
            sx={{
              borderRadius: `20px`,
              position: `relative`,
              width: `100%`,
              height: `513px`,
              padding: `24px`,
            }}
          >
            <IconButton
              sx={{ position: `absolute`, top: `20px`, right: `5px` }}
            >
              <MoreVertIcon sx={{ color: `#B5CDEF` }} />
            </IconButton>
            <Stack spacing={2} height={`100%`}>
              <Typography
                sx={{
                  fontWeight: `600`,
                  fontSize: `20px`,
                  color: `#2B3A8B`,
                }}
                pr={2}
              >
                Динамика просмотров постов
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
                    ...(dataChart.length < 5
                      ? {
                          height: `50%`,
                        }
                      : {}),
                  }}
                >
                  <ChartElement dataChart={dataChart} />
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid2>
      )}
    </>
  );
};

const ChartElement: FC<{
  dataChart: MakeOptional<PieValueType, "id">[];
}> = ({ dataChart }) => {
  return (
    <>
      <BarChart
        yAxis={[{ scaleType: "band", data: dataChart.map((el) => el.label) }]}
        series={[{ data: dataChart.map((el) => el.value) }]}
        margin={{ left: 65, top: 10 }}
        layout="horizontal"
      />
    </>
  );
};
