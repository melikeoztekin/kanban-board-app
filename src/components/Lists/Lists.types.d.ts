export type ListAddProps = {
  onListAdd: (values: ListAddValuesProps) => void;
  boardId: number;
  closeBtn: any;
};
export type ListAddValuesProps = {
  title: string;
  boardId: number;
  ownerId: number;
};

export type ListItemProps = {
  list: any;
  getList: any;
  onHide: any;
};

export type ListItemValuesProps = {
  title: string;
  boardId: number;
  ownerId: number;
};
