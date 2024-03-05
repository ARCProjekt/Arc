import { useEffect, useState } from "react";
import "../css/Kozos.css";
import axios from "axios";
export default function AlkotoModosit() {
  const [alkotok, setAlkotok] = useState([]);
  const [csapatok, setCsapatok] = useState([]);
  const [szakok, setSzakok] = useState([]);
  const [kep, setKep] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [formData, setFormData] = useState({
    szak_id: "",
    magyar_nev: "",
    angol_nev: "",
    magyar_bemutat: "",
    angol_bemutat: "",
    kep_azon: "",
    cs_azon: "",
  });

  useEffect(() => {
    const getAlkotok = async () => {
      const apiAlkotok = await axios.get(
        "http://localhost:8000/api/alkotokkiir"
      );
      setAlkotok(apiAlkotok.data.alkotok);
    };
    getAlkotok();
  }, []);
  let token = "";
  const csrf = () =>
    axios.get("http://localhost:8000/token").then((response) => {
      token = response.data;
    });
  useEffect(() => {
    const getCsapatok = async () => {
      const apiCsapatok = await axios.get("http://localhost:8000/api/csapatok");
      setCsapatok(apiCsapatok.data.csapatok);
    };
    getCsapatok();
  }, []);
  useEffect(() => {
    const getSzakok = async () => {
      const apiSzakok = await axios.get("http://localhost:8000/api/szakok");
      setSzakok(apiSzakok.data.szakok);
    };
    getSzakok();
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
      item.a_azon === id ? { ...item, [key]: e.target.value } : item
    );
    setAlkotok(newData);
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await csrf();
    setFormData({
      ...formData,
      _token: token,
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/alkotoletrehoz",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating alkoto:", error);
      console.log("Server response:", error.response.data);
    }
  };

  return (
    <div className="summary-section">
      <div className="cont">
        <div
          className="feltoltes"
          style={{
            padding: "50px",

            borderBottom: "1px grey solid",
          }}
        >
          <h3>Új Alkotó</h3>
          <form onSubmit={handleSubmit}>
            <div className="td">
              <label htmlFor="szak_id">Szak ID:</label>

              <select
                style={{ maxWidth: "300px" }}
                id="szak_id"
                name="szak_id"
                value={formData.szak_id}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Válassz egy szakot
                </option>
                {szakok.map((team) => (
                  <option key={team.szak_id} value={team.szak_id}>
                    {team.magyar}
                  </option>
                ))}
              </select>
              <br />
            </div>

            <div className="td">
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
            </div>

            <div className="td">
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
            </div>

            <div className="td">
              <label htmlFor="magyar_bemutat">Magyar Bemutatkozás:</label>
              <textarea
                style={{ maxWidth: "300px" }}
                type="text"
                id="magyar_bemutat"
                name="magyar_bemutat"
                value={formData.magyar_bemutat}
                onChange={handleChange}
              ></textarea>
              <br />
            </div>

            <div className="td">
              <label htmlFor="angol_bemutat">Angol Bemutatkozás:</label>
              <textarea
                style={{ maxWidth: "300px", marginBottom: "10px" }}
                type="text"
                id="angol_bemutat"
                name="angol_bemutat"
                value={formData.angol_bemutat}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="td">
              <label htmlFor="kep_azon">Tölts Képet:</label>
              <input
                style={{ maxWidth: "300px" }}
                type="file"
                id="kep_azon"
                name="kep_azon"
                //value={formData.kep_azon}
                onChange={(e)=>setKep(e.target.files[0])}
              />
              <br />
            </div>
            <div className="td">
              <label htmlFor="cs_azon">Csapat ID:</label>

              <select
                style={{ maxWidth: "300px" }}
                id="cs_azon"
                name="cs_azon"
                value={formData.cs_azon}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Válassz egy csapatot
                </option>
                {csapatok.map((team) => (
                  <option key={team.cs_azon} value={team.cs_azon}>
                    {team.magyar}
                  </option>
                ))}
              </select>
              <br />
            </div>

            <button
              type="submit"
              className=" text-center mt-3"
              style={{ maxWidth: "200px" }}
              //onClick={handleSubmit}
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
                  <th>Csapat</th>
                </tr>
              </thead>
              <tbody>
                {alkotok.map((item) => (
                  <tr key={item.a_azon}>
                    <td>{item.a_azon}</td>
                    <td>
                      {editableRow === item.a_azon ? (
                        <input
                          type="text"
                          value={item.alkoto_nev}
                          onChange={(e) =>
                            handleInputChange(e, item.a_azon, "alkoto_nev")
                          }
                        />
                      ) : (
                        item.alkoto_nev
                      )}
                    </td>
                    <td>
                      {editableRow === item.a_azon ? (
                        <input
                          type="text"
                          value={item.bemutato_nev}
                          onChange={(e) =>
                            handleInputChange(e, item.a_azon, "bemutato_nev")
                          }
                        />
                      ) : (
                        item.bemutato_nev
                      )}
                    </td>
                    <td>
                      {editableRow === item.a_azon ? (
                        <input
                          type="text"
                          value={item.kep}
                          onChange={(e) =>
                            handleInputChange(e, item.a_azon, "kep")
                          }
                        />
                      ) : (
                        item.kep
                      )}
                    </td>
                    <td>
                      {editableRow === item.a_azon ? (
                        <select
                          style={{ maxWidth: "300px" }}
                          id="szak_id"
                          name="szak_id"
                          value={formData.szak_id}
                          onChange={handleChange}
                        >
                          <option value="" disabled hidden>
                            Válassz egy szakot
                          </option>
                          {szakok.map((team) => (
                            <option key={team.szak_id} value={team.szak_id}>
                              {team.magyar}
                            </option>
                          ))}
                        </select>
                      ) : (
                        item.szak
                      )}
                    </td>
                    <td>
                      {editableRow === item.a_azon ? (
                        <select
                          style={{ maxWidth: "300px" }}
                          id="cs_azon"
                          name="cs_azon"
                          value={formData.cs_azon}
                          onChange={handleChange}
                        >
                          <option value="" disabled hidden>
                            Válassz egy csapatot
                          </option>
                          {csapatok.map((team) => (
                            <option key={team.cs_azon} value={team.cs_azon}>
                              {team.magyar}
                            </option>
                          ))}
                        </select>
                      ) : (
                        item.csapat
                      )}
                    </td>
                    <td>
                      <button
                        style={{ background: "none", border: "none" }}
                        onClick={() => handleEditClick(item.a_azon)}
                      >
                        {editableRow === item.a_azon ? "✔️" : "🖌"}
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
