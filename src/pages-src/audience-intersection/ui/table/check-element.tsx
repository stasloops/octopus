import { IBlogger } from "@/shared/api/blogger/model";
import { Checkbox } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { useCheckListStore } from "../../model/store";

interface CheckElementProps {
  row: IBlogger;
}

export const CheckElement: FC<CheckElementProps> = ({ row }) => {
  const checkListStore = useCheckListStore((state) => state.value);
  const setCheckListStore = useCheckListStore((state) => state.setValue);

  const checked = useMemo(() => {
    return checkListStore.includes(row.id);
  }, [checkListStore, row]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      const copyCheckListStore = [...checkListStore];
      if (!!newChecked) {
        if (!copyCheckListStore.includes(row.id))
          copyCheckListStore.push(row.id);
      } else {
        const index = copyCheckListStore.findIndex((el) => el == row.id);
        if (index !== -1) copyCheckListStore.splice(index, 1);
      }
      setCheckListStore(copyCheckListStore);
    },
    [row, checkListStore, setCheckListStore]
  );

  return (
    <>
      <Checkbox checked={checked} onChange={handleChange} />
    </>
  );
};
