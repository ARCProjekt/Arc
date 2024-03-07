import React, { useState, useEffect } from "react";
import axios from "axios";

const Csapatletrehoz = () => {
  const [csapatok, setCsapatok] = useState([]);
  const [editableRow, setEditableRow] = useState(null);

  const handleEditClick = (cs_azon) => {
    setEditableRow((prevEditableRow) =>
      prevEditableRow === cs_azon ? null : cs_azon
    );
  };

  useEffect(() => {
    const fetchCsapatok = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/csapatok");
        setCsapatok(response.data.csapatok);
      } catch (error) {
        console.error("Error fetching csapatok:", error);
      }
    };

    fetchCsapatok();
  }, []);
  return (
    <div className="summary-section">
      <div className="cont">
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
                    <td>{item.galeria_id}</td>
                    <td>{item.k_id}</td>
                    <td>{item.nyelv_id_csapat_nev}</td>
                    <td>{item.nyelv_id_leiras}</td>
                    
                    <td>{item.csapat_nev_magyar}</td>
                    <td>{item.csapat_bemutat_magyar}</td>
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
