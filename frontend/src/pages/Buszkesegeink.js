import "bootstrap/dist/css/bootstrap.min.css";
//import { alkotok } from "../Alkotok";
import React from "react";
import "../css/Kozos.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react"; 
import { useLanguage } from "./NyelvSegedlet";
export default function Buszkesegeink() {
  const { selectedLanguage } = useLanguage();
   const [buszkeseg, setBuszkeseg] = useState([]); 
    useEffect(() => {
    const getBuszkeseg = async () => {
      const apiBuszkeseg = await axios.get(
        "http://localhost:8000/api/buszkesegeink"
      );
      console.log(apiBuszkeseg.data.buszkesegeink);
      setBuszkeseg(apiBuszkeseg.data.buszkesegeink);
    };
    getBuszkeseg();
  }, []); 
  return (
    <div className="summary-section">
      <div className="cont">
        <div className="cim">
          <h1>{selectedLanguage === "hu" ? "Iskolánk büszkeségei" : "The Pride of our School"}</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-3 kartya">
          {buszkeseg.map((elem, index) => (
            <div key={index} className="col ">
              <div className="card mb-3 b_kartya" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={process.env.PUBLIC_URL + '/public/storage/alkotokepek/sziget.jpg'}
                      alt=""
                      className="img-fluid rounded-start buszke"
                    />
                  </div>
                  <div className="col-md-8 d-flex flex-column">
                    <div className="card-body text-center p-3">
                      <h5 className="card-title">{selectedLanguage === "hu" ? elem.alkoto_nevHU : elem.alkoto_nevEN}</h5>
                      <p className="card-text">{selectedLanguage === "hu" ? "Szak: "+elem.szakHU : "Technical: "+elem.szakEN}</p>
                    </div>
                    <div className="mt-auto text-center p-3">
                      <Nav.Link className="link" as={Link} to="/alkoto">
                      {selectedLanguage === "hu" ? "Megtekintés" : "View"}
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
