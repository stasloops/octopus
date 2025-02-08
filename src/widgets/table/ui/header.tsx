import {LayoutHeight} from "@/widgets/layout/model/const";
import {Button, TableCell, TableRow} from "@mui/material";
import {useState} from "react";
import {useBloggerTableStore} from "@/entities/bloger/model/store";
import {TableModal} from "@/widgets/table/ui/modal";
import {SelectedBlogger, useSelectedBloggers} from "@/widgets/table/model/selected-bloggers-store";


export function FixedHeaderContent() {
  const {bloggerTable, selectable} = useBloggerTableStore();
  const { setSelectedBloggers, toggleSelectAll, isAllSelected, selectedBloggers } = useSelectedBloggers();
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectAllClick = () => {
    const bloggers = bloggerTable?.data.map((blogger) => ({
      id: blogger.id,
      name: blogger.title,
    })) as unknown as SelectedBlogger[];
    setSelectedBloggers(bloggers)
    toggleSelectAll();
  }

  const handleModalClick = () => {
    setModalOpen(prev => !prev);
  };

  return (
    <>
      <TableRow
        sx={{
          position: `sticky`,
          top: `${LayoutHeight}px`,
          background: `#fff`,
          display: {
            xs: `none`,
            md: `table-row`,
            lg: `table-row`,
          },
        }}
      >
        {selectable &&
            <TableCell
            sx={{
              width: '100px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={handleSelectAllClick}
            >
              {isAllSelected ? 'Снять всё' : 'Выбрать всё'}
            </TableCell>
        }
        <TableCell sx={{ width: `70px` }}>Аватар</TableCell>
        <TableCell sx={{}}>Имя / Кол-во подписчиков</TableCell>
        <TableCell sx={{}}>Описание</TableCell>
        <TableCell sx={{}}>Логин / ID</TableCell>
        <TableCell sx={{}}>ER, %</TableCell>
        <TableCell sx={{}}></TableCell>
        <TableCell sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'end',
          minHeight: '60px',
          maxHeight: '100%',
          width: '100%',
          borderBottom: 'rgb(224, 224, 224, 0.4) 1px solid'
        }} className="deleteSelectedBloggerTableCell">
          {selectable &&
              <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: 20,
                    opacity: 1,
                  }}
                  onClick={handleModalClick}
                  disabled={selectedBloggers.length === 0}
              >
                  Удалить
              </Button>
          }
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          position: `sticky`,
          top: `${LayoutHeight}px`,
          background: `#fff`,
          display: {
            xs: `table-row`,
            md: `none`,
            lg: `none`,
          },
        }}
      >
        <TableCell sx={{ width: `140px` }}>Имя / Кол-во подписчиков</TableCell>
        <TableCell sx={{}}></TableCell>
        <TableCell sx={{}}>ER, %</TableCell>
        <TableCell sx={{ width: `120px` }}>Описание</TableCell>
        <TableCell sx={{}}></TableCell>
      </TableRow>

      <TableModal handleModalClick={handleModalClick} open={modalOpen}/>
    </>
  );
}
