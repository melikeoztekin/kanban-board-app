import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Collapse, Fade } from "react-bootstrap";
import AddListForm from "./AddListForm";
import { ListAddProps } from "./Lists.types";
import ListsItem from "./ListsItem";
import service from "../../services/instance";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Lists = () => {
  const [list, setList] = useState([] as any[]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const closeBtn = () => {
    setOpen(false);
  };

  useEffect(() => {
    getList();
    return () => {};
  }, []);

  const handleListAdd: ListAddProps["onListAdd"] = (values) => {
    service
      .post("list", values, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then(() => {
        toast.success("Yeni liste oluşturuldu.");
        getList();
      })
      .catch((error) => {
        toast.error("Bir hata oluştu");
      });
  };

  const getList = () => {
    let token = localStorage.getItem("token");
    let userId = 0;
    if (token !== null) {
      let decode: any = jwt_decode(token);
      userId = decode.id;
    }
    service
      .get("list", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        let data = response.data.filter((x: any) => x.boardId == id);
        setList(data);
      });
  };

  return (
    <div className="m-2">
      <Container fluid>
        <Row>
          {list.map((x) => (
            <Col sm={6} md={4} lg={3} key={x.id}>
              <ListsItem getList={getList} list={x} />
            </Col>
          ))}

          <Col sm={6} md={4} lg={3}>
            <Card
              className="card_body"
              style={
                open
                  ? { display: "none" }
                  : {
                      height: "70px",
                      borderRadius: "20px",
                    }
              }
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="collapse-form"
            >
              <Card.Body>
                <Card.Text>
                  <i className="list_add_icon fa-solid fa-plus"></i>
                  <strong>Yeni Liste Ekle</strong>
                </Card.Text>
              </Card.Body>
            </Card>
            <Collapse in={open}>
              <div id="collapse-form">
                <AddListForm
                  boardId={id == undefined ? 0 : parseInt(id)}
                  onListAdd={handleListAdd}
                  closeBtn={closeBtn}
                />
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Lists;
