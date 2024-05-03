import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import axios from "../api/axios";
import "../css/Kozos2.css";
import AdottAlkoto from "./AdottAlkoto";
import { useLanguage } from "./NyelvSegedlet";
import GaleriaKep from "./GaleriaKep";
import Kep from "./Kep";
const AdottCsapat = ({
  cs_azon,
  Vissza,
  szoveg,
  angolSzoveg,
  showGomb,
  showNevek,
}) => {
  const { selectedLanguage } = useLanguage();
  const [nagyKepLathato, setNagyKepLathato] = useState(false);
  const [csapat, setCsapat] = useState([]);
  const [alkotok, setAlkotok] = useState([]);
  const [aktKep, setAktKep] = useState(0);
  const [selectedAlkoto, setSelectedAlkoto] = useState(null);
  const [kepek, setKepek] = useState([]);
  const [showAlkoto, setShowAlkoto] = useState(true);
  useEffect(() => {
    const getCsapat = async () => {
      const apiCsapat = await axios.get(
        `http://localhost:8000/api/adott_csapat/${cs_azon}`
      );
      setCsapat(apiCsapat.data.adottcsapatok);
    };

    getCsapat();
  }, [cs_azon]);
  function bezarNagyKep() {
    setNagyKepLathato(false);
  }
  useEffect(() => {
    const getAlkotok = async () => {
      const apiAlkotok = await axios.get(
        `http://localhost:8000/api/csapathozalkoto/${cs_azon}`
      );
      setAlkotok(apiAlkotok.data.alkotok);
    };
    getAlkotok();
  }, [cs_azon]);
  const handleAlkotoClick = (a_azon) => {
    setSelectedAlkoto(a_azon);
    console.log(a_azon);
    setShowAlkoto(false);
  };
  const handleBackButtonClick = () => {
    setSelectedAlkoto(null);
    setShowAlkoto(true);
  };
  function kattintas(kep) {
    setAktKep(kep);
    setNagyKepLathato(true);
  }
  useEffect(() => {
    const getKepek = async () => {
      const apiKepek = await axios.get(
        `http://localhost:8000/api/galeriakepek/${cs_azon}`
      );
      setKepek(apiKepek.data.kepek);
    };
    getKepek();
  }, [cs_azon]);
  return (
    <div className="summary-section">
      {showAlkoto && (
        <div
          className="cont katsec"
          style={{ padding: "10px", border: "10px" }}
        >
          <button
            onClick={Vissza}
            style={{
              margin: "10px",
              background: "none",
              borderRadius: "5px ",
              border: "1px solid grey",
              color: "aliceblue",
              fontSize: "25px",
            }}
          >
            {selectedLanguage === "hu" ? szoveg : angolSzoveg}
          </button>

          {csapat.map((item, index) => (
            <div key={index}>
              <h2>
                {" "}
                {selectedLanguage === "hu"
                  ? item.csapat_nev_magyar
                  : item.csapat_nev_angol}
              </h2>
              <h3>
                {" "}
                {selectedLanguage === "hu" ? "Kategória: " : "Category: "}{" "}
                {selectedLanguage === "hu"
                  ? item.magyar_kategoria
                  : item.angol_kategoria}
              </h3>
            </div>
          ))}
          <h3 className="mb-4" style={{ textAlign: "justify" }}>
            {selectedLanguage === "hu" ? "Csapattagok" : "Team mates"}
          </h3>
          <ul className="list-unstyled">
            {alkotok.map((item, index) => (
              <li className="mb-2" key={index}>
                {showGomb && (
                  <button
                    onClick={() => handleAlkotoClick(item.a_azon)}
                    style={{
                      fontSize: "1.2em",
                      marginBottom: "10px",
                      textAlign: "justify",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      background: "none",
                      color: "aliceblue",
                    }}
                  >
                    {selectedLanguage === "hu"
                      ? item.magyar_nev
                      : item.angol_nev}
                  </button>
                )}
                {showNevek && (
                  <h2
                    style={{
                      fontSize: "1.5em",
                      marginBottom: "10px",
                      color: "aliceblue",
                    }}
                  >
                    {selectedLanguage === "hu"
                      ? item.magyar_nev
                      : item.angol_nev}
                  </h2>
                )}
              </li>
            ))}
          </ul>
          {csapat.map((item) => (
            <div key={item.cs_azon}>
              <div className="mt-4">
                <h3 style={{ textAlign: "justify" }}>
                  {selectedLanguage === "hu"
                    ? "Csapatmunka bemutatása"
                    : "The teamwork"}
                </h3>
                <p className="csapat_szov">
                  {selectedLanguage === "hu"
                    ? item.csapat_bemutat_magyar
                    : item.csapat_bemutat_angol}
                </p>
              </div>
            </div>
          ))}
          <div>
            <h3 style={{ textAlign: "justify" }}>
              {selectedLanguage === "hu"
                ? "Képek a csapat munkájáról"
                : "Pictures of the teamwork"}{" "}
            </h3>
            <div className="mt-5 d-flex justify-content-center">
              <Carousel style={{ width: "60%" }}>
                {kepek.map((kep) => (
                  <Carousel.Item key={kep.kep_azon}>
                    <img
                      className="d-block w-100"
                      src={"http://localhost:8000/" + kep.kep}
                      alt={kep.leiras}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="mt-4">
              {csapat.map((item) => (
                <div key={item.cs_azon}>
                  <h3 style={{ textAlign: "justify" }}>
                    {selectedLanguage === "hu"
                      ? "Csapatmunka bemutatása"
                      : "Presentation of Teamwork"}
                  </h3>
                  <h4 className="csapat_szov">
                  {selectedLanguage === "hu"
                      ? item.csapat_bemutat_magyar
                      : item.csapat_bemutat_angol}
                  </h4>
                </div>
              ))}
            </div>
          </div>
          <h3 style={{ textAlign: "justify" }}>{selectedLanguage === "hu"
                      ? "Képgaléria"
                      : "Gallery"} </h3>
          {nagyKepLathato && (
            <div
              className="nagyKep"
              style={{
                zIndex: 1,
                borderRadius: "10px",
                margin: "100px",
                top: "auto",
                maxWidth: "800px",
              }}
            >
              <button
                onClick={bezarNagyKep}
                style={{
                  border: "0",
                  float: "left",
                  margin: "10px",
                  background: "none",
                }}
              >
                ✖️
              </button>

              <GaleriaKep
                obj={aktKep}
                style={{ width: "40%", margin: "10px" }}
              />
            </div>
          )}
          <div
            className="mt-4"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {kepek.map((item) => (
              <div className="col-4 col-md-4 col-lg-4 mb-3" key={item.kep_azon}>
                <Kep
                  obj={item.kep}
                  index={item.kep}
                  kattintas={() => kattintas(item.kep)}
                />
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
              szoveg={"Vissza a csapathoz"}
              showGomb={false}
            />
          ) : (
            <AdottAlkoto
              a_azon={selectedAlkoto}
              Vissza={handleBackButtonClick}
              szoveg={"Back to the team"}
              showGomb={false}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AdottCsapat;
