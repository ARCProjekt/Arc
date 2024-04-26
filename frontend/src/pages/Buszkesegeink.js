import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useLanguage } from "./NyelvSegedlet";
import { Nav } from "react-bootstrap";
import axios from "axios";
import AdottAlkoto from "./AdottAlkoto";

export default function Buszkesegeink() {
  const { selectedLanguage } = useLanguage();
  const [buszkeseg, setBuszkeseg] = useState([]);
  const [selectedAlkoto, setSelectedAlkoto] = useState(null);
  const [showBuszkesegek, setShowBuszkesegek] = useState(true);

  useEffect(() => {
    const getBuszkeseg = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/buszkesegeink"
        );
        setBuszkeseg(response.data.buszkesegeink);
      } catch (error) {
        console.error("Error fetching buszkesegeink:", error);
      }
    };

    getBuszkeseg();
  }, []);

  const handleAlkotoClick = (a_azon) => {
    setSelectedAlkoto(a_azon);
    setShowBuszkesegek(false);
  };

  const handleBackButtonClick = () => {
    setSelectedAlkoto(null);
    setShowBuszkesegek(true);
  };

  return (
    <div className="summary-section">
      {showBuszkesegek && (
        <div className="cont katsec">
          <div className="cim">
            <h1>
              {selectedLanguage === "hu"
                ? "Iskolánk büszkeségei"
                : "The Pride of our School"}
            </h1>
          </div>
          <div className="row row-cols-1 row-cols-md-2 g-3 kartya">
            {buszkeseg.map((elem, index) => (
              <div key={index} className="col ">
                <div
                  className="card mb-3 b_kartya"
                  style={{ maxWidth: "540px" }}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={"http://localhost:8000/" + elem.kep}
                        alt=""
                        className="img-fluid rounded-start buszke"
                      />
                    </div>
                    <div className="col-md-8 d-flex flex-column">
                      <div className="card-body text-center p-3">
                        <h5 className="card-title">
                          {selectedLanguage === "hu"
                            ? elem.alkoto_nevHU
                            : elem.alkoto_nevEN}
                        </h5>
                        <p className="card-text">
                          {selectedLanguage === "hu"
                            ? "Szak: " + elem.szakHU
                            : "Technical: " + elem.szakEN}
                        </p>
                      </div>
                      <div className="mt-auto text-center p-3">
                        <Nav.Link
                          className="link"
                          onClick={() => handleAlkotoClick(elem.a_azon)}
                        >
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
      )}
      {selectedAlkoto && (
        <div>
          {selectedLanguage === "hu"
                            ?<AdottAlkoto a_azon={selectedAlkoto} Vissza={handleBackButtonClick} szoveg={"Vissza a büszkeségekhez"}/>
                            : <AdottAlkoto a_azon={selectedAlkoto} Vissza={handleBackButtonClick} szoveg={"Back to our pride"}/>}
          
        </div>
      )}
    </div>
  );
}
