import React, { useState, useEffect } from "react";
import { Carousel, Nav } from "react-bootstrap";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import "../css/Kozos2.css";

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
      console.log(apiCsapat.data.adottcsapatok);
      setCsapat(apiCsapat.data.adottcsapatok);
    };

    getCsapat();
  }, [cs_azon]); // cs_azon paraméter hozzáadása az useEffect függvény függőségi tömbjéhez

  useEffect(() => {
    const getAlkotok = async () => {
      const apiAlkotok = await axios.get(
        `http://localhost:8000/api/csapathozalkoto/${cs_azon}`
      );
      console.log(apiAlkotok.data.alkotok);
      setAlkotok(apiAlkotok.data.alkotok);
    };
    getAlkotok();
  }, [cs_azon]); // cs_azon paraméter hozzáadása az useEffect függvény függőségi tömbjéhez

  useEffect(() => {
    const getKepek = async () => {
      const apiKepek = await axios.get(
        `http://localhost:8000/api/galeriakepek/${cs_azon}`
      );
      console.log(apiKepek.data.kepek);
      setKepek(apiKepek.data.kepek);
    };
    getKepek();
  }, [cs_azon]); // cs_azon paraméter hozzáadása az useEffect függvény függőségi tömbjéhez

  return (
    <div className="summary-section">
      <div className="cont">
        {csapat.map((item,index) => (
          <div key={index}>
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
                to={`/alkoto`}
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
        {csapat.map((item) => (
          <div key={item.cs_azon}>
            <div className="mt-4">
              <h3 style={{ textAlign: "justify" }}>Csapatmunka bemutatása</h3>
              <p className="csapat_szov">{item.csapat_bemutat_magyar}</p>
            </div>
          </div>
        ))}
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

export default AdottCsapat;
