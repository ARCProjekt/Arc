import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import "../css/Kozos2.css";
import AdottCsapat from "./AdottCsapat";
import { useLanguage } from "./NyelvSegedlet";

const AdottAlkoto = ({ a_azon, Vissza, szoveg ,showGomb}) => {
  const { selectedLanguage } = useLanguage();
  const [alkoto, setAlkoto] = useState([]);
  const [selectedCsapat, setSelectedCsapat] = useState(null);
  const [showCsapat, setShowCsapat] = useState(true);
  useEffect(() => {
    const getAlkoto = async () => {
      const apiAlkoto = await axios.get(
        `http://localhost:8000/api/adottalkoto/${a_azon}`
      );
      setAlkoto(apiAlkoto.data.adottalkoto);
    };

    getAlkoto();
  }, [a_azon]);

  const handleCsapatClick = (cs_azon) => {
    setSelectedCsapat(cs_azon);
    setShowCsapat(false);
  };

  const handleBackButtonClick = () => {
    setSelectedCsapat(null);
    setShowCsapat(true);
  };

  return (
    <div className="summary-section">
      {showCsapat && (
        <div className="cont katsec">
          <button onClick={Vissza} style={{margin:"10px",background:"none",borderRadius:"5px ",border:"1px solid grey",color:"aliceblue",fontSize:"25px"}}>{szoveg}</button>

          {alkoto.map((item, index) => (
            <div key={index} className="alkoto">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                    padding: "15px",
                    borderRadius: "10px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{ display: "flex", flex: "1" }}
                    className="adatok"
                  >
                    <div
                      className="alk_div"
                      style={{ marginRight: "20px", flex: "0 0 auto" }}
                    >
                      <img
                        src={"http://localhost:8000/" + item.kep}
                        alt="a kep alt-ja ha nem tolt be"
                        style={{
                          maxWidth: "200px",
                          height: "auto",
                          borderRadius: "10%",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        className="img-thumbnail alkoto_kep"
                      />
                    </div>
                    <div
                      style={{
                        flex: "1",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div>
                        <h1
                          className="alkoto_nev"
                          style={{ fontSize: "2em", marginBottom: "10px" }}
                        >
                          {selectedLanguage === "hu" ? item.nevHU : item.nevEN}
                        </h1>
                        <p
                          style={{
                            fontSize: "1.5em",
                            marginBottom: "10px",
                          }}
                          className="projekt_nev"
                        >
                          {selectedLanguage === "hu"
                            ? "Projekt neve: "
                            : "Name of the project: "}
                          {selectedLanguage === "hu"
                            ? item.kategoriaHU
                            : item.kategoriaEN}
                        </p>
                        <p
                          style={{ fontSize: "1.5em", marginBottom: "10px" }}
                          className="csapat_n"
                        >
                          {" "}
                          {selectedLanguage === "hu"
                            ? "Csapat neve:"
                            : "Name of the team: "}
                          {selectedLanguage === "hu"
                            ? item.csapatHU
                            : item.csapatEN}
                        </p>
                      </div>

                      {showGomb && (
                        <Link>
                          <button
                            onClick={() => handleCsapatClick(item.csapat_id)}
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
                              ? "Csapathoz"
                              : "To the team"}
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    borderBottom: "1px solid #ccc",
                    marginBottom: "20px",
                    paddingBottom: "20px",
                  }}
                />
                <div
                  className="infok"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "20px",
                    marginBottom: "20px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      background: " rgb(208, 245, 254)",
                      padding: "20px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(0deg, rgba(246, 231, 196, 0.38) 0%, rgba(240, 167, 174, 1) 100%)",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.5em",
                        marginBottom: "10px",
                        color: "black",
                      }}
                    >
                      {selectedLanguage === "hu" ? "Szak" : "Profession: "}
                    </h2>
                    <p
                      style={{
                        fontSize: "1.2em",
                        marginBottom: "10px",
                        color: "black",
                      }}
                    >
                      {selectedLanguage === "hu" ? item.szakHU : item.szakEN}
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      background: " rgb(208, 245, 254)",
                      padding: "20px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(0deg, rgba(246, 231, 196, 0.38) 0%, rgba(240, 167, 174, 1) 100%)",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.5em",
                        marginBottom: "10px",
                        color: "black",
                      }}
                    >
                      {selectedLanguage === "hu" ? "Kategória:" : "Category: "}
                    </h2>
                    <p
                      style={{
                        fontSize: "1.2em",
                        marginBottom: "10px",
                        color: "black",
                      }}
                    >
                      {selectedLanguage === "hu"
                        ? item.kategoriaHU
                        : item.kategoriaEN}
                    </p>
                  </div>
                </div>
                <div
                  className="szoveg"
                  style={{
                    padding: "20px",
                    width: "100%",
                  }}
                >
                  <h3 style={{ fontSize: "2em", marginBottom: "10px" }}>
                    {selectedLanguage === "hu"
                      ? "Bemutatkozás"
                      : "Introduction"}
                  </h3>
                  <p
                    style={{
                      textAlign: "justify",
                      fontSize: "1.5em",
                      lineHeight: "1.5",
                    }}
                  >
                    {selectedLanguage === "hu"
                      ? item.bemutatHU
                      : item.bemutatEN}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedCsapat && (
        <div>
          <AdottCsapat
            cs_azon={selectedCsapat}
            Vissza={handleBackButtonClick}
            szoveg={"Vissza az alkotóhoz"}
            angolSzoveg={"Back to the artist"}
            showGomb={false}
            showNevek={true}
          />
        </div>
      )}
    </div>
  );
};

export default AdottAlkoto;
