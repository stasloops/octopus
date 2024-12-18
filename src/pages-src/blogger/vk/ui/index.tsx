import { IBlogger } from "@/src/shared/api/blogger/http-get-blogger";
import { Layout } from "@/src/widgets/layout";
import { Box } from "@mui/material";
import { FC } from "react";

interface PageProps {
  blogger: IBlogger;
}

export const Page: FC<PageProps> = ({ blogger }) => {
  // const setBloggerTable = useBloggerTableStore((state) => state.setValue);

  // useEffect(() => {
  //   setBloggerTable(blogger || null);
  // }, [blogger]);

  return (
    <>
      <Layout />
      <Box>
        {/* <Typography
          variant="h6"
          sx={{ px: `40px`, pt: `15px` }}
        >{`Аналитика аккаунта`}</Typography> */}
      </Box>
    </>
  );
};
