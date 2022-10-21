import React, { useState, useEffect } from "react";
import "./style.css";
import { Card, Modal } from "react-bootstrap";
import AddBoardForm from "./AddBoardForm";
import { toast } from "react-toastify";
import { BoardListAddProps } from "./BoardList.types";
import service from "../../services/instance";
import BoardListItem from "./BoardListItem";
import jwt_decode from "jwt-decode";

const BoardList = () => {
  const [addBoardModal, setAddBoardModal] = useState(false);
  const [boardList, setBoardList] = useState([] as any[]);
  const handleAddBoardModalClose = () => setAddBoardModal(false);
  const handleAddBoardModalShow = () => {
    setAddBoardModal(true);
  };

  useEffect(() => {
    getBoardList();
    return () => {};
  }, []);

  const handleBoardListAdd: BoardListAddProps["onBoardListAdd"] = (values) => {
    service
      .post("board", values, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then(() => {
        toast.success("Yeni board ekleme başarılı.");
        getBoardList();
      })
      .catch((error) => {
        toast.error("Bir hata oluştu");
      });
  };

  const getBoardList = () => {
    let token = localStorage.getItem("token");
    let userId = 0;
    if (token !== null) {
      let decode: any = jwt_decode(token);
      userId = decode.id;
    }
    service
      .get("board", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        let data = response.data.filter((x: any) => x.ownerId == userId);
        setBoardList(data);
      });
  };

  return (
    <div className="m-3 text-center">
      <h3 className="mb-3">Bir Liste Seç</h3>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="m-2">
          <Card
            className="card_body py-4 justify-content-center"
            style={{ width: "14rem" }}
          >
            <Card.Body onClick={() => handleAddBoardModalShow()}>
              <div className="board_add_icon">
                <i className="fa-solid fa-plus"></i>
              </div>
              <Card.Title>Yeni Ekle</Card.Title>
            </Card.Body>
          </Card>
        </div>
        {boardList.map((x) => (
          <div className="m-2" key={x.id}>
            <BoardListItem getBoardList={getBoardList} board={x} />
          </div>
        ))}
      </div>
      <Modal show={addBoardModal} onHide={handleAddBoardModalClose}>
        <AddBoardForm
          onHide={handleAddBoardModalClose}
          onBoardListAdd={handleBoardListAdd}
        />
      </Modal>
    </div>
  );
};

export default BoardList;
