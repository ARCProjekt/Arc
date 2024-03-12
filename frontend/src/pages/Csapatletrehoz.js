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
    <div className="summary-section">
      <div className="cont">
        <div className="feltoltes">
          <h3>Új csapat</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="galeria_id">Galeria ID:</label>
            <input
              type="text"
              id="galeria_id"
              name="galeria_id"
              value={formData.galeria_id}
              onChange={handleChange}
              required
            />

            <label htmlFor="k_id">Kategória ID:</label>
            <input
              type="text"
              id="k_id"
              name="k_id"
              value={formData.k_id}
              onChange={handleChange}
              required
            />

            <label htmlFor="magyar_nev">Magyar Név:</label>
            <input
              type="text"
              id="magyar_nev"
              name="magyar_nev"
              value={formData.magyar_nev}
              onChange={handleChange}
              required
            />

            <label htmlFor="angol_nev">Angol Név:</label>
            <input
              type="text"
              id="angol_nev"
              name="angol_nev"
              value={formData.angol_nev}
              onChange={handleChange}
              required
            />

            <label htmlFor="magyar_leiras">Magyar Leírás:</label>
            <input
              type="text"
              id="magyar_leiras"
              name="magyar_leiras"
              value={formData.magyar_leiras}
              onChange={handleChange}
              required
            />

            <label htmlFor="angol_leiras">Angol Leírás:</label>
            <input
              type="text"
              id="angol_leiras"
              name="angol_leiras"
              value={formData.angol_leiras}
              onChange={handleChange}
              required
            />

            <button type="submit">Csapat létrehozása</button>
          </form>
        </div>
        <div className="tablazat">
          <div>
            <h3>Csapatok</h3>
            <table>
              <thead>
                <tr>
                  <th>Cs_azon</th>
                  <th>Galeria ID</th>
                  <th>K ID</th>
                  <th>Nyelv ID Csapat Nev</th>
                  <th>Nyelv ID Leiras</th>
                  <th>Csapat Nev Magyar</th>
                  <th>Csapat Bemutat Magyar</th>
                  {/* További fejlécek itt */}
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
                          value={item.nyelv_id_csapat_nev}
                          onChange={(e) =>
                            handleInputChange(e, item.cs_azon, "nyelv_id_csapat_nev")
                          }
                        />
                      ) : (
                        item.nyelv_id_csapat_nev
                      )}
                    </td>
                    <td>
                      {editableRow === item.cs_azon ? (
                        <input
                          type="text"
                          value={item.nyelv_id_leiras}
                          onChange={(e) =>
                            handleInputChange(e, item.cs_azon, "nyelv_id_leiras")
                          }
                        />
                      ) : (
                        item.nyelv_id_leiras
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
                    {/* További mezők itt */}
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
