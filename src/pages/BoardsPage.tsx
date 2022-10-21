import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { BoardList } from "../components/Boards";

export type BoardsProps = {
  onLogout: () => void;
};

const BoardsPage: FC<BoardsProps> = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    props.onLogout();
    navigate("/login");
  };
  return (
    <div>
      <Header onLogout={handleLogout} />
      <BoardList />
    </div>
  );
};

export default BoardsPage;
