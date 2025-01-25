import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { ButtonBase, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface CustomCheckGroupProps {
  value: string;
  list: {
    id: string;
    label: string;
  }[];
  onChange: (value: string) => void;
}

export const CustomCheckGroup: FC<CustomCheckGroupProps> = ({
  list,
  value,
  onChange,
}) => {
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {list.map((el, index) => (
          <ButtonBase key={index} onClick={() => onChange(el.id)}>
            <Stack
              direction="column"
              spacing="10px"
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: `600`,
                  fontSize: `16px`,
                }}
              >
                {el.label}
              </Typography>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",

                  borderRadius: `20px`,
                  width: `57px`,
                  height: `47px`,
                  ...(el.id == value
                    ? {
                        background: `#2B69D5`,
                      }
                    : {
                        border: `1.79px solid #2B69D5`,
                      }),
                }}
              >
                {el.id == value && (
                  <>
                    <CheckRoundedIcon color="white" />
                  </>
                )}
              </Stack>
            </Stack>
          </ButtonBase>
        ))}
      </Stack>
    </>
  );
};
