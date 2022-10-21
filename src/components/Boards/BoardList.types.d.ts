export type BoardListAddProps = {
  onBoardListAdd: (values: BoardListAddValuesProps) => void;
  onHide: any;
};

export type BoardListAddValuesProps = {
  title: string;
  ownerId: number;
};

export type BoardListItemProps = {
  board: any;
  getBoardList: any;
  onHide: any;
};

export type BoardListItemValuesProps = {
  title: string;
  ownerId: number;
};
