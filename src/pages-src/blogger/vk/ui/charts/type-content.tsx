import { theme } from "@/src/shared/lib/theme";
import { fakerRU } from "@faker-js/faker";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { FC, useMemo } from "react";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";

export const TypeContent: FC = () => {
  const { data: bloggerStats } = useGetBloggerMutateStats();

  const dataChart: MakeOptional<PieValueType, "id">[] | null = useMemo(() => {
    const value = [
      { value: fakerRU.number.int({ min: 0, max: 1000 }), label: "Видеоклипы" },
      {
        value: fakerRU.number.int({ min: 0, max: 1000 }),
        label: "Короткие видео",
      },
      { value: fakerRU.number.int({ min: 0, max: 1000 }), label: "Посты" },
    ];
    return value;
  }, [bloggerStats]);

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
            <Stack spacing={2}>
              <Typography variant="h6" color={theme.palette.error.main}>
                Тип контента
              </Typography>
              <Box
                sx={{
                  width: `100%`,
                  height: `calc(500px - 70px)`,
                }}
              >
                <ChartElement dataChart={dataChart} />
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
            arcLabel: (item) => `${((item.value / summ) * 100).toFixed(1)}%`,
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
        }}
        margin={{ top: 10, bottom: 110, left: 10, right: 10 }}
        slotProps={{
          legend: {
            // direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            padding: 0,
          },
        }}
      />
    </>
  );
};
