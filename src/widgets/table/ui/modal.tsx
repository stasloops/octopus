import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useDeleteSelectedBloggers} from "@/widgets/table/api/use-delete-selected-bloggers";
import {useTableStore} from "@/widgets/table/model/use-table-store";
import {useBloggerTableStore} from "@/entities/bloger/model/store";
import {useSelectedBloggers} from "@/widgets/table/model/selected-bloggers-store";

type TableModalProps = {
  open: boolean
  handleModalClick: ()=>void
}

export const TableModal = ({open, handleModalClick}: TableModalProps) => {
  const { selectable } = useTableStore();
  const { removeBlogger } = useBloggerTableStore();
  const { selectedBloggers, setSelectedBloggers } = useSelectedBloggers();
  const { mutateAsync } = useDeleteSelectedBloggers();

  if (!selectable) {
    return <></> // if we don't need to select bloggers for deletion, no modal needed
  }

  const deleteSelectedBloggers = async () => {
    await mutateAsync();
    selectedBloggers.forEach((blogger) => {
      removeBlogger(blogger.id);
    });
    setSelectedBloggers([]); // empty selected bloggers list
    handleModalClick();
  }

  return (
    <Dialog open={open} onClose={handleModalClick} sx={{height: '100%', maxHeight: 'fit-content'}}>
      <DialogTitle>Удалить блогеров</DialogTitle>
      <DialogContent>
        <p>Вы уверены, что хотите удалить выбранных блогеров?</p>
        {selectedBloggers.map((elem, index)=>(
          <p key={elem.id}>{index+1}. {elem.name}</p>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleModalClick} color="primary">Отмена</Button>
        <Button onClick={deleteSelectedBloggers} color="primary">Удалить</Button>
      </DialogActions>
    </Dialog>
  );
};
