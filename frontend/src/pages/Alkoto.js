import React from "react";
import { Link } from "react-router-dom";

export default function Alkoto() {
  return (
    <div className="summary-section ">
      <div className="cont">
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
            <div style={{ display: "flex", flex: "1" }} className="adatok">
              <div className="alk_div" style={{ marginRight: "20px", flex: "0 0 auto" }} > 
                <img
                  src={process.env.PUBLIC_URL+"/kepek/legolas.jpg"}
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
              <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                <div>
                  <h1 className="alkoto_nev" style={{ fontSize: "2em", marginBottom: "10px" }}>
                    Zöldlomb Legolas
                  </h1>
                  <p style={{ fontSize: "1.5em", marginBottom: "10px" }} className="projekt_nev">
                    Projekt neve: Újrahasznosított fólia-projekt
                  </p>
                  <p style={{ fontSize: "1.5em", marginBottom: "10px" }} className="csapat_n">
                    Csapat neve: XYZ Team
                  </p>
                </div>
                <Link to="/csapat">
                  <button
                    style={{
                      marginTop: "14%",
                      padding: "10px",
                      fontSize: "1.2em",
                      backgroundColor: "#3498db",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    className="alk_gomb"
                  >
                    Csapat oldalra
                  </button>
                </Link>
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

          <div className="infok"
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
              }}
            >
              <h2 style={{ fontSize: "1.5em", marginBottom: "10px" }}>Szak:</h2>
              <p style={{ fontSize: "1.2em", marginBottom: "10px" }}>
                Grafikus
              </p>
            </div>
            <div
              style={{
                textAlign: "center",
                background: " rgb(208, 245, 254)",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h2 style={{ fontSize: "1.5em", marginBottom: "10px" }}>
                Kategória:
              </h2>
              <p style={{ fontSize: "1.2em", marginBottom: "10px" }}>
                Újrahasznosítás
              </p>
            </div>
          </div>

          <div className="szoveg"
            style={{
              padding: "20px",
              width: "100%",
            }}
          >
            <h3 style={{ fontSize: "2em", marginBottom: "10px" }}>
              Bemutatkozás
            </h3>
            <p
              style={{
                textAlign: "justify",
                fontSize: "1.5em",
                lineHeight: "1.5",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              quam lacus, vulputate ac porta ac, vehicula pharetra enim.Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Fusce quam
              lacus, vulputate ac porta ac, vehicula pharetra enim.Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Fusce quam lacus,
              vulputate ac porta ac, vehicula pharetra enim.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Fusce quam lacus, vulputate
              ac porta ac, vehicula pharetra enim.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Fusce quam lacus, vulputate ac porta
              ac, vehicula pharetra enim.Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Fusce quam lacus, vulputate ac porta ac, vehicula
              pharetra enim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}