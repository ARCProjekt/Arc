import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import NyelvValtas from "./pages/NyelvValtas";
import { LanguageProvider, useLanguage } from "./pages/NyelvSegedlet";
import "./css/Kozos2.css";
import useAuthContext from "./contexts/AuthContext";

const LayOut = () => {
  const { user } = useAuthContext();
  const { selectedLanguage } = useLanguage();

  return (
    <div>
      <header className="szin p-3">
        <div>
          <img src={process.env.PUBLIC_URL + "/kepek/logo.png"} alt="" />
          <h1>Arts Of Survival</h1>
        </div>
      </header>
      <Navbar bg="dark" variant="dark" expand="sm" className="p-2 navvv">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            {selectedLanguage === "hu" ? "Főoldal" : "Main page"}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              
              <Nav.Link as={Link} to="/projekt">
                {selectedLanguage === "hu" ? "A projekt" : "The Project"}
              </Nav.Link>
              <Nav.Link as={Link} to="/kategoria">
                {selectedLanguage === "hu" ? "Kategóriák" : "Categories"}
              </Nav.Link>
              <Nav.Link as={Link} to="/csapatok">
                {selectedLanguage === "hu" ? "Csapatok" : "Teams"}
              </Nav.Link>
              <Nav.Link as={Link} to="/alkoto">
                {selectedLanguage === "hu" ? "Alkotó" : "Creator"}
              </Nav.Link>
              <Nav.Link as={Link} to="/buszkesegeink">
                {selectedLanguage === "hu" ? "Büszkeségeink" : "Our Pride"}
              </Nav.Link>

              <Dropdown className="legMenu">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {user ? user.name : "Bejelentkezés"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/AlkotoModosit">
                    {user && user.jog < 3 && "Alkotó Módosítása"}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/Felhasznalo">
                    {user && user.jog === 1 && "Felhasználó Módosítása"}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/csapatletrehoz">
                    {user && user.jog < 3 && "Csapat Módosítása"}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/bejelentkezes">
                    {user ? "Kijelentkezés" : "Bejelentkezés"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
    </div>
  );
};

export default LayOut;
