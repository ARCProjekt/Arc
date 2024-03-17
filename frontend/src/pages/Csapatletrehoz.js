import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

const GaleriaService = ({ onGaleriaCreated }) => {
  const [formData, setFormData] = useState({
    galeria_leiras: { magyar: "", angol: "" },
    kep_leiras: { magyar: "", angol: "" },
    kepek: [],
    fotos_neve: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      kepek: files,
    });
  };

  const addInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.name = "kepek[]";
    input.multiple = true;

    const br = document.createElement("br");

    document.getElementById("kepek").before(input, br);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "kepek") {
          formData.kepek.forEach((file) => {
            formDataToSubmit.append("kepek[]", file);
          });
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        "http://localhost:8000/api/galeria/store",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Galeria létrehozva:", response.data);

      const { galeria_id } = response.data;
      onGaleriaCreated(galeria_id);

    } catch (error) {
      console.error("Hiba történt a galéria létrehozása során:", error);
    }
  };

  return (
    <div className="summary-section">
      <div className="cont">
        <div className="feltoltes" style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "20px" }}>Galéria létrehozása</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: "grid", gap: "10px", maxWidth: "400px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="galeria_leiras_magyar">Galéria leírása (Magyar):</label>
              <input
                type="text"
                name="galeria_leiras[magyar]"
                id="galeria_leiras_magyar"
                onChange={handleChange}
                required
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <br />

            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="galeria_leiras_angol">Galéria leírása (Angol):</label>
              <input
                type="text"
                name="galeria_leiras[angol]"
                id="galeria_leiras_angol"
                onChange={handleChange}
                required
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <br />

            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="kep_leiras_magyar">Kép leírása (Magyar):</label>
              <input
                type="text"
                name="kep_leiras[magyar]"
                id="kep_leiras_magyar"
                onChange={handleChange}
                required
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <br />

            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="kep_leiras_angol">Kép leírása (Angol):</label>
              <input
                type="text"
                name="kep_leiras[angol]"
                id="kep_leiras_angol"
                onChange={handleChange}
                required
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <br />

            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="kepek">Képek:</label>
              <input
                type="file"
                name="kepek[]"
                id="kepek"
                multiple
                onChange={handleFileChange}
                required
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
              <button type="button" onClick={addInput} style={{ marginLeft: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
                További kép kiválasztása
              </button>
            </div>
            <br />

            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="fotos_neve">Fotós neve:</label>
              <input
                type="text"
                name="fotos_neve"
                id="fotos_neve"
                onChange={handleChange}
                required
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <br />

            <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Galéria létrehozása
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const CsapatLetrehoz = ({ galeriaId }) => {
  const { getUser } = useAuthContext();
  const [editableRow, setEditableRow] = useState(null);
  const [csapatok, setCsapatok] = useState([]);
  const [formData, setFormData] = useState({
    k_id: "",
    magyar_nev: "",
    angol_nev: "",
    magyar_leiras: "",
    angol_leiras: "",
  });
  const [ujToken2, setUjToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser();
        const response = await axios.get("http://localhost:8000/api/csapatok", {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": ujToken2 },
        });
        console.log("ujtoken2 useeffect", ujToken2);
        setCsapatok(response.data.csapatok);
      } catch (error) {
        console.error("Error fetching csapatok:", error);
      }
    };

    fetchData();
  }, [ujToken2]);

  useEffect(() => {
    csrf();
  }, []);

  const csrf = async () => {
    try {
      const response = await axios.get("http://localhost:8000/token");
      console.log("ujtoken2 csrf ", ujToken2);
      setUjToken(response.data); // itt frissul majd a token
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/csapat/store",
        { ...formData, galeria_id: galeriaId }, // Hozzáadjuk a galeria_id-t a formData-hoz
        {
          headers: {
            "X-CSRF-TOKEN": ujToken2,
          },
          withCredentials: true,
        }
      );

      console.log("Új csapat létrehozva: ", response.data);
      setCsapatok((prevCsapatok) =>
        [...prevCsapatok, response.data.csapat].filter(
          (csapat) => csapat && csapat.cs_azon
        )
      );
    } catch (error) {
      console.error("Hiba történt a csapat létrehozásakor: ", error);
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e, cs_azon, key) => {
    const newData = csapatok.map((item) =>
      item.cs_azon === cs_azon ? { ...item, [key]: e.target.value } : item
    );
    setCsapatok(newData);
  };

  const handleEditClick = (cs_azon) => {
    setEditableRow((prevEditableRow) =>
      prevEditableRow === cs_azon ? null : cs_azon
    );
  };

  return (
    <div className="summary-section">
      <div className="cont">
        <div className="feltoltes" style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "20px" }}>Új csapat</h3>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: "10px",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="galeria_id">Galeria ID:</label>
              <input
                type="text"
                id="galeria_id"
                name="galeria_id"
                value={galeriaId}
                readOnly
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f0f0f0",
                }}
              />
            </div>
  
            {/* További input mezők */}
            <label htmlFor="k_id">Kategória ID:</label>
            <input
              type="text"
              id="k_id"
              name="k_id"
              value={formData.k_id}
              onChange={handleChange}
              required
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
  
            <label htmlFor="magyar_nev">Magyar Név:</label>
            <input
              type="text"
              id="magyar_nev"
              name="magyar_nev"
              value={formData.magyar_nev}
              onChange={handleChange}
              required
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
  
            <label htmlFor="angol_nev">Angol Név:</label>
            <input
              type="text"
              id="angol_nev"
              name="angol_nev"
              value={formData.angol_nev}
              onChange={handleChange}
              required
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
  
            <label htmlFor="magyar_leiras">Magyar Leírás:</label>
            <input
              type="text"
              id="magyar_leiras"
              name="magyar_leiras"
              value={formData.magyar_leiras}
              onChange={handleChange}
              required
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
  
            <label htmlFor="angol_leiras">Angol Leírás:</label>
            <input
              type="text"
              id="angol_leiras"
              name="angol_leiras"
              value={formData.angol_leiras}
              onChange={handleChange}
              required
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
  
            <button
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Csapat létrehozása
            </button>
          </form>
        </div>
        <div className="tablazat" style={{ width: "48%" }}>
          <div>
            <h3>Csapatok</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Azonosító</th>
                  <th>Galeria ID</th>
                  <th>Kategória ID</th>
                  <th>Csapat Nev </th>
                  <th>Csapat Bemutat Magyar</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {csapatok.map((item) => (
                  <tr key={item.cs_azon}>
                    <td>{item.cs_azon}</td>
                    <td>{item.galeria_id}</td>
                    <td>
                      {editableRow === item.cs_azon ? (
                        <input
                          type="text"
                          value={item.k_id}
                          onChange={(e) =>
                            handleInputChange(e, item.cs_azon, "k_id")
                          }
                        />
                      ) : (
                        item.k_id
                      )}
                    </td>
                    <td>
                      {editableRow === item.cs_azon ? (
                        <input
                          type="text"
                          value={item.csapat_nev_magyar}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              item.cs_azon,
                              "csapat_nev_magyar"
                            )
                          }
                        />
                      ) : (
                        item.csapat_nev_magyar
                      )}
                    </td>
                    <td>
                      {editableRow === item.cs_azon ? (
                        <input
                          type="text"
                          value={item.csapat_bemutat_magyar}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              item.cs_azon,
                              "csapat_bemutat_magyar"
                            )
                          }
                        />
                      ) : (
                        item.csapat_bemutat_magyar
                      )}
                    </td>
                    <td>
                      <button
                        style={{ background: "none", border: "none" }}
                        onClick={() => handleEditClick(item.cs_azon)}
                      >
                        {editableRow === item.cs_azon ? "✔️" : "🖌"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const GaleriaEsCsapatLetrehoz = () => {
  const [galeriaId, setGaleriaId] = useState(null);

  const handleGaleriaCreated = (id) => {
    setGaleriaId(id);
  };

  return (
    <div>
      {!galeriaId ? (
        <GaleriaService onGaleriaCreated={handleGaleriaCreated} />
      ) : (
        <CsapatLetrehoz galeriaId={galeriaId} />
      )}
    </div>
  );
};

export default GaleriaEsCsapatLetrehoz;
