import { CustomTextField } from "@/src/shared/ui/custom-text-field";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";

interface IDataChart {
  value: number;
  label: string;
}

export const TagClip: FC = () => {
  const { data: bloggerStats } = useGetBloggerMutateStats();
  const [scroll, setScroll] = useState<boolean>(false);
  const [isMany, setIsMany] = useState<boolean>(false);

  const [search, setSearch] = useState<string>(``);
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const dataChart: IDataChart[] | null = useMemo(() => {
    if (!bloggerStats) return null;
    if (bloggerStats.clips_tags === undefined) return null;
    if (Object.keys(bloggerStats.clips_tags).length == 0) return null;
    const value: IDataChart[] = [];
    for (const key in bloggerStats.clips_tags) {
      const element = bloggerStats.clips_tags[key];
      value.push({ value: element, label: key });
    }
    const valueFilter = !search
      ? value
      : value.filter((el) =>
          el.label.toLowerCase().includes(search.toLocaleLowerCase())
        );
    return valueFilter;
  }, [bloggerStats, search]);

  const refBox1 = useRef<HTMLDivElement>();
  const refBox2 = useRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      if (!refBox1.current || !refBox2.current) return;
      setIsMany(
        refBox2.current.clientHeight - 4 > refBox1.current.clientHeight
      );
    }, 1000);
  }, [dataChart]);

  const onChangeScroll = () => {
    setScroll(!scroll);
  };

  const [open, setOpen] = useState<boolean>(false);

  const onChangeOpen = () => {
    setOpen(!open);
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
            <Stack
              direction="row"
              spacing={0}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                position: `absolute`,
                top: `20px`,
                right: `5px`,
              }}
            >
              <IconButton onClick={onChangeOpen}>
                <FilterAltOutlinedIcon sx={{ color: `#B5CDEF` }} />
              </IconButton>
              <IconButton>
                <MoreVertIcon sx={{ color: `#B5CDEF` }} />
              </IconButton>
            </Stack>
            <Stack spacing={2} height={`100%`}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: `600`,
                    fontSize: `20px`,
                    color: `#2B3A8B`,
                    whiteSpace: `pre-wrap`,
                    height: `30px`,
                  }}
                  pr={2}
                >
                  {`Теги под клипами\n(короткие ролики)`}
                </Typography>
                <Collapse in={open}>
                  <CustomTextField
                    fullWidth
                    label="Поиск"
                    variant="outlined"
                    size="small"
                    onChange={onChangeText}
                    value={search}
                    sx={{ mt: `30px` }}
                  />
                </Collapse>
              </Box>

              <Box
                ref={refBox1}
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
                    overflow: !!scroll ? `auto` : `hidden`,
                  }}
                >
                  {!scroll && !!isMany && (
                    <Box
                      sx={{
                        position: `absolute`,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: `162px`,
                        background: `linear-gradient(#fff0, 10%, #fff)`,
                      }}
                    >
                      <Button
                        onClick={onChangeScroll}
                        sx={{
                          width: `100%`,
                          height: `100%`,
                          fontWeight: `400`,
                          fontSize: `24px`,
                          color: `#222657`,
                        }}
                      >
                        Раскрыть
                      </Button>
                    </Box>
                  )}
                  <Box ref={refBox2} sx={{ pt: `28px` }}>
                    <Grid2
                      container
                      columnSpacing={`17px`}
                      rowSpacing={`11px`}
                      width={`calc(100% - 17px)`}
                    >
                      {dataChart
                        .sort((a, b) => b.value - a.value)
                        .map((el, index) => (
                          <Grid2 xs="auto" key={index}>
                            <Stack
                              direction="row"
                              spacing={`5px`}
                              sx={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Chip
                                label={el.label}
                                variant="filled"
                                sx={{
                                  height: `27px`,
                                  background: `#D9E3F3`,
                                  "& .MuiChip-label": {
                                    color: `#222657`,
                                    fontSize: `12px`,
                                    fontWeight: 400,
                                    lineHeight: `15px`,
                                  },
                                }}
                              />
                              <Typography
                                sx={{
                                  color: `#222657`,
                                  fontSize: `12px`,
                                  fontWeight: 400,
                                  lineHeight: `15px`,
                                }}
                              >
                                {el.value}
                              </Typography>
                            </Stack>
                          </Grid2>
                        ))}
                    </Grid2>
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
