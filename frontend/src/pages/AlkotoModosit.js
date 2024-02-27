import { useEffect, useState } from "react";
import "../css/Kozos.css";
import axios from "axios";
export default function AlkotoModosit() {
  const [alkotok, setAlkotok] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  useEffect(() => {
    const getAlkotok = async () => {
      const apiAlkotok = await axios.get(
        "http://localhost:8000/api/alkotokkiir"
      );
      console.log(apiAlkotok.data.alkotok);
      setAlkotok(apiAlkotok.data.alkotok);
    };
    getAlkotok();
  }, []);
  const handleEditClick = (id) => {
    setEditableRow(id === editableRow ? null : id);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputChange = (e, id, key) => {
    const newData = alkotok.map((item) =>
      item.id === id ? { ...item, [key]: e.target.value } : item
    );
    setAlkotok(newData); // Update the state with the modified data
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post
         "http://localhost:8000/api/alkotoLetrehoz",
        formData 
        ();
      console.log(response.data);
      // Frissítheted az állapotot, vagy bármilyen más tevékenységet végezhetsz itt
    } catch (error) {
      console.error("Error creating user:", error);
    }

  };
  const [formData, setFormData] = useState({
    szak_id: "",
    magyar_nev: "",
    angol_nev:"",
    magyar_leiras: "",
    angol_leiras: "",
    kep: "",
  });
  return (
    <div className="summary-section">
      <div className="cont">
        <div
          className="feltoltes"
          style={{
            padding: "50px",
            display: "grid",
            gridTemplateRowstemplate: "1fr",
            borderBottom: "1px grey solid",
          }}
        >
          <h3>Új Alkotó</h3>
          <form onSubmit={handleSubmit}>
            <td>
              <label htmlFor="galeria_id">Szak ID:</label>
              <input
                style={{ maxWidth: "300px" }}
                type="text"
                id="szak_id"
                name="szak_id"
                value={formData.szak_id}
                onChange={handleChange}
              />
              <br />
            </td>

            <td>
              <label htmlFor="magyar_nev">Magyar Név:</label>
              <input
                style={{ maxWidth: "300px" }}
                type="text"
                id="magyar_nev"
                name="magyar_nev"
                value={formData.magyar_nev}
                onChange={handleChange}
              />
              <br />
            </td>

            <td>
              <label htmlFor="angol_nev">Angol Név:</label>
              <input
                style={{ maxWidth: "300px" }}
                type="text"
                id="angol_nev"
                name="angol_nev"
                value={formData.angol_nev}
                onChange={handleChange}
              />
              <br />
            </td>

            <td>
              <label htmlFor="magyar_leiras">Magyar Bemutatkozás:</label>
              <textarea
                style={{ maxWidth: "300px" }}
                type="text"
                id="magyar_leiras"
                name="magyar_leiras"
                value={formData.magyar_leiras}
                onChange={handleChange}
              ></textarea>
              <br />
            </td>

            <td>
              <label htmlFor="angol_leiras">Angol Bemutatkozás:</label>
              <textarea
                style={{ maxWidth: "300px" }}
                type="text"
                id="angol_leiras"
                name="angol_leiras"
                value={formData.angol_leiras}
                onChange={handleChange}
              ></textarea>
              <br />
            </td>

            <td>
              <label htmlFor="alkotok">Tölts Képet:</label>
              <input type="image" name="kepek" />
              <br />
            </td>

            <button
              type="submit"
              className=" text-center mt-3"
              style={{ maxWidth: "200px" }}
            >
              Mentés
            </button>
            <input type="hidden" name="_token" value="{{ csrf_token() }}" />
          </form>
        </div>
        <div className="tablazat ">
          <div>
            <h3>Alkotók</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Név</th>
                  <th>Bemutatkozás</th>
                  <th>Kép</th>
                  <th>Szak</th>
                </tr>
              </thead>
              <tbody>
                {alkotok.map((item) => (
                  <tr key={item.id}>
                    <td>{item.a_azon}</td>
                    <td>
                      {editableRow === item.id ? (
                        <input
                          type="text"
                          value={item.alkoto_nev}
                          onChange={(e) =>
                            handleInputChange(e, item.id, "alkoto_nev")
                          }
                        />
                      ) : (
                        item.alkoto_nev
                      )}
                    </td>
                    <td>
                      {editableRow === item.id ? (
                        <input
                          type="text"
                          value={item.bemutato_nev}
                          onChange={(e) =>
                            handleInputChange(e, item.id, "bemutato_nev")
                          }
                        />
                      ) : (
                        item.bemutato_nev
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
