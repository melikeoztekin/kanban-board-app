import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import EditBoardForm from "./EditBoardForm";
import service from "../../services/instance";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const BoardListItem = (props: any) => {
  const [editBoardModal, setEditBoardModal] = useState(false);
  const [selectBoard, setSelectBoard] = useState({} as any);
  const handleEditBoardModalClose = () => setEditBoardModal(false);
  const handleEditBoardModalShow = (x: any) => {
    setSelectBoard(x);
    setEditBoardModal(true);
  };

  const deleteBoardListItem = () => {
    if (window.confirm("Silmek istediğine emin misin?")) {
      let token = localStorage.getItem("token");
      let userId = 0;
      if (token !== null) {
        let decode: any = jwt_decode(token);
        userId = decode.id;
      }
      service
        .delete("board/" + `${props.board.id}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          toast.success("Board silindi.");
          props.getBoardList();
        })
        .catch(() => {
          toast.error("Bir hata oluştu.");
        });
    }
  };

  return (
    <div>
      <Card className="justify-content-center" style={{ width: "14rem" }}>
        <Link
          to={`/lists/${props.board.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Card.Body className="card_body p-4">
            <div className="board_add_icon">
              <i className="fa-solid fa-person-chalkboard"></i>
            </div>
            <Card.Title>{props.board.title}</Card.Title>
          </Card.Body>
        </Link>
        <Card.Footer className="d-flex justify-content-between">
          <Card.Link
            href="#"
            style={{
              color: "green",
              textDecoration: "none",
              fontSize: "16px",
            }}
            onClick={() => handleEditBoardModalShow(props.board)}
          >
            Düzenle
          </Card.Link>
          <Card.Link
            href="#"
            style={{
              color: "orange",
              textDecoration: "none",
              fontSize: "16px",
            }}
            onClick={() => deleteBoardListItem()}
          >
            Sil
          </Card.Link>
        </Card.Footer>
      </Card>

      <Modal show={editBoardModal} onHide={handleEditBoardModalClose}>
        <EditBoardForm
          onHide={handleEditBoardModalClose}
          getBoardList={props.getBoardList}
          board={selectBoard}
        />
      </Modal>
    </div>
  );
};

export default BoardListItem;
