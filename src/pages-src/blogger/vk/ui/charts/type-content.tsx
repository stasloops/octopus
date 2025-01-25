import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  Paper,
  Portal,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";
import {
  pieArcClasses,
  pieArcLabelClasses,
  PieChart,
} from "@mui/x-charts/PieChart";
import { FC, useMemo, useRef } from "react";
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
      { value: dataBlogger?.posts || 0, label: "посты" },
      { value: dataBlogger?.videos || 0, label: "видеоклипы" },
      {
        value: dataBlogger?.clips || 0,
        label: "короткие видео",
      },
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

  const container = useRef(null);

  return (
    <>
      <PieChart
        colors={[`var(--my-custom-gradient, #123456)`, `#70D2F8`, `#B5CDEF`]}
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
            // startAngle: 90,
            // endAngle: 450,
            arcLabelMinAngle: 35,
            arcLabelRadius: "60%",
            data: dataChart,
          },
        ]}
        sx={{
          "--my-custom-gradient": "url(#GlobalGradient)",
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fill: `#fff`,
          },
          [`& .${pieArcClasses.root}`]: {
            stroke: `none`,
            filter: `drop-shadow(0 0 0.40rem rgba(0,0,0,.5))`,
          },
        }}
        margin={{ right: 0, bottom: 90, top: 20 }}
        slotProps={{
          popper: {
            sx: {
              "--my-custom-gradient":
                "linear-gradient(267.43deg, #2B69D5 13.87%, #70D2F8 97.91%)",
            },
          },
        }}
        slots={{
          pieArcLabel: (props) => {
            const { startAngle, endAngle, arcLabelRadius, formattedArcLabel } =
              props;

            const size = endAngle.get() - startAngle.get();
            let fontSize = 0;
            if (size >= 0.3) fontSize = 10;
            if (size >= 0.5) fontSize = 15;
            if (size >= 1) fontSize = 20;
            if (size >= 2) fontSize = 25;
            if (size >= 3) fontSize = 30;
            if (size >= 4) fontSize = 35;
            if (size >= 5) fontSize = 40;
            const y =
              -Math.cos((startAngle.get() + endAngle.get()) / 2) *
              arcLabelRadius.get();
            const x =
              Math.sin((startAngle.get() + endAngle.get()) / 2) *
              arcLabelRadius.get();

            return (
              <g>
                <text
                  textAnchor="middle"
                  y={10}
                  style={{
                    color: `#fff`,
                    fontSize: `${fontSize}px`,
                    fontWeight: 600,
                    transform: `translate3d(${x}px, ${y}px, 0px)`,
                    pointerEvents: `none`,
                  }}
                  fill={"#fff"}
                >
                  {formattedArcLabel}
                </text>
              </g>
            );
          },
          legend: (data) => {
            return (
              <Portal container={() => container.current!}>
                <Grid2
                  direction="row"
                  container
                  columnSpacing="7px"
                  rowSpacing="12px"
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {data.seriesToDisplay.map((el, index) => (
                    <Grid2 xs="auto">
                      <Stack
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        spacing={1}
                        width="100%"
                      >
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing="7px"
                        >
                          <Box
                            sx={{
                              width: `25px`,
                              height: `25px`,
                              borderRadius: `20px`,
                              background: el.color,
                            }}
                          />
                          <Typography
                            textAlign="left"
                            sx={{
                              fontSize: 12,
                              fontWeight: `600`,
                              fill: "#222657",
                            }}
                          >
                            {el.label}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid2>
                  ))}
                </Grid2>
              </Portal>
            );
          },
        }}
      >
        <linearGradient id="GlobalGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0" stopColor="#2B69D5" />
          <stop offset="1" stopColor="#70D2F8" />
        </linearGradient>
      </PieChart>
      <Box
        ref={container}
        sx={{
          width: `100%`,
          position: `absolute`,
          bottom: `30px`,
          "--my-custom-gradient":
            "linear-gradient(267.43deg, #2B69D5 13.87%, #70D2F8 97.91%)",
        }}
      />
    </>
  );
};
