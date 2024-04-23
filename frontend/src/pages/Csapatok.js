import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/Kozos2.css";
import AdottCsapat from "./AdottCsapat";

export default function Csapatok() {
  const [selectedCsapat, setSelectedCsapat] = useState(null);
  const [csapatok, setCsapatok] = useState([]);
  const [showCsapat, setShowCsapat] = useState(true);

  useEffect(() => {
    const getCsapatok = async () => {
      const apiCsapat = await axios.get("http://localhost:8000/api/csapatok");
      setCsapatok(apiCsapat.data.csapatok);
    };

    getCsapatok();
  }, []);

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
      <div
        className="cont"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        {showCsapat &&
          csapatok.map((item, index) => (
            <div
              key={index}
              className="half-circle-card"
              style={{ margin: "15px" }}
            >
              <img
                src={
                  "http://localhost:8000" + "/storage/alkotokepek/csapat.jpg"
                }
                alt="Csapatok"
              />
              <div className="content">
                <h3>{item.csapat_nev_magyar}</h3>
                <p>{item.csapat_bemutat_magyar}</p>
                <button
                  onClick={() => handleCsapatClick(item.cs_azon)}
                  style={{
                    fontSize: "1.2em",
                    marginBottom: "10px",
                    textAlign: "justify",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    background: "none",
                  }}
                >
                  A csapathoz
                </button>
              </div>
            </div>
          ))}
      </div>
      {selectedCsapat && (
        <div>
          <button
            onClick={handleBackButtonClick}
            style={{
              fontSize: "1.2em",
              marginBottom: "10px",
              textAlign: "justify",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              background: "none",
            }}
          >
            Vissza a csapatokhoz
          </button>
          <AdottCsapat cs_azon={selectedCsapat} />
        </div>
      )}
    </div>
  );
}
