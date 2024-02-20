import "bootstrap/dist/css/bootstrap.min.css";
import { alkotok } from "../Alkotok";
import React from "react";
import "../css/Kozos.css";
import {  Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Buszkesegeink() {
  return (
    <div className="summary-section">
      <div className="cont">
        <div className="cim">
          <h1>Iskolánk Büszkeségei</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-3 kartya">
          {alkotok.map((elem, index) => (
            <div key={index} className="col ">
              <div className="card mb-3 b_kartya" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={process.env.PUBLIC_URL + elem.src}
                      alt=""
                      className="img-fluid rounded-start buszke"
                    />
                  </div>
                  <div className="col-md-8 d-flex flex-column">
                    <div className="card-body text-center p-3">
                      <h5 className="card-title">{elem.nev}</h5>
                      <p className="card-text">{"Szak: " + elem.szak}</p>
                    </div>
                    <div className="mt-auto text-center p-3">
                      <Nav.Link
                        className="link"
                        as={Link}
                        to="/alkoto"
                        
                      >
                        Megtekintés
                      </Nav.Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
