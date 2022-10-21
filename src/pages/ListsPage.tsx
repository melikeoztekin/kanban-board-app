import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Lists } from "../components/Lists";

export type ListsProps = {
  onLogout: () => void;
};

const ListsPage: FC<ListsProps> = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    props.onLogout();
    navigate("/login");
  };
  return (
    <div>
      <Header onLogout={handleLogout} />
      <Lists />
    </div>
  );
};

export default ListsPage;
