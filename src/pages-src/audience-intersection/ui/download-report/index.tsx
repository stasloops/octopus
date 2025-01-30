import { zodResolver } from "@hookform/resolvers/zod";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, Menu, Stack } from "@mui/material";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  defaultFormModalFilter,
  FormFilterModalSchema,
  IFormModalFilter,
} from "../../model/form";
import { useCheckListStore } from "../../model/store";
import { ButtonModal } from "./button-modal";

export const DownloadReport: FC = () => {
  const methods = useForm<IFormModalFilter>({
    mode: "onChange",
    defaultValues: defaultFormModalFilter,
    resolver: zodResolver(FormFilterModalSchema),
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkListStore = useCheckListStore((state) => state.value);

  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: {
            xs: `18px`,
            md: `38px`,
            lg: `38px`,
          },
          pt: `15px`,
          height: `50px`,
        }}
      >
        <Box />
        <Box>
          <Button
            endIcon={<DownloadIcon />}
            onClick={handleClick}
            sx={{
              display: checkListStore.length > 0 ? `flex` : `none`,
            }}
          >
            Скачать
          </Button>
        </Box>
      </Stack>

      <FormProvider {...methods}>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock
          anchorOrigin={{
            horizontal: `right`,
            vertical: `bottom`,
          }}
          transformOrigin={{
            horizontal: `right`,
            vertical: `top`,
          }}
        >
          <ButtonModal label="Скачать XLSX" type="xlsx" />
          {/* <ButtonModal label="Скачать PDF" type="pdf" /> */}
        </Menu>
      </FormProvider>
    </>
  );
};
