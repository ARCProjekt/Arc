import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/Kozos.css";
export default function Csapatok() {
    const [csapatok, setCsapatok] = useState([]);
    useEffect(() => {
        const getCsapatok = async () => {
            const apiCsapat = await axios.get(
                "http://localhost:8000/api/csapatok"
            );
            console.log(apiCsapat.data.csapatok);
            setCsapatok(apiCsapat.data.csapatok);
        };
        getCsapatok();
    }, []);

    return (
        <div className="summary-section" >
            <div className="cont" >
                {csapatok.map((item) => (
                    <div key={item.cs_azon} className="half-circle-card">
                        <img src={'http://localhost:8000' + '/storage/alkotokepek/papirallo.png'} />
                        <div className="content">
                            <h3>{item.csapat_nev_magyar}</h3>
                            <p>{item.csapat_bemutat_magyar}</p>
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
                ))}
            </div>

        </div>
    );
}