import { useEffect, useState } from "react";
import "../css/Kozos.css";
import axios from "axios";
export default function UjKep() {
  const [alkotok, setAlkotok] = useState([]);
  const [csapatok, setCsapatok] = useState([]);
  const [szakok, setSzakok] = useState([]);
  const [kepek, setKepek] = useState([]);
  const [kep, setKep] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [formData, setFormData] = useState({
    kep: "",
    nyelv_id_leiras_magyar: "",
    nyelv_id_leiras_angol: "",
    fotos_neve: "",
  });

  //kepek
  useEffect(() => {
    const getKepek = async () => {
      const apiKepek = await axios.get("http://localhost:8000/api/kepek");
      setKepek(apiKepek.data.kepek);
    };
    getKepek();

  }, []);
  let token = "";
  const csrf = () =>
    axios.get("http://localhost:8000/token").then((response) => {
      token = response.data;
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        "http://localhost:8000/api/alkotoKepek",
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
          <form onSubmit={handleSubmit}>
            <div className="td">
              <label onSubmit={handleSubmit} htmlFor="kep_azon">
                Tölts Képet:
              </label>
              <div>
                <label htmlFor="kep">Kép:</label>
                <input
                  style={{ maxWidth: "300px" }}
                  type="file"
                  id="kep"
                  name="kep"
                  //value={formData.kep_azon}
                  onChange={handleChange}
                />
                <label htmlFor="nyelv_id_leiras_magyar">Magyar leirás:</label>
                <textarea
                  style={{ maxWidth: "300px", marginBottom: "10px" }}
                  type="text"
                  id="nyelv_id_leiras_magyar"
                  name="nyelv_id_leiras_magyar"
                  value={formData.nyelv_id_leiras_magyar}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="nyelv_id_leiras_angol">Angol leirás:</label>
                <textarea
                  style={{ maxWidth: "300px", marginBottom: "10px" }}
                  type="text"
                  id="nyelv_id_leiras_angol"
                  name="nyelv_id_leiras_angol"
                  value={formData.nyelv_id_leiras_angol}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="fotos_neve">Fotós neve:</label>
                <textarea
                  style={{ maxWidth: "300px", marginBottom: "10px" }}
                  type="text"
                  id="fotos_neve"
                  name="fotos_neve"
                  value={formData.fotos_neve}
                  onChange={handleChange}
                ></textarea>
              </div>

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
      </div>
    </div>
  );
}
