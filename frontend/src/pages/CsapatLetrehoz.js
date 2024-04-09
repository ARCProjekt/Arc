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
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            style={{
              display: "grid",
              gap: "10px",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="galeria_leiras_magyar">
                Galéria leírása (Magyar):
              </label>
              <input
                type="text"
                name="galeria_leiras[magyar]"
                id="galeria_leiras_magyar"
                onChange={handleChange}
                required
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <br />

            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="galeria_leiras_angol">
                Galéria leírása (Angol):
              </label>
              <input
                type="text"
                name="galeria_leiras[angol]"
                id="galeria_leiras_angol"
                onChange={handleChange}
                required
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
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
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
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
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
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
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="button"
                onClick={addInput}
                style={{
                  marginLeft: "10px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
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
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <br />

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
              Galéria létrehozása
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};





const CsapatLetrehoz = ({ galeriaId }) => {
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
                const response = await axios.get("http://localhost:8000/api/csapatok", {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": ujToken2 },
                });
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
            setUjToken(response.data);
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/api/csapat/store",
                { ...formData, galeria_id: galeriaId },
                {
                    headers: {
                        "X-CSRF-TOKEN": ujToken2,
                    },
                    withCredentials: true,
                }
            );

            console.log("Új csapat létrehozva: ", response.data);
            window.location.reload();
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
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditClick = (cs_azon) => {
        setEditableRow(cs_azon);
        const editingCsapat = csapatok.find(csapat => csapat.cs_azon === cs_azon);
        setFormData({
            k_id: editingCsapat.k_id,
            magyar_nev: editingCsapat.csapat_nev_magyar,
            angol_nev: editingCsapat.csapat_nev_angol,
            magyar_leiras: editingCsapat.csapat_bemutat_magyar,
            angol_leiras: editingCsapat.csapat_bemutat_angol,
        });
    };

    const handleCancelEdit = () => {
        setEditableRow(null);
        setFormData({
            k_id: "",
            magyar_nev: "",
            angol_nev: "",
            magyar_leiras: "",
            angol_leiras: "",
        });
    };

    const updateCsapat = async (cs_azon) => {
        const url = `http://localhost:8000/api/csapatmodosit/${cs_azon}`;

        try {
            const response = await axios.patch(
                url,
                {
                    magyar_nev: formData.magyar_nev,
                    angol_nev: formData.angol_nev,
                    magyar_leiras: formData.magyar_leiras,
                    angol_leiras: formData.angol_leiras,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": ujToken2,
                    },
                    withCredentials: true,
                }
            );

            console.log("Csapat frissítve:", response.data);
            window.location.reload();
            setEditableRow(null);
        } catch (error) {
            console.error("Hiba történt a csapat frissítésekor:", error);
        }
    };

    const handleDelete = async (cs_azon) => {
        try {
            await axios.delete(`http://localhost:8000/api/csapatok/${cs_azon}`, {
                headers: {
                    "X-CSRF-TOKEN": ujToken2,
                },
                withCredentials: true,
            });
            setCsapatok((prevCsapatok) =>
                prevCsapatok.filter((csapat) => csapat.cs_azon !== cs_azon)
            );
        } catch (error) {
            console.error("Hiba történt a csapat törlésekor:", error);
        }
    };

    const renderCsapatRow = (csapat) => {
        if (editableRow === csapat.cs_azon) {
            return (
                <tr key={csapat.cs_azon}>
                    <td>{csapat.cs_azon}</td>
                    <td>{csapat.galeria_id}</td>
                    <td>
                        <input
                            type="text"
                            value={formData.k_id}
                            onChange={(e) =>
                                setFormData({ ...formData, k_id: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={formData.magyar_nev}
                            onChange={(e) =>
                                setFormData({ ...formData, magyar_nev: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={formData.angol_nev}
                            onChange={(e) =>
                                setFormData({ ...formData, angol_nev: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={formData.magyar_leiras}
                            onChange={(e) =>
                                setFormData({ ...formData, magyar_leiras: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={formData.angol_leiras}
                            onChange={(e) =>
                                setFormData({ ...formData, angol_leiras: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <button onClick={() => updateCsapat(csapat.cs_azon)}>Mentés</button>
                        <button onClick={handleCancelEdit}>Mégse</button>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr key={csapat.cs_azon}>
                    <td>{csapat.cs_azon}</td>
                    <td>{csapat.galeria_id}</td>
                    <td>{csapat.k_id}</td>
                    <td>{csapat.csapat_nev_magyar}</td>
                    <td>{csapat.csapat_nev_angol}</td>
                    <td>{csapat.csapat_bemutat_magyar}</td>
                    <td>{csapat.csapat_bemutat_angol}</td>
                    <td>
                        <button onClick={() => handleEditClick(csapat.cs_azon)}>Szerkesztés</button>
                        <button onClick={() => handleDelete(csapat.cs_azon)}>Törlés</button>
                    </td>
                </tr>
            );
        }
    };

    return (
        <div>
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
            <div className="tablazat" style={{ width: "100%", overflowX: "auto" }}>
                <div>
                    <h3>Csapatok</h3>
                    <table className="table" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Azonosító</th>
                                <th>Galeria ID</th>
                                <th>Kategória ID</th>
                                <th>Magyar Név</th>
                                <th>Angol Név</th>
                                <th>Magyar Leírás</th>
                                <th>Angol Leírás</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {csapatok.map(renderCsapatRow)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};



const GaleriaEsCsapatLetrehoz = () => {
  const [galeriaId, setGaleriaId] = useState(null);
  const [showGaleriaService, setShowGaleriaService] = useState(false);

  const handleGaleriaCreated = (id) => {
    setGaleriaId(id);
  };

  const handleButtonClick = () => {
    setShowGaleriaService(true);
  };

  return (
    <div className="summary-section">
      <div className="cont">
        <button onClick={handleButtonClick}>Hozzon létre új Galériát!</button>
        {showGaleriaService && (
          <GaleriaService onGaleriaCreated={handleGaleriaCreated} />
        )}
        <CsapatLetrehoz
          galeriaId={galeriaId}
          onGaleriaCreated={handleGaleriaCreated}
        />
      </div>
    </div>
  );
};

export default GaleriaEsCsapatLetrehoz;