import {UploadCsv} from "@/pages-src/upload-bloggers/ui/upload-csv";
import {Box, Link} from "@mui/material";
import {useSave} from "@/pages-src/upload-bloggers/lib/hooks/use-save";

export const UploadBloggersElement = () => {
  const handleSaveBloggerPlatform = useSave();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          pl: {
            xs: `18px`,
            md: `38px`,
            lg: `38px`,
          },
          pr: {
            xs: `18px`,
            md: `38px`,
            lg: `38px`,
          }
      }}>
        <UploadCsv fallback={handleSaveBloggerPlatform} />
        <Link
          sx={{
            cursor: "pointer",
            mt: '15px',
          }}
          href="/pdf/manual.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Инструкция по добавлению сообществ
        </Link>
      </Box>
    </>
  );
};
