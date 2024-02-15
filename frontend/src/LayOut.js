import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet } from "react-router-dom";
import NyelvValtas from "./pages/NyelvValtas";
import { LanguageProvider } from "./pages/NyelvSegedlet";
import "./css/Kozos.css";

const LayOut = () => {
  return (
    <div>
      <LanguageProvider>
        <header className="szin p-3 ">
          <h1>Art Of Survival</h1>
        </header>
        <Navbar bg="dark" variant="dark" expand="sm" className="p-2 navvv">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              Főoldal
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/alkoto">
                  Alkotó
                </Nav.Link>
                <Nav.Link as={Link} to="/csapat">
                  Csapat
                </Nav.Link>
                <Nav.Link as={Link} to="/kategoria">
                  Kategóriák
                </Nav.Link>
                <Nav.Link as={Link} to="/buszkesegeink">
                  Büszkeségeink
                </Nav.Link>
                <Nav.Link as={Link} to="/projekt">
                  Projekt
                </Nav.Link>
              </Nav>
              <Nav style={{ marginLeft: "auto" }}>
                <NyelvValtas />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container fluid>
          <Outlet />
        </Container>
        <footer>
          <div className="footer-content">
            <h2 className="footer-heading">Iskola neve: </h2>
            <p className="footer-contact">Telefonszám: +36 30 123 4567</p>
            <p className="footer-contact">E-mail: info@iskola.hu</p>
          </div>
        </footer>
      </LanguageProvider>
    </div>
  );
};

export default LayOut;