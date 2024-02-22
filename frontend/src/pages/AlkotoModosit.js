import { useState } from "react";
import "../css/Kozos.css";
const sampleData = [
  {
    id: 1,
    name: "Item 1",
    szak: "Description 1",
    bemutatkozás: "Description 1",
    kep: "Description 1",
  },
  {
    id: 2,
    name: "Item 2",
    szak: "Description 2",
    bemutatkozás: "Description 1",
    kep: "Description 1",
  },
  {
    id: 3,
    name: "Item 3",
    szak: "Description 3",
    bemutatkozás: "Description 1",
    kep: "Description 1",
  },
];
export default function AlkotoModosit() {
  const [editableRow, setEditableRow] = useState(null);
  const [data, setData] = useState(sampleData);

  const handleEditClick = (id) => {
    setEditableRow(id === editableRow ? null : id);
  };

  const handleInputChange = (e, id, key) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, [key]: e.target.value } : item
    );
    setData(newData);
  };
  return (
    <div className="summary-section">
      <div className="cont">
        <div
          className="feltoltes"
          style={{
            padding: "50px",
            display: "grid",
            gridTemplateRowstemplate: "1fr",
            borderBottom:"1px grey solid"
          }}
        >
          <h3>Új Alkotó</h3>
          <td>
            <label htmlFor="galeria_id">Szak ID:</label>
            <input
              style={{ maxWidth: "300px" }}
              type="text"
              name="szak_id"
              required
            />
            <br />
          </td>

          <td>
            <label htmlFor="magyar_nev">Magyar Név:</label>
            <input
              style={{ maxWidth: "300px" }}
              type="text"
              name="magyar_nev"
              required
            />
            <br />
          </td>

          <td>
            <label htmlFor="angol_nev">Angol Név:</label>
            <input
              style={{ maxWidth: "300px" }}
              type="text"
              name="angol_nev"
              required
            />
            <br />
          </td>

          <td>
            <label htmlFor="magyar_leiras">Magyar Bemutatkozás:</label>
            <textarea
              style={{ maxWidth: "300px" }}
              name="magyar_bemutat"
              required
            ></textarea>
            <br />
          </td>

          <td>
            <label htmlFor="angol_leiras">Angol Bemutatkozás:</label>
            <textarea
              style={{ maxWidth: "300px" }}
              name="angol_bemutat"
              required
            ></textarea>
            <br />
          </td>

          <td>
            <label htmlFor="alkotok">Válassz Képet:</label>
            <select name="kep_azon" style={{ maxWidth: "300px" }}>
              {/* Add options dynamically based on available images */}
            </select>
            <br />
          </td>

          <button
            type="submit"
            className=" text-center mt-3"
            style={{maxWidth:"200px"}}
          >
            Mentés
          </button>
        </div>
        <div className="tablazat ">
          <div>
            <h3>Alkotók</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Név</th>
                  <th>Szak</th>
                  <th>Bemutatkozás</th>
                  <th>Kép</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {editableRow === item.id ? (
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            handleInputChange(e, item.id, "name")
                          }
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td>
                      {editableRow === item.id ? (
                        <input
                          type="text"
                          value={item.szak}
                          onChange={(e) =>
                            handleInputChange(e, item.id, "szak")
                          }
                        />
                      ) : (
                        item.szak
                      )}
                    </td>
                    <td>
                      {editableRow === item.id ? (
                        <input
                          type="text"
                          value={item.bemutatkozás}
                          onChange={(e) =>
                            handleInputChange(e, item.id, "bemutatkozás")
                          }
                        />
                      ) : (
                        item.bemutatkozás
                      )}
                    </td>
                    <td>
                      {editableRow === item.id ? (
                        <input
                          type="text"
                          value={item.kep}
                          onChange={(e) => handleInputChange(e, item.id, "kep")}
                        />
                      ) : (
                        item.kep
                      )}
                    </td>
                    <td>
                      <button
                        style={{ background: "none", border: "none" }}
                        onClick={() => handleEditClick(item.id)}
                      >
                        {editableRow === item.id ? "✔️" : "🖌"}
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
}
