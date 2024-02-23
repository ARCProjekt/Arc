import { useEffect, useState } from "react";
import "../css/Kozos.css";
import axios from "axios";

export default function Felhasznalo() {
  const [data, setData] = useState();
  const [editableRow, setEditableRow] = useState(null);
  const [felhasznalok, setFelhasznalok] = useState([]);
  useEffect(() => {
    const getFelhasznalok = async () => {
      const apiFelhasznalok = await axios.get(
        "http://localhost:8000/api/users"
      );
      console.log(apiFelhasznalok.data);
      setFelhasznalok(apiFelhasznalok.data);
    };
    getFelhasznalok();
  }, []);

  const handleEditClick = (id) => {
    setEditableRow(id === editableRow ? null : id);
  };

  const handleInputChange = (e, id, key) => {
    const newData = felhasznalok.map((item) =>
      item.id === id ? { ...item, [key]: e.target.value } : item
    );
    setFelhasznalok(newData);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    jog: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/userLetrehoz",
        formData
      );
      console.log(response.data);
      // Frissítheted az állapotot, vagy bármilyen más tevékenységet végezhetsz itt
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="summary-section">
      <div className="cont">
        <div className="feltoltes">
            <h3>Új user</h3>
            <form onSubmit={handleSubmit}>
      <label htmlFor="name">Név:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Jelszó:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <label htmlFor="jog">Jogosultság:</label>
      <select id="jog" name="jog" value={formData.jog} onChange={handleChange}>
        <option value="tanar">Tanár</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Felhasználó létrehozása</button>
      <input type="hidden" name="_token" value="{{ csrf_token() }}" />
    </form>
            </div>
        <div className="tablazat ">
          <div>
            <h3>Userek</h3>
            <table>
              <tbody>
                {felhasznalok.map((item) => (
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
                          value={item.email}
                          onChange={(e) =>
                            handleInputChange(e, item.id, "email")
                          }
                        />
                      ) : (
                        item.email
                      )}
                    </td>
                    <td>
                      {editableRow === item.id ? (
                        <input
                          type="text"
                          value={item.password}
                          onChange={(e) =>
                            handleInputChange(e, item.id, "password")
                          }
                        />
                      ) : (
                        item.password
                      )}
                    </td>
                    <td>
                      {editableRow === item.id ? (
                        <input
                          type="number"
                          value={item.jog}
                          onChange={(e) => handleInputChange(e, item.id, "jog")}
                        />
                      ) : (
                        item.jog
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
