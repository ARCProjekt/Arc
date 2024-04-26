import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/Kozos2.css";
import AdottCsapat from "./AdottCsapat";

export default function Csapatok() {
  const [selectedCsapat, setSelectedCsapat] = useState(null);
  const [csapatok, setCsapatok] = useState([]);
  const [showCsapat, setShowCsapat] = useState(true);
  const [kepek, setKepek] = useState([]);

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
        className="cont katsec"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        {showCsapat &&
          csapatok.map((csapat, index) => (
            <div
              key={index}
              className="half-circle-card"
              style={{ margin: "15px" }}
            >
               <img
            src={"http://localhost:8000/" + csapat.galeria_kepek}
            alt={`Csapat kép ${index}`}
        />

              <div className="content">
                <h3>{csapat.csapat_nev_magyar}</h3>
                <p>{csapat.csapat_bemutat_magyar}</p>
                <button
                  onClick={() => handleCsapatClick(csapat.cs_azon)}
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
  
          <AdottCsapat cs_azon={selectedCsapat} />
        </div>
      )}
    </div>
  );
}
