import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useBloggerTableStore, useCheckListStore } from "../../model/store";
import { NameInput } from "./names-input";
import { SubmitButton } from "./submit-button";

interface ButtonModalProps {
  type: `xlsx` | `pdf`;
  label: string;
}

export const ButtonModal: FC<ButtonModalProps> = ({ label, type }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const checkListStore = useCheckListStore((state) => state.value);
  const bloggerTable = useBloggerTableStore((state) => state.value);

  return (
    <>
      <MenuItem onClick={handleClickOpen}>{label}</MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{label}</DialogTitle>
        <DialogContent>
          <Stack
            spacing={2}
            sx={{
              my: 1,
              width: { xs: `100%`, md: `500px`, lg: `500px` },
            }}
          >
            <NameInput />
            <Stack spacing={1}>
              {checkListStore.map((el, index) => {
                if (!bloggerTable?.data) return;
                const row = bloggerTable.data.find(
                  (elData) => elData.id === el
                );
                if (!row) return;
                return (
                  <Typography key={index}>{`${index + 1}. ${
                    row.title
                  }`}</Typography>
                );
              })}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <SubmitButton type={type} />
        </DialogActions>
      </Dialog>
    </>
  );
};
