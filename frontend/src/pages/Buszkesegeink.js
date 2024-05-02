import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useLanguage } from "./NyelvSegedlet";
import { Nav } from "react-bootstrap";
import axios from "axios";
import AdottAlkoto from "./AdottAlkoto";
import Styled from "styled-components";
const StyledCard = Styled.div`
border: none;
transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
overflow: hidden;
border-radius: 20px;
min-height: 350px;
width:4 00px;
box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);

@media (max-width: 768px) {
  min-height: 350px;
}

@media (max-width: 420px) {
  min-height: 300px;
}

&.card-has-bg {
  transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    -webkit-filter: grayscale(1);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
  }

  &:hover {
    transform: scale(0.98);
    box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.3);
    background-size: 130%;
    transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);

    .card-img-overlay {
      transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
      background: rgb(255, 186, 33);
      background: linear-gradient(
        0deg,
        rgba(255, 0, 0, 0.5) 0%,
        rgba(242 , 87, 102, 1) 100%
      );
    }
  }
}

.card-footer {
  background: none;
  border-top: none;
  .media {
    img {
      border: solid 3px rgba(255, 255, 255, 0.3);
    }
  }
}

.card-title {
  font-weight: 800;
}
.card-meta {
  color: rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 2px;
}
.card-body {
  transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
}
&:hover {
  .card-body {
    margin-top: 30px;
    transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  cursor: pointer;
  transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
}
.card-img-overlay {
  transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
  background: rgb(255, 186, 33);
  background: linear-gradient(
    0deg,
    rgba(255, 186, 33, 0.3785889355742297) 0%,
    rgba(242, 87, 102, 1) 100%
  );
}
`;
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
          <div className="row kartya">
            {buszkeseg.map((elem, index) => (
              <div key={index} className="col-sm-12 col-md-6 col-lg-4">
                <StyledCard
                  className="card col-md-8 offset-md-3 b_kartya"
                  style={{
                    padding: "auto",
                    margin: "15px",
                    backgroundImage: `url('http://localhost:8000/${elem.kep}')`,
                  }}
                >
                  <img
                    className="card-img d-none"
                    src={`http://localhost:8000/${elem.kep}`}
                    alt=""
                  />
                  <div className="card-img-overlay d-flex flex-column">
                    <div className="card-body">
                      <h4 className="card-title mt-0 ">
                        <a
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                          onClick={() => handleAlkotoClick(elem.a_azon)}
                        >
                          {selectedLanguage === "hu"
                            ? elem.alkoto_nevHU
                            : elem.alkoto_nevEN}
                        </a>
                      </h4>
                      <small>
                        <i className="far fa-clock">
                          <h4>
                            {selectedLanguage === "hu"
                              ? "Szak: " + elem.szakHU
                              : "Technical: " + elem.szakEN}
                          </h4>
                        </i>
                      </small>
                    </div>
                    <div className="card-footer">
                      <Nav.Link
                        className="link"
                        onClick={() => handleAlkotoClick(elem.a_azon)}
                      >
                        {selectedLanguage === "hu" ? "Megtekintés" : "View"}
                      </Nav.Link>
                    </div>
                  </div>
                </StyledCard>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedAlkoto && (
        <div>
          {selectedLanguage === "hu" ? (
            <AdottAlkoto
              a_azon={selectedAlkoto}
              Vissza={handleBackButtonClick}
              szoveg={"Vissza a büszkeségekhez"}
              showGomb={true}
            />
          ) : (
            <AdottAlkoto
              a_azon={selectedAlkoto}
              Vissza={handleBackButtonClick}
              szoveg={"Back to our pride"}
              showGomb={true}
            />
          )}
        </div>
      )}
    </div>
  );
}
