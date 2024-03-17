import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "../contexts/AuthContext";

const Csapatletrehoz = () => {
  const { getUser } = useAuthContext();
  const [editableRow, setEditableRow] = useState(null);
  const [csapatok, setCsapatok] = useState([]);
  const [formData, setFormData] = useState({
    galeria_id: "",
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
        { ...formData },
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
    <div className="summary-section" >
      <div className="cont" >
      <div className="feltoltes" style={{textAlign: "center"}}>
  <h3 style={{marginBottom: "20px"}}>Új csapat</h3>
  <form onSubmit={handleSubmit} style={{display: "grid", gap: "10px", maxWidth: "400px", margin: "0 auto"}}>
    <label htmlFor="galeria_id">Galeria ID:</label>
    <input
      type="text"
      id="galeria_id"
      name="galeria_id"
      value={formData.galeria_id}
      onChange={handleChange}
      required
      style={{padding: "8px", borderRadius: "4px", border: "1px solid #ccc"}}
    />

    <label htmlFor="k_id">Kategória ID:</label>
    <input
      type="text"
      id="k_id"
      name="k_id"
      value={formData.k_id}
      onChange={handleChange}
      required
      style={{padding: "8px", borderRadius: "4px", border: "1px solid #ccc"}}
    />

    <label htmlFor="magyar_nev">Magyar Név:</label>
    <input
      type="text"
      id="magyar_nev"
      name="magyar_nev"
      value={formData.magyar_nev}
      onChange={handleChange}
      required
      style={{padding: "8px", borderRadius: "4px", border: "1px solid #ccc"}}
    />

    <label htmlFor="angol_nev">Angol Név:</label>
    <input
      type="text"
      id="angol_nev"
      name="angol_nev"
      value={formData.angol_nev}
      onChange={handleChange}
      required
      style={{padding: "8px", borderRadius: "4px", border: "1px solid #ccc"}}
    />

    <label htmlFor="magyar_leiras">Magyar Leírás:</label>
    <input
      type="text"
      id="magyar_leiras"
      name="magyar_leiras"
      value={formData.magyar_leiras}
      onChange={handleChange}
      required
      style={{padding: "8px", borderRadius: "4px", border: "1px solid #ccc"}}
    />

    <label htmlFor="angol_leiras">Angol Leírás:</label>
    <input
      type="text"
      id="angol_leiras"
      name="angol_leiras"
      value={formData.angol_leiras}
      onChange={handleChange}
      required
      style={{padding: "8px", borderRadius: "4px", border: "1px solid #ccc"}}
    />

    <button type="submit" style={{padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer"}}>Csapat létrehozása</button>
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
                    <td>
                      {editableRow === item.cs_azon ? (
                        <input
                          type="text"
                          value={item.galeria_id}
                          onChange={(e) =>
                            handleInputChange(e, item.cs_azon, "galeria_id")
                          }
                        />
                      ) : (
                        item.galeria_id
                      )}
                    </td>
  
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
                            handleInputChange(e, item.cs_azon, "csapat_nev_magyar")
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
                            handleInputChange(e, item.cs_azon, "csapat_bemutat_magyar")
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

export default Csapatletrehoz;
