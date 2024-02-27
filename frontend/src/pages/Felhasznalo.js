import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "../contexts/AuthContext";

const Felhasznalo = () => {
  const { user, getUser } = useAuthContext();
  useEffect(() => {
    if (!user) {
      getUser();
      // Felhasználók lekérése és állapot frissítése
      /* axios.get("http://localhost:8000/api/users").then((response) => {
        setFelhasznalok(response.data);
      }); */
    }
  });
  const [editableRow, setEditableRow] = useState(null);
  const [felhasznalok, setFelhasznalok] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    jog: "tanar",
  });

  useEffect(() => {}, []); // A második paraméter nélkül az useEffect csak egyszer fut le, amikor a komponens mountolódik

  let token = "";
  const csrf = () =>
    axios.get("http://localhost:8000/token").then((response) => {
      console.log(response);
      token = response.data;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await csrf();
    formData._token = token;
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/userletrehoz",
        formData
      );
      console.log(response.data);

      // Frissítsd a felhasználók állapotot a frissen létrehozott felhasználóval
      setFelhasznalok((prevFelhasznalok) => [
        ...prevFelhasznalok,
        response.data.user,
      ]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputChange = (e, id, key) => {
    const newData = felhasznalok.map((item) =>
      item.id === id ? { ...item, [key]: e.target.value } : item
    );
    setFelhasznalok(newData);
  };
  const handleEditClick = (id) => {
    setEditableRow(id === editableRow ? null : id);
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
            <select
              id="jog"
              name="jog"
              value={formData.jog}
              onChange={handleChange}
            >
              <option value="tanar">Tanár</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit">Felhasználó létrehozása</button>
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
};

export default Felhasznalo;
