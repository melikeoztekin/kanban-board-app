import React, { FC, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import service from "../../services/instance";

export type HeaderProps = {
  onLogout: () => void;
};

const Header: FC<HeaderProps> = (props) => {
  const [userName, setUserName] = useState([] as any[]);
  useEffect(() => {
    getUserName();
    return () => {};
  }, []);

  const getUserName = () => {
    let token = localStorage.getItem("token");
    let userId = 0;
    if (token !== null) {
      let decode: any = jwt_decode(token);
      userId = decode.id;
    }
    service
      .get("user", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        let data = response.data.filter((x: any) => x.id == userId);
        setUserName(data);
      });
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/boards">
          <i className="bi bi-kanban"></i>&nbsp;Kanban Board App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav>
            <Button className="m-2" variant="secondary" disabled>
              {userName.map((x) => x.username)}&nbsp;
              <i className="fa-solid fa-user-circle"></i>
            </Button>
            <Button
              className="m-2"
              variant="outline-light"
              onClick={props.onLogout}
            >
              Çıkış Yap <i className="fa-solid fa-right-from-bracket"></i>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
