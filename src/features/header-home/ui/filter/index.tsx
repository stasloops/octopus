import {
  Box,
  Button,
  Chip,
  Stack,
  SxProps,
  TextField,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { SearchInput } from "./search-input";

const InputSX: SxProps<Theme> | any = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: `#B5CDEF`,
    zIndex: -1,
  },
  "& .MuiInputLabel-root": {
    color: `#B5CDEF`,
  },
};

export const FilterElement: FC = () => {
  return (
    <Box
      sx={{
        padding: { xs: `56px 20px`, md: `47px 38px`, lg: `47px 38px` },
        "& .MuiInputBase-root": {
          borderRadius: `20px`,
        },
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: `600`, fontSize: `20px` }}>
              Фильтр
            </Typography>
            <Tooltip title={`В разработке`}>
              <Chip
                color="error"
                size="small"
                label="В разработке"
                variant="outlined"
              />
            </Tooltip>
          </Stack>
        </Box>
        <Box>
          <SearchInput />
        </Box>
        <Box sx={{ width: `cacl(100% + 20px)` }}>
          <Grid2
            sx={{
              justifyContent: {
                xs: `center`,
                md: `flex-start`,
                lg: `flex-start`,
              },
              alignItems: {
                xs: `flex-start`,
                md: `flex-start`,
                lg: `flex-start`,
              },
            }}
            container
            spacing={`20px`}
          >
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Кол-во подписчиков"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="География аудитории"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Упоминания бренда"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="ER% в сообществе"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Аккаунт в другой социальной сети"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Рекламодатели"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Кол-во подписок"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Кол-во постов (в блоге за весь период)"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Подтверждённый аккаунт"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Местоположение"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Теги постов"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Кол-во просмотров (VK Video)"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Тематика сообщества"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Кол-во просмотров в клипах"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
            <Grid2 xs={6} md={6} lg={4}>
              <TextField
                fullWidth
                label="Средний охват в сообществах"
                variant="outlined"
                size="small"
                sx={InputSX}
              />
            </Grid2>
          </Grid2>
        </Box>
        <Box
          sx={{
            position: `relative`,
            px: {
              xs: `41px`,
              md: 0,
              lg: 0,
            },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: `20px`,
              width: {
                xs: `100%`,
                md: `98px`,
                lg: `98px`,
              },
            }}
          >
            Поиск
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
