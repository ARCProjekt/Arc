import { useEffect, useState } from "react";
import "../css/Kozos.css";
import axios from "../api/axios";
const Kepletrehoz = () => {
  // const [ujToken2, setUjToken] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    kep: "",
    kep_leiras_magyar: "", // Módosítás: 'kep_leiras_magyar' hozzáadása
    kep_leiras_angol: "", // Módosítás: 'kep_leiras_angol' hozzáadása
    fotos_neve: "",
  });

  const handlekepChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setFormData({
      ...formData,
      kep: image,
    });
    setSelectedImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Először CSRF token lekérése
      const ujToken = await axios.get("token");
      const ujToken2 = ujToken.data;

      // Képfeltöltés kódja
      const formDataWithImage = new FormData();
      formDataWithImage.append("kep", formData.kep);
      formDataWithImage.append(
        "nyelv_id_leiras_magyar",
        formData.kep_leiras_magyar
      ); // Módosítás: Hozzáadva
      formDataWithImage.append(
        "nyelv_id_leiras_angol",
        formData.kep_leiras_angol
      ); // Módosítás: Hozzáadva
      formDataWithImage.append("fotos_neve", formData.fotos_neve);

      const response = await axios.post(
        "api/kepek/alkotoKepek",
        formDataWithImage,
        {
          headers: {
            "X-CSRF-TOKEN": ujToken2,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating kep:", error);
      console.log("Server response:", error.response.data);
    }
  };

  return (
    <div className="kepFeltoltes">
      <form onSubmit={handleSubmit}>
        <div
          className="kep"
          style={{
            display: "grid",
            gap: "10px",
            maxWidth: "400px",
            margin: "0 auto",
            textAlign: "center", // Középre igazítás
          }}
        >
          <h3>Kép Feltöltés:</h3>
          <div className="td" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="kep">Kép:</label>
            <input
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              type="file"
              id="kep"
              required
              accept="image/*" // Csak képfájlok elfogadása
              onChange={handleFileChange}
            />
          </div>
          {selectedImage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h4 style={{ marginRight: "10px" }}>Kiválasztott kép:</h4>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}
          <div className="td" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="kep_leiras_magyar">Magyar leírás:</label>
            <input
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              type="text"
              required
              name="kep_leiras_magyar"
              id="kep_leiras_magyar"
              onChange={handlekepChange}
            />
          </div>
          <div className="td" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="kep_leiras_angol">Angol leírás:</label>
            <input
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              type="text"
              required
              name="kep_leiras_angol"
              id="kep_leiras_angol"
              onChange={handlekepChange}
            />
          </div>
          <div className="td" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="fotos_neve">Fotós neve:</label>
            <input
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              type="text"
              id="fotos_neve"
              required
              name="fotos_neve"
              onChange={handlekepChange}
            />
          </div>
          <br />
          <button
            type="submit"
            className="text-center mt-3"
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Mentés
          </button>
        </div>
      </form>
    </div>
  );
};
const AlkotoLetrehoz = () => {
  const [ujToken2, setUjToken] = useState("");
  const [alkotok, setAlkotok] = useState([]);
  const [kepek, setKepek] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [szerkesztAlkoto, setszerkesztAlkoto] = useState({});
  const [csapatok, setCsapatok] = useState([]);
  const [szakok, setSzakok] = useState([]);
  const [formData, setFormData] = useState({
    szak_id: "",
    magyar_nev: "",
    angol_nev: "",
    magyar_bemutat: "",
    angol_bemutat: "",
    kep_azon: "",
    cs_azon: "",
    buszkesegeink: "",
  });
  //const imagePath = "alkotokepek/" + kep;

  //alkotok
  useEffect(() => {
    const getAlkotok = async () => {
      const apiAlkotok = await axios.get("api/alkotokkiir");
      setAlkotok(apiAlkotok.data.alkotok);
    };
    getAlkotok();
  }, []);
  //tokenek

  const csrf = async () => {
    try {
      const response = await axios.get("token");
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
      const apiCsapatok = await axios.get("api/csapatok");
      setCsapatok(apiCsapatok.data.csapatok);
      //console.log("Csapatok:", apiCsapatok.data.csapatok);
    };
    getCsapatok();
  }, []);
  //szakok
  useEffect(() => {
    const getSzakok = async () => {
      const apiSzakok = await axios.get("api/szakok");
      setSzakok(apiSzakok.data.szakok);
      //console.log("Szakok:", apiSzakok.data.szakok);
    };
    getSzakok();
  }, []);
  //kepek
  useEffect(() => {
    const getKepek = async () => {
      const apiKepek = await axios.get("api/kepek");
      setKepek(apiKepek.data);
      //console.log("Kepek:", apiKepek.data);
    };
    getKepek();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e, id, key) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    const newData = alkotok.map((item) =>
      item.a_azon === id
        ? { ...item, [key]: value }
        : item
    );
    setAlkotok(newData);
  
    if (id === editableRow) {
      // Frissítsük az állapotot egy funkció segítségével az aktuális érték alapján
      setszerkesztAlkoto(prevState => ({
        ...prevState,
        [key]: value,
      }));
    }
  };
  
  

  const handleEditClick = (id) => {
    console.log(id);
    setEditableRow((prevEditableRow) => (prevEditableRow === id ? null : id));
  };
  const torol = async (id) => {
    try {
      const url = `api/alkototorol/${id}`;
      const response = await axios.delete(url, {
        headers: {
          "X-CSRF-TOKEN": ujToken2,
        },
        withCredentials: true,
      });
      console.log("alkoto törölve: ", response.data);
      setAlkotok((prevAlkotok) =>
        prevAlkotok.filter((alkoto) => alkoto.id !== id)
      );
      window.location.reload();
    } catch (error) {
      console.error("Hiba történt a felhasználó törlésekor: ", error);
      console.log(error.response);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Először CSRF token lekérése
      const ujToken = await axios.get("token");
      const ujToken2 = ujToken.data;

      // Kérés elküldése a frissített fejléccel és az opciókkal
      const response = await axios.post(
        "api/alkotoletrehoz",
        { ...formData, buszkesegeink: isChecked ? "1" : "0" },
        {
          headers: {
            "X-CSRF-TOKEN": ujToken2,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating alkoto:", error);
      console.log("Server response:", error.response.data);
    }
  };

  const update = async (a_azon) => {
    const url = `api/alkotoszerkeszt/${a_azon}`;
    if (!szerkesztAlkoto) {
      console.error("Nincs szerkesztett alkotó.", a_azon.data);
      return;
    }
    try {
      const response = await axios.patch(
        url,
        {
          szak_id: szerkesztAlkoto.szak_id,
          magyar_nev: szerkesztAlkoto.magyar_nev,
          angol_nev: szerkesztAlkoto.angol_nev,
          magyar_bemutat: szerkesztAlkoto.magyar_bemutat,
          angol_bemutat: szerkesztAlkoto.angol_bemutat,
          kep: szerkesztAlkoto.kep_azon,
          cs_azon: szerkesztAlkoto.cs_azon,
          buszkesegeink: szerkesztAlkoto.buszkesegeink,
          isChecked: szerkesztAlkoto.isChecked, // Hozzáadva
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
      setIsChecked(szerkesztAlkoto.isChecked);
    } catch (error) {
      console.error("Hiba történt a alkotó frissítésekor: ", error);
      console.log(error.response);
    }
  };

  return (
    <div>
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
          <div className="td">
            <label htmlFor="buszkesegeink">Büszkeség:</label>
            <input
              type="radio"
              id="buszkesegeink-nem"
              name="buszkesegeink"
              value="0"
              checked={!isChecked}
              onChange={() => setIsChecked(false)}
            />
            <label htmlFor="buszkesegeink-nem">Nem</label>
            <input
              type="radio"
              id="buszkesegeink-igen"
              name="buszkesegeink"
              value="1"
              checked={isChecked}
              onChange={() => setIsChecked(true)}
            />
            <label htmlFor="buszkesegeink-igen">Igen</label>
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
        </form>
      </div>
      <div className="tablazat ">
        <div>
          <h3>Alkotók</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Név *</th>
                <th>Bemutatkozás *</th>
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
                            handleInputChange(e, item.a_azon, "magyar_nev")
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
                        <span className="text-danger">
                          *:Mindkét mezőt módosítani kell!!
                        </span>
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
                            handleInputChange(e, item.a_azon, "magyar_bemutat")
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
                        <span className="text-danger">
                          *:Mindkét mezőt módosítani kell!!
                        </span>
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
                        value={item.kep_azon}
                        onChange={(e) =>
                          handleInputChange(e, item.a_azon, "kep")
                        }
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
                        value={item.szak_id}
                        onChange={(e) =>
                          handleInputChange(e, item.a_azon, "szak_id")
                        }
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
                        value={item.cs_azon}
                        onChange={(e) =>
                          handleInputChange(e, item.a_azon, "cs_azon")
                        }
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
                      <>
                        <input
                          type="checkbox"
                          id={`buszkesegeink-nem-${item.a_azon}`}
                          name={`buszkesegeink_${item.a_azon}`}
                          value="0"
                          //checked={item.isChecked === "0"} // Ellenőrizzük, hogy a rádiógomb 0 értékű-e
                          onChange={(e) =>
                            handleInputChange(e, item.a_azon, "buszkesegeink")
                          }
                        />
                        <label htmlFor={`buszkesegeink-nem-${item.a_azon}`}>
                          Nem
                        </label>

                        <input
                          type="checkbox"
                          id={`buszkesegeink-igen-${item.a_azon}`}
                          name={`buszkesegeink_${item.a_azon}`}
                          value="1"
                          //checked={item.isChecked === "1"} // Ellenőrizzük, hogy a rádiógomb 1 értékű-e
                          onChange={(e) =>
                            handleInputChange(e, item.a_azon, "buszkesegeink")
                          }
                        />

                        <label htmlFor={`buszkesegeink-igen-${item.a_azon}`}>
                          Igen
                        </label>
                      </>
                    ) : item.buszkesegeink == "1" ? (
                      "Igen"
                    ) : (
                      "Nem"
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
                  <td>
                    <button
                      style={{ background: "none", border: "none" }}
                      onClick={() => torol(item.a_azon)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default function AlkotoModosit() {
  return (
    <div className="summary-section">
      <div className="cont">
        <Kepletrehoz />
        <AlkotoLetrehoz />
      </div>
    </div>
  );
}
