import React, { useState } from "react";
import { Card, Button, Fade, ListGroup, Modal } from "react-bootstrap";
import service from "../../services/instance";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import EditListForm from "./EditListForm";

const ListsItem = (props: any) => {
  const [open, setOpen] = useState(false);
  const [editListModal, setEditListModal] = useState(false);
  const [selectList, setSelectList] = useState({} as any);
  const handleEditListModalClose = () => setEditListModal(false);
  const handleEditListModalShow = (x: any) => {
    setSelectList(x);
    setEditListModal(true);
  };

  const deleteList = () => {
    if (window.confirm("Silmek istediğine emin misin?")) {
      let token = localStorage.getItem("token");
      let userId = 0;
      if (token !== null) {
        let decode: any = jwt_decode(token);
        userId = decode.id;
      }
      service
        .delete("list/" + `${props.list.id}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          toast.success("Liste silindi.");
          props.getList();
        })
        .catch(() => {
          toast.error("Bir hata oluştu");
        });
    }
  };
  return (
    <div>
      <Card
        className="mb-2 p-0"
        style={{
          borderRadius: "20px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <Card.Body>
          <div className="d-flex justify-content-between mb-2">
            <div>
              <strong>{props.list.title}</strong>
            </div>
            <div className="text-end">
              <Button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#000",
                  padding: "0",
                }}
                onClick={() => setOpen(!open)}
                aria-controls="example-fade-text"
                aria-expanded={open}
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </Button>
              <Fade in={open}>
                <ListGroup
                  style={{
                    margin: "-20px 10px 0px 0",
                    zIndex: "2",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  <ListGroup.Item
                    action
                    onClick={() => handleEditListModalShow(props.list)}
                  >
                    Düzenle
                  </ListGroup.Item>
                  <ListGroup.Item action onClick={() => deleteList()}>
                    Sil
                  </ListGroup.Item>
                </ListGroup>
              </Fade>
            </div>
          </div>
          {/* <Card
          className="p-0 mb-2"
          style={{
            fontSize: "14px",
            borderRadius: "10px",
          }}
        >
          <Card.Body>Kart adı</Card.Body>
          <Card.Footer
            className="d-flex justify-content-between"
            style={{ backgroundColor: "#fff", borderRadius: "0 0 20px 20px" }}
          >
            <div>
              <i className="fa-regular fa-eye"></i>
            </div>
            <div>
              <i className="fa-solid fa-paperclip"></i>&nbsp;0
            </div>
          </Card.Footer>
        </Card>
        <Card
          className="p-0"
          style={{
            fontSize: "14px",
            borderRadius: "10px",
          }}
        >
          <Card.Body>Kart adı</Card.Body>
          <Card.Footer
            className="d-flex justify-content-between"
            style={{ backgroundColor: "#fff", borderRadius: "0 0 20px 20px" }}
          >
            <div>
              <i className="fa-regular fa-eye"></i>
            </div>
            <div>
              <i className="fa-solid fa-paperclip"></i>&nbsp;0
            </div>
          </Card.Footer>
        </Card> */}
        </Card.Body>
        <Card.Footer style={{ borderRadius: "0 0 20px 20px" }}>
          <i className="fa-solid fa-plus"></i>&nbsp; Yeni kart ekle
        </Card.Footer>
      </Card>
      <Modal show={editListModal} onHide={handleEditListModalClose}>
        <EditListForm
          onHide={handleEditListModalClose}
          getList={props.getList}
          list={selectList}
        />
      </Modal>
    </div>
  );
};

export default ListsItem;
