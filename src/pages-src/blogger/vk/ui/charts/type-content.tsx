import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { FC, useMemo } from "react";
import { useGetBloggerMutate } from "../../api/use-blogger";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";

export const TypeContent: FC = () => {
  const { data: dataBlogger } = useGetBloggerMutate();
  const { data: bloggerStats } = useGetBloggerMutateStats();

  const dataChart: MakeOptional<PieValueType, "id">[] | null = useMemo(() => {
    if (!dataBlogger) return null;
    if (
      typeof dataBlogger.videos !== "number" ||
      typeof dataBlogger.clips !== "number" ||
      typeof dataBlogger.posts !== "number"
    )
      return null;
    if (dataBlogger.videos + dataBlogger.clips + dataBlogger.posts === 0)
      return null;
    const value = [
      { value: dataBlogger?.videos || 0, label: "видеоклипы" },
      {
        value: dataBlogger?.clips || 0,
        label: "короткие видео",
      },
      { value: dataBlogger?.posts || 0, label: "посты" },
    ];
    return value;
  }, [dataBlogger]);

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
                Тип контента
              </Typography>
              <Box
                sx={{
                  position: `relative`,
                  width: `100%`,
                  height: `100%`,
                }}
              >
                <Box
                  sx={{ position: `absolute`, width: `100%`, height: `100%` }}
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
  const summ: number = useMemo(() => {
    return dataChart
      .map((el) => el.value)
      .reduce((acc, number) => acc + number, 0);
  }, [dataChart]);

  return (
    <>
      <PieChart
        series={[
          {
            valueFormatter: (item) =>
              item === null
                ? ""
                : `${item.value.toLocaleString("ru-RU")} / ${(
                    (item.value / summ) *
                    100
                  ).toFixed(1)}%`,
            arcLabel: (item) => `${((item.value / summ) * 100).toFixed(0)}%`,
            arcLabelMinAngle: 35,
            arcLabelRadius: "60%",
            data: dataChart,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fill: `#fff`,
          },
          [`& .MuiChartsLegend-mark`]: {
            borderRadius: `20px`,
          },
        }}
        margin={{ right: 0, bottom: 100 }}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            padding: 0,
            labelStyle: {
              fontSize: 12,
              fill: "#222657",
            },
          },
        }}
        // slotProps={{
        //   legend: {
        //     // direction: "row",
        //     position: { vertical: "bottom", horizontal: "middle" },
        //     padding: 0,
        //   },
        // }}
        // colors={colorsList.slice(2)}
      />
    </>
  );
};
