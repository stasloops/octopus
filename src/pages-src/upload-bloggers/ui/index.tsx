"use client";

import {Layout} from "@/widgets/layout";
import {Box, Stack, Typography} from "@mui/material";
import {ReactNode, useState, useMemo} from "react";
import {UploadBloggersElement} from "@/pages-src/upload-bloggers/ui/upload_bloggers";
import {DeleteBloggersElement} from "@/pages-src/upload-bloggers/ui/delete_bloggers";

const VIEW_OPTIONS = {
  UPLOAD: 'upload_bloggers',
  DELETE: 'delete_bloggers'
} as const;

type ViewType = typeof VIEW_OPTIONS[keyof typeof VIEW_OPTIONS];

const ViewTab = ({ 
  isActive, 
  onClick, 
  children 
}: { 
  isActive: boolean; 
  onClick: () => void; 
  children: ReactNode
}) => (
  <Typography
    sx={{
      fontWeight: 600,
      fontSize: '20px',
      color: isActive ? 'inherit' : 'rgb(181, 205, 239)',
      cursor: 'pointer',
      userSelect: 'none',
    }}
    onClick={onClick}
  >
    {children}
  </Typography>
);

export const Page = () => {
  const [view, setView] = useState<ViewType>(VIEW_OPTIONS.UPLOAD);

  const content = useMemo(() => {
    return {
      [VIEW_OPTIONS.UPLOAD]: <UploadBloggersElement />,
      [VIEW_OPTIONS.DELETE]: <DeleteBloggersElement />
    }[view];
  }, [view]);

  return (
    <>
      <Layout />
      <Box
        sx={{
          width: '100%',
          p: { xs: '18px', md: '38px' }
        }}
      >
        <Stack direction="row" spacing={5}>
          <ViewTab 
            isActive={view === VIEW_OPTIONS.UPLOAD}
            onClick={() => setView(VIEW_OPTIONS.UPLOAD)}
          >
            Загрузка блогеров
          </ViewTab>
          <ViewTab 
            isActive={view === VIEW_OPTIONS.DELETE}
            onClick={() => setView(VIEW_OPTIONS.DELETE)}
          >
            Удаление блогеров
          </ViewTab>
        </Stack>
      </Box>
      {content}
    </>
  );
};
