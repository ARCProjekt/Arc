import { useEffect, useState } from "react";
import "../css/Kozos2.css";
import axios from "../api/axios";
const Kepletrehoz = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    kep: "",
    kep_leiras_magyar: "",
    kep_leiras_angol: "",
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
      const ujToken = await axios.get("token");
      const ujToken2 = ujToken.data;

      const formDataWithImage = new FormData();
      formDataWithImage.append("kep", formData.kep);
      formDataWithImage.append(
        "nyelv_id_leiras_magyar",
        formData.kep_leiras_magyar
      );
      formDataWithImage.append(
        "nyelv_id_leiras_angol",
        formData.kep_leiras_angol
      );
      formDataWithImage.append("fotos_neve", formData.fotos_neve);
      formDataWithImage.append("kep_azon", formData.kep_azon);

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
    <div className="kepFeltoltes" style={{ textAlign: "center" }}>
      <h3 style={{ marginBottom: "20px" }}>Kép Feltöltés:</h3>
      <form onSubmit={handleSubmit}>
        <div
          className="kep"
          style={{
            display: "grid",
            gap: "10px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <label htmlFor="kep">Kép*:</label>
          <input
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            type="file"
            id="kep"
            required
            accept="image/*"
            onChange={handleFileChange}
          />

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
          <label htmlFor="kep_leiras_magyar">Magyar leírás*:</label>
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

          <label htmlFor="kep_leiras_angol">Angol leírás*:</label>
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

          <label htmlFor="fotos_neve">Fotós neve*:</label>
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

          <br />
          <label className="text-danger">*= Kötelező kitölteni!!!</label>
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
          <br />
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
      setUjToken(response.data);
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
    };
    getCsapatok();
  }, []);
  //szakok
  useEffect(() => {
    const getSzakok = async () => {
      const apiSzakok = await axios.get("api/szakok");
      setSzakok(apiSzakok.data.szakok);
    };
    getSzakok();
  }, []);
  //kepek
  useEffect(() => {
    const getKepek = async () => {
      const apiKepek = await axios.get("api/kepek");
      setKepek(apiKepek.data);
    };
    getKepek();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e, a_azon, key) => {
    const value = e.target.value;

    const index = alkotok.findIndex((item) => item.a_azon === a_azon);
    if (index !== -1) {
      const updatedAlkoto = { ...alkotok[index], [key]: value };
      const newData = [...alkotok];
      newData[index] = updatedAlkoto;
      console.log(newData[index]);
      setAlkotok(newData);

      if (a_azon === editableRow) {
        setszerkesztAlkoto((prevState) => ({
          ...prevState,
          [key]: value,
        }));
      }
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
      const ujToken = await axios.get("token");
      const ujToken2 = ujToken.data;

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
      window.location.reload();
      setEditableRow(null);
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
        style={{ textAlign: "center", alignItems: "center" }}
      >
        <h3 style={{ marginBottom: "20px" }}>Új Alkotó:</h3>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "10px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <label htmlFor="szak_id">Szak*:</label>

          <select
            readOnly
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
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

          <label htmlFor="magyar_nev">Magyar Név*:</label>
          <input
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            type="text"
            id="magyar_nev"
            name="magyar_nev"
            value={formData.magyar_nev}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="angol_nev">Angol Név*:</label>
          <input
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            type="text"
            id="angol_nev"
            name="angol_nev"
            value={formData.angol_nev}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="magyar_bemutat">Magyar Bemutatkozás*:</label>
          <textarea
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            type="text"
            id="magyar_bemutat"
            name="magyar_bemutat"
            value={formData.magyar_bemutat}
            onChange={handleChange}
          ></textarea>
          <br />

          <label htmlFor="angol_bemutat">Angol Bemutatkozás*:</label>
          <textarea
            style={{
              padding: "8px",
              maxHeight: "150px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            type="text"
            id="angol_bemutat"
            name="angol_bemutat"
            value={formData.angol_bemutat}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="kep_azon">Kép*:</label>

          <select
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
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

          <label htmlFor="cs_azon">Csapat*:</label>

          <select
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            id="cs_azon"
            name="cs_azon"
            value={formData.cs_azon}
            onChange={handleChange}
          >
            <option>Válassz egy csapatot</option>
            {csapatok.map((team) => (
              <option key={team.cs_azon} value={team.cs_azon}>
                {team.csapat_nev_magyar}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="buszkesegeink">Büszkeség*:</label>
          <div style={{ alignItems: "center" }}>
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
          <label className="text-danger">*= Kötelező kitölteni!!</label>
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
          <br />
        </form>
      </div>

      <div className="tablazat" style={{ backgroundColor: "#edf9ff" }}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Név *</th>
                <th>Bemutatkozás *</th>
                <th>Kép</th>
                <th>Szak</th>
                <th>Csapat</th>
                <th>Büszkeség</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {alkotok.map((item) => (
                <tr key={item.a_azon} className="table-row">
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
                          handleInputChange(e, item.a_azon, "kep_azon")
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
                            {team.csapat_nev_magyar}
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
      <div className="cont katsec">
        <Kepletrehoz />
        <AlkotoLetrehoz />
      </div>
    </div>
  );
}
