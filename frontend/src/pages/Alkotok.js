import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/Kozos2.css";
import AdottAlkoto from "./AdottAlkoto";

export default function Alkoto() {
  const [selectedAlkoto, setSelectedAlkoto] = useState(null);
  const [alkotok, setAlkotok] = useState([]);
  const [showAlkoto, setShowAlkoto] = useState(true); // State to manage whether to show Buszkesegeink

  const handleAlkotoClick = (a_azon) => {
    setSelectedAlkoto(a_azon);
    setShowAlkoto(false);
  };

  const handleBackButtonClick = () => {
    setSelectedAlkoto(null);
    setShowAlkoto(true);
  };

  useEffect(() => {
    const getAlkotok = async () => {
      try {
        const apiAlkotok = await axios.get(
          "http://localhost:8000/api/alkotokkiir"
        );
        setAlkotok(apiAlkotok.data.alkotok);
      } catch (error) {
        console.error("Error fetching alkotok:", error);
      }
    };

    getAlkotok();
  }, []);

  return (
    <div className="summary-section">
      {showAlkoto && (
        <div className="cont" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {alkotok.map((item,index) => (
            <div key={index} className="half-circle-card" style={{ margin: "15px" }}>
              <img
                src={"http://localhost:8000/storage/alkotokepek/csapat.jpg"}
                alt="Alkotok"
              />
              <div className="content">
                <h3>{item.magyar_nev}</h3>
                <p>{item.magyar_bemutat}</p>
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
                  }}
                >
                  Alkotóhoz
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedAlkoto && (
        <div>
          <button onClick={handleBackButtonClick}>Back</button>
          <AdottAlkoto a_azon={selectedAlkoto} />
        </div>
      )}
    </div>
  );
}
