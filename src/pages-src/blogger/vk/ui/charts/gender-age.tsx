import { fakerRU } from "@faker-js/faker";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Checkbox,
  FormControlLabel,
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
  PieChart,
  pieArcClasses,
  pieArcLabelClasses,
} from "@mui/x-charts/PieChart";
import { FC, useMemo, useRef, useState } from "react";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";
import { CustomCheckGroup } from "../lib/custom-check-group";

const genFakeData = (): any => {
  const male = {
    "0-12": fakerRU.number.int({ min: 0, max: 1000 }),
    "13-18": fakerRU.number.int({ min: 0, max: 1000 }),
    "19-30": fakerRU.number.int({ min: 0, max: 1000 }),
    "31-55": fakerRU.number.int({ min: 0, max: 1000 }),
    "56-80": fakerRU.number.int({ min: 0, max: 1000 }),
    "80+": fakerRU.number.int({ min: 0, max: 1000 }),
  };
  const female = {
    "0-12": fakerRU.number.int({ min: 0, max: 1000 }),
    "13-18": fakerRU.number.int({ min: 0, max: 1000 }),
    "19-30": fakerRU.number.int({ min: 0, max: 1000 }),
    "31-55": fakerRU.number.int({ min: 0, max: 1000 }),
    "56-80": fakerRU.number.int({ min: 0, max: 1000 }),
    "80+": fakerRU.number.int({ min: 0, max: 1000 }),
  };
  const none = {
    "0-12": fakerRU.number.int({ min: 0, max: 1000 }),
    "13-18": fakerRU.number.int({ min: 0, max: 1000 }),
    "19-30": fakerRU.number.int({ min: 0, max: 1000 }),
    "31-55": fakerRU.number.int({ min: 0, max: 1000 }),
    "56-80": fakerRU.number.int({ min: 0, max: 1000 }),
    "80+": fakerRU.number.int({ min: 0, max: 1000 }),
  };
  const all = {
    "0-12": male["0-12"] || 0 + female["0-12"] || 0,
    "13-18": male["13-18"] || 0 + female["13-18"] || 0,
    "19-30": male["19-30"] || 0 + female["19-30"] || 0,
    "31-55": male["31-55"] || 0 + female["31-55"] || 0,
    "56-80": male["56-80"] || 0 + female["56-80"] || 0,
    "80+": male["80+"] || 0 + female["80+"] || 0,
  };

  return {
    male,
    female,
    none,
    all,
  };
};

export const GenderAge: FC = () => {
  const { data: bloggerStats } = useGetBloggerMutateStats();
  const [gender, setGender] = useState<string>(`all`);

  const [fakerData] = useState(genFakeData());

  const dataChart: MakeOptional<PieValueType, "id">[] | null = useMemo(() => {
    if (!bloggerStats?.subscribers_genders) return null;

    const subscribersGenders: { [gender: string]: { [age: string]: number } } =
      {
        ...bloggerStats?.subscribers_genders,
        all: {
          "0-12":
            (bloggerStats?.subscribers_genders["male"]?.["0-12"] || 0) +
            (bloggerStats?.subscribers_genders["female"]?.["0-12"] || 0),
          "13-18":
            (bloggerStats?.subscribers_genders["male"]?.["13-18"] || 0) +
            (bloggerStats?.subscribers_genders["female"]?.["13-18"] || 0),
          "19-30":
            (bloggerStats?.subscribers_genders["male"]?.["19-30"] || 0) +
            (bloggerStats?.subscribers_genders["female"]?.["19-30"] || 0),
          "31-55":
            (bloggerStats?.subscribers_genders["male"]?.["31-55"] || 0) +
            (bloggerStats?.subscribers_genders["female"]?.["31-55"] || 0),
          "56-80":
            (bloggerStats?.subscribers_genders["male"]?.["56-80"] || 0) +
            (bloggerStats?.subscribers_genders["female"]?.["56-80"] || 0),
          "80+":
            (bloggerStats?.subscribers_genders["male"]?.["80+"] || 0) +
            (bloggerStats?.subscribers_genders["female"]?.["80+"] || 0),
        },
      };

    const data = subscribersGenders[gender];
    if (!data) return null;

    const value = [
      { value: data["0-12"] || 0, label: "0-12" },
      { value: data["13-18"] || 0, label: "13-18" },
      { value: data["19-30"] || 0, label: "19-30" },
      { value: data["31-55"] || 0, label: "31-55" },
      { value: data["56-80"] || 0, label: "56-80" },
      { value: data["80+"] || 0, label: "80+" },
    ];
    return value;
  }, [bloggerStats, gender]);

  const handleChange = (value: string) => {
    setGender(value);
  };

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
                Пол и возраст аудитории
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
              <Box
                sx={{
                  position: `relative`,
                  width: `100%`,
                  height: `0%`,
                }}
              >
                <Box
                  sx={{
                    position: `absolute`,
                    bottom: `20px`,
                    left: 0,
                    right: 0,
                  }}
                >
                  <CustomCheckGroup
                    value={gender}
                    onChange={handleChange}
                    list={[
                      { id: `all`, label: `Все` },
                      { id: `male`, label: `Мужчины` },
                      { id: `female`, label: `Женщины` },
                    ]}
                  />
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid2>
      )}
    </>
  );
};

interface CheckBoxElementProps {
  value: string;
  gender: string;
  handleChange: (value: string) => (e: any) => void;
  label: string;
}

const CheckBoxElement: FC<CheckBoxElementProps> = ({
  value,
  gender,
  handleChange,
  label,
}) => {
  return (
    <Grid2 xs="auto">
      <FormControlLabel
        sx={{ height: `25px` }}
        control={
          <Checkbox checked={gender == value} onChange={handleChange(gender)} />
        }
        label={label}
      />
    </Grid2>
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
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: `100%`,
          width: `100%`,
          pb: `90px`,
        }}
      >
        <Box sx={{ height: `100%`, width: `100%` }}>
          <PieChart
            colors={[
              `#B6EAFA`,
              `#70D2F8`,
              `#B5CDEF`,
              `var(--my-custom-gradient, #123456)`,
              `#2B69D5`,
              `#222657`,
            ]}
            series={[
              {
                valueFormatter: (item) =>
                  item === null
                    ? ""
                    : `${item.value.toLocaleString("ru-RU")} / ${(
                        (item.value / summ) *
                        100
                      ).toFixed(1)}%`,
                arcLabel: (item) =>
                  `${((item.value / summ) * 100).toFixed(1)}%`,
                arcLabelMinAngle: 35,
                arcLabelRadius: "60%",
                data: dataChart,

                // startAngle: 90,
                // endAngle: 450,
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
            margin={{ right: 10, left: 10, bottom: 10, top: 10 }}
            slots={{
              pieArcLabel: (props) => {
                const {
                  startAngle,
                  endAngle,
                  arcLabelRadius,
                  formattedArcLabel,
                } = props;

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
                        fontSize: `${fontSize * 0.7}px`,
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
                      direction="column"
                      container
                      columnSpacing="7px"
                      rowSpacing="12px"
                      sx={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
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
            // colors={colorsList.slice(6)}
          >
            <linearGradient
              id="GlobalGradient"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0" stopColor="#2B69D5" />
              <stop offset="1" stopColor="#70D2F8" />
            </linearGradient>
          </PieChart>
        </Box>
        <Box
          ref={container}
          sx={{
            width: `110px`,
            "--my-custom-gradient":
              "linear-gradient(267.43deg, #2B69D5 13.87%, #70D2F8 97.91%)",
          }}
        />
      </Stack>
    </>
  );
};
