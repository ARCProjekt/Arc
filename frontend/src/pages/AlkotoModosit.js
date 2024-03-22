import { useEffect, useState } from "react";
import "../css/Kozos.css";
import axios from "axios";
export default function AlkotoModosit() {
  const [alkotok, setAlkotok] = useState([]);
  const [csapatok, setCsapatok] = useState([]);
  const [szakok, setSzakok] = useState([]);
  const [kepek, setKepek] = useState([]);
  const [kep, setKep] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [szerkesztAlkoto, setszerkesztAlkoto] = useState(null);
  const [formData, setFormData] = useState({
    szak_id: "",
    magyar_nev: "",
    angol_nev: "",
    magyar_bemutat: "",
    angol_bemutat: "",
    kep_azon: "",
    cs_azon: "",
    buszkesegeink:""
  });
  //const imagePath = "alkotokepek/" + kep;
  const [formKep, setFormKep] = useState({
    kep: "",
    nyelv_id_leiras_magyar: "",
    nyelv_id_leiras_angol: "",
    fotos_neve: "",
  });
  //alkotok
  useEffect(() => {
    const getAlkotok = async () => {
      const apiAlkotok = await axios.get(
        "http://localhost:8000/api/alkotokkiir"
      );
      setAlkotok(apiAlkotok.data.alkotok);
    };
    getAlkotok();
  }, []);
  //tokenek
  const [ujToken2, setUjToken] = useState("");

  const csrf = async () => {
    try {
      const response = await axios.get("http://localhost:8000/token");
      console.log("ujtoken2 csrf ", ujToken2);
      setUjToken(response.data); //itt frissul majd a token
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };
  useEffect(() => {
    csrf();
  }, []);
  //csapatok
  useEffect(() => {
    const getCsapatok = async () => {
      const apiCsapatok = await axios.get("http://localhost:8000/api/csapatok");
      setCsapatok(apiCsapatok.data.csapatok);
      //console.log("Csapatok:", apiCsapatok.data.csapatok);
    };
    getCsapatok();
  }, []);
  //szakok
  useEffect(() => {
    const getSzakok = async () => {
      const apiSzakok = await axios.get("http://localhost:8000/api/szakok");
      setSzakok(apiSzakok.data.szakok);
      //console.log("Szakok:", apiSzakok.data.szakok);
    };
    getSzakok();
  }, []);
  //kepek
  useEffect(() => {
    const getKepek = async () => {
      const apiKepek = await axios.get("http://localhost:8000/api/kepek");
      setKepek(apiKepek.data);
      //console.log("Kepek:", apiKepek.data);
    };
    getKepek();
  }, []);
  const handleEditClick = (id) => {
    console.log(id);
    setEditableRow((prevEditableRow) => (prevEditableRow === id ? null : id));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormKep({
      ...formKep,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e, id, key) => {
    const newData = alkotok.map((item) =>
      item.a_azon === id ? { ...item, [key]: e.target.value } : item
    );
    setAlkotok(newData);
  
    if (id === editableRow) {
      setszerkesztAlkoto({
        ...szerkesztAlkoto,
        [key]: e.target.value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Először CSRF token lekérése
      const ujToken = await axios.get("http://localhost:8000/token");
      const ujToken2 = ujToken.data;

      // Kérés elküldése a frissített fejléccel és az opciókkal
      const response = await axios.post(
        "http://localhost:8000/api/alkotoletrehoz",
        { ...formData },
        {
          headers: {
            "X-CSRF-TOKEN": ujToken2,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating alkoto:", error);
      console.log("Server response:", error.response.data);
    }
  };

  const ujKep = async (e) => {
    e.preventDefault();

    try {
      // Először CSRF token lekérése
      const ujToken = await axios.get("http://localhost:8000/token");
      const ujToken2 = ujToken.data;

      // Kérés elküldése a frissített fejléccel és az opciókkal
      const response = await axios.post(
        "http://localhost:8000/api/kepek/alkotoKepek",
        { ...formKep },
        {
          headers: {
            "X-CSRF-TOKEN": ujToken2,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating kep:", error);
      console.log("Server response:", error.response.data);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const image = event.target.files[0]; // Az első kiválasztott fájl lesz az új kép
    const imageName = "/alkotokepek/" + image.name; // Elérési útvonal előtaggal

    setFormKep({ ...formKep, kep: imageName }); // Az elérési útvonal beállítása a formKep objektumban
    setSelectedImage(image);
  };

  const update = async (a_azon) => {
    if (!szerkesztAlkoto) {
      console.error("Nincs szerkesztett felhasználó.");
      return;
    }
    const url = `http://localhost:8000/api/alkotoszerkeszt/${a_azon}`;
    try {
      const response = await axios.patch(
        url,
        {
          szak_id: szerkesztAlkoto.szak_id,
          magyar_nev: szerkesztAlkoto.magyar_nev,
          angol_nev: szerkesztAlkoto.angol_nev,
          magyar_bemutat: szerkesztAlkoto.magyar_bemutat,
          angol_bemutat: szerkesztAlkoto.angol_bemutat,
          kep_azon: szerkesztAlkoto.kep_azon,
          cs_azon: szerkesztAlkoto.cs_azon,
          buszkesegeink: szerkesztAlkoto.buszkesegeink,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": ujToken2,
          },
          withCredentials: true,
        }
      );
      console.log("Alkoto frissítve: ", response.data);
      setEditableRow(null);
      setszerkesztAlkoto(null);
    } catch (error) {
      console.error("Hiba történt a alkotó frissítésekor: ", error);
      console.log(error.response);
    }
  };

  return (
    <div className="summary-section">
      <div className="cont">
        <div className="kepFeltoltes">
          <form onSubmit={ujKep}>
            <div className="kep">
              <h3>Kép Feltöltés:</h3>
              <div className="td">
                <label htmlFor="kep">Kép:</label>
                <input
                  type="file"
                  id="kep"
                  accept="image/*" // Csak képfájlok elfogadása
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <div>
                    <h4>Kiválasztott kép:</h4>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      style={{ maxWidth: "200px" }}
                    />
                  </div>
                )}
              </div>
              <div className="td">
                <label htmlFor="nyelv_id_leiras_magyar">Magyar leirás:</label>
                <input
                  style={{ maxWidth: "300px", marginBottom: "10px" }}
                  type="text"
                  id="nyelv_id_leiras_magyar"
                  name="nyelv_id_leiras_magyar"
                  value={formKep.nyelv_id_leiras_magyar}
                  onChange={handleChange}
                />
              </div>
              <div className="td">
                <label htmlFor="nyelv_id_leiras_angol">Angol leirás:</label>
                <input
                  style={{ maxWidth: "300px", marginBottom: "10px" }}
                  type="text"
                  id="nyelv_id_leiras_angol"
                  name="nyelv_id_leiras_angol"
                  value={formKep.nyelv_id_leiras_angol}
                  onChange={handleChange}
                />
              </div>
              <div className="td">
                <label htmlFor="fotos_neve">Fotós neve:</label>
                <input
                  style={{ maxWidth: "300px" }}
                  type="text"
                  id="fotos_neve"
                  name="fotos_neve"
                  value={formKep.fotos_neve}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button
                type="submit"
                className="text-center mt-3"
                style={{ maxWidth: "200px" }}
              >
                Mentés
              </button>
              <input type="hidden" name="_token" value="{{ csrf_token() }}" />
            </div>
          </form>
        </div>

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
                <option>Válassz egy szakot</option>
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

            <div>
              <label htmlFor="kep_azon">Tölts Képet:</label>

              <select
                style={{ maxWidth: "300px" }}
                id="kep_azon"
                name="kep_azon"
                value={formData.kep_azon}
                onChange={handleChange}
              >
                <option>Válassz egy képet</option>
                {kepek.map((team) => (
                  <option key={team.kep_azon} value={team.kep_azon}>
                    {team.kep}
                  </option>
                ))}
              </select>
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
                <option>Válassz egy csapatot</option>
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
                  <th>Büszkeség</th>
                </tr>
              </thead>
              <tbody>
                {alkotok.map((item) => (
                  <tr key={item.a_azon}>
                    <td>{item.a_azon}</td>
                    <td>
                      {editableRow === item.a_azon ? (
                        <>
                          <input
                          placeholder="Magyar Név"
                            type="text"
                            value={item.magyar_nev}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                item.a_azon,
                                "magyar_nev"
                              )
                            }
                          />
                          <input
                          placeholder="Angol Név"
                            type="text"
                            value={item.angol_nev}
                            onChange={(e) =>
                              handleInputChange(e, item.a_azon, "angol_nev")
                            }
                          />
                        </>
                      ) : (
                        item.magyar_nev
                      )}
                    </td>

                    <td>
                      {editableRow === item.a_azon ? (
                        <>
                          <input
                            placeholder="Magyar bemutatkozás"
                            type="text"
                            value={item.magyar_bemutat}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                item.a_azon,
                                "magyar_bemutat"
                              )
                            }
                          />
                          <input
                            placeholder="Angol bemutatkozás"
                            type="text"
                            value={item.angol_bemutat}
                            onChange={(e) =>
                              handleInputChange(e, item.a_azon, "angol_bemutat")
                            }
                          />
                        </>
                      ) : (
                        item.magyar_bemutat
                      )}
                    </td>

                    <td>
                      {editableRow === item.a_azon ? (
                        <select
                          style={{ maxWidth: "300px" }}
                          id="kep_azon"
                          name="kep_azon"
                          value={formData.kep_azon}
                          onChange={handleChange}
                        >
                          <option>Válassz egy képet</option>
                          {kepek.map((team) => (
                            <option key={team.kep_azon} value={team.kep_azon}>
                              {team.kep}
                            </option>
                          ))}
                        </select>
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
                          <option>Válassz egy szakot</option>
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
                          <option>Válassz egy csapatot</option>
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
                      {editableRow === item.a_azon ? (
                        <input
                          type="number"
                          value={item.buszkesegeink}
                          onChange={(e) =>
                            handleInputChange(e, item.a_azon, "büszkeségeink")
                          }
                        />
                      ) : (
                        item.buszkesegeink
                      )}
                    </td>
                    <td>
                      <button
                        style={{ background: "none", border: "none" }}
                        onClick={() =>
                          editableRow === item.a_azon
                            ? update(item.a_azon)
                            : handleEditClick(item.a_azon)
                        }
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
