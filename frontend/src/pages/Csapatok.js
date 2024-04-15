import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Carousel, Nav } from "react-bootstrap";
import axios from "../api/axios";
import { kepek } from "../KepLista";
import KepGaleria from "./Galeria";
import GaleriaKep from "./GaleriaKep";
import "../css/Kozos2.css";

const OsszCsapat = ({ onCsapatSelect }) => {
  const [csapatok, setCsapatok] = useState([]);

  useEffect(() => {
    const getCsapatok = async () => {
      const apiCsapat = await axios.get("http://localhost:8000/api/csapatok");
      setCsapatok(apiCsapat.data.csapatok);
    };

    getCsapatok();
  }, []);

  const handleClick = (cs_azon) => {
    console.log("Csapat azonosítója:", cs_azon);
    onCsapatSelect(cs_azon);
  };

  return (
    <div className="summary-section">
      <div className="cont">
        {csapatok.map((item) => (
          <div key={item.cs_azon} className="half-circle-card">
            <img
              src={
                "http://localhost:8000" + "/storage/alkotokepek/kave.jpg"
              }
            />
            <div className="content">
              <h3>{item.csapat_nev_magyar}</h3>
              <p>{item.csapat_bemutat_magyar}</p>
              <button onClick={() => handleClick(item.cs_azon)}>
                A csapathoz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdottCsapat = ({ cs_azon }) => {
  const [nagyKepLathato, setNagyKepLathato] = useState(false);
  const [csapat, setCsapat] = useState([]);
  const [alkotok, setAlkotok] = useState([]);
  const [aktKep, setAktKep] = useState(0);
  const [kepek, setKepek] = useState([]);
  useEffect(() => {
    const getCsapat = async () => {
      const apiCsapat = await axios.get(
        `http://localhost:8000/api/adott_csapat/${cs_azon}`
      );
      setCsapat(apiCsapat.data.adottcsapatok);
      console.log(apiCsapat.data.adottcsapatok);
    };

    getCsapat();
  }, []);

  useEffect(() => {
    const getAlkotok = async () => {
      const apiAlkotok = await axios.get(
        `http://localhost:8000/api/csapathozalkoto/${cs_azon}`
      );
      setAlkotok(apiAlkotok.data.alkotok);
      console.log(apiAlkotok.data.alkotok);
    };
    getAlkotok();
  }, [cs_azon]);
  useEffect(() => {
    const getKepek = async () => {
      const apiKepek = await axios.get(
        `http://localhost:8000/api/galeriakepek/${cs_azon}`
      );
      setKepek(apiKepek.data.kepek);
      console.log(apiKepek.data.kepek);
    };

    getKepek();
  }, []);
  function kattintas(index) {
    setAktKep(index);
    setNagyKepLathato(true);
  }

  function bezarNagyKep() {
    setNagyKepLathato(false);
  }

  return (
    <div className="summary-section">
      <div className="cont">
        <div>
          {csapat.map((item) => (
            <div key={item.cs_azon}>
              <h2>{item.csapat_nev_magyar}</h2>
              <h3>Kategória: {item.magyar_kategoria}</h3>
            </div>
          ))}
          <h3 className="mb-4" style={{ textAlign: "justify" }}>
            Csapattagok
          </h3>
          <ul className="list-unstyled">
            {alkotok.map((item, index) => (
              <li className="mb-2" key={index}>
                <Nav.Link
                  className="link"
                  as={Link}
                  to="/alkoto"
                  style={{
                    fontSize: "1.2em",
                    marginBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  {item.magyar_nev}
                </Nav.Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {csapat.map((item) => (
            <div key={item.cs_azon}>
              <div className="mt-4">
                <h3 style={{ textAlign: "justify" }}>Csapatmunka bemutatása</h3>
                <p className="csapat_szov">{item.csapat_bemutat_magyar}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 style={{ textAlign: "justify" }}>Képek a Csapatmunkájáról: </h3>
          <div className="mt-5 d-flex justify-content-center">
            <Carousel style={{ width: "60%" }}>
              {kepek.map((kep) => (
                <Carousel.Item key={kep.kep_azon}>
                  <img
                    className="d-block w-100"
                    src={"http://localhost:8000" + kep.kep}
                    alt={kep.leiras}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="mt-4">
            {csapat.map((item) => (
              <div key={item.cs_azon}>
                <h3 style={{ textAlign: "justify" }}>Csapatmunka bemutatása</h3>
                <p className="csapat_szov">{item.csapat_bemutat_magyar}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Csapatok() {
  const [selectedCsapat, setSelectedCsapat] = useState(null);
  const csapatAzon = (cs_azon) => {
    setSelectedCsapat(cs_azon);
  };
  return (
    <div className="summary-section">
      <div className="cont">
        {selectedCsapat ? (
          <AdottCsapat cs_azon={selectedCsapat} />
        ) : (
          <OsszCsapat onCsapatSelect={csapatAzon} />
        )}
      </div>
    </div>
  );
}
