import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthContext from "../contexts/AuthContext";
import { Button, Modal } from "react-bootstrap";

const Felhasznalo = () => {
  const { user, getUser } = useAuthContext();
  const [editableRow, setEditableRow] = useState(null);
  const [felhasznalok, setFelhasznalok] = useState([]);
  const [szerkesztettFelhasznalo, setSzerkesztettFelhasznalo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    jog: "tanar",
  });

  const [ujToken2, setUjToken] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser();
        const response = await axios.get("http://localhost:8000/api/users", {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": ujToken2 },
        });
        console.log("ujtoken2 useeffect", ujToken2);
        setFelhasznalok(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    console.log(felhasznalok);

    if (ujToken2) {
      fetchData();
    }
  }, [ujToken2]);

  useEffect(() => {
    csrf();
  }, []);

  const csrf = async () => {
    try {
      const response = await axios.get("http://localhost:8000/token");
      console.log("ujtoken2 csrf ", ujToken2);
      setUjToken(response.data); //itt frissul majd a token
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editableRow !== null) {
      //handleSubmit(e);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/userletrehoz",
        { ...formData },
        {
          headers: {
            "X-CSRF-TOKEN": ujToken2,
          },
          withCredentials: true,
        }
      );

      console.log("Új felhasználó létrehozva: ", response.data);
      setFelhasznalok((prevFelhasznalok) =>
        [...prevFelhasznalok, response.data.user].filter(
          (user) => user && user.id
        )
      );
      window.location.reload();
    } catch (error) {
      console.error("Hiba történt a felhasználó létrehozásakor: ", error);
      console.log(error.response);
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
    if (id === editableRow) {
      setSzerkesztettFelhasznalo({
        ...szerkesztettFelhasznalo,
        [key]: e.target.value,
      });
    }
  };

  const handleEditClick = (id) => {
    console.log(id);
    setEditableRow((prevEditableRow) => (prevEditableRow === id ? null : id));
  };

  const torol = async (id) => {
    try {
      const url = `http://localhost:8000/api/usertorol/${id}`;
      const response = await axios.delete(url, {
        headers: {
          "X-CSRF-TOKEN": ujToken2,
        },
        withCredentials: true,
      });
      console.log("felhasználó törölve: ", response.data);
      setFelhasznalok((prevFelhasznalok) =>
        prevFelhasznalok.filter((user) => user.id !== id)
      );
    } catch (error) {
      console.error("Hiba történt a felhasználó törlésekor: ", error);
      console.log(error.response);
    }
  };

  const frissit = async (id) => {
    if (!szerkesztettFelhasznalo) {
      console.error("Nincs szerkesztett felhasználó.");
      return;
    }
    const url = `http://localhost:8000/api/updateuser/${id}`;
    try {
      const response = await axios.patch(
        url,
        {
          name: szerkesztettFelhasznalo.name,
          email: szerkesztettFelhasznalo.email,
          password: szerkesztettFelhasznalo.password,
          jog: szerkesztettFelhasznalo.jog,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": ujToken2,
          },
          withCredentials: true,
        }
      );
      console.log("Felhasználó frissítve: ", response.data);
      setEditableRow(null);
      setSzerkesztettFelhasznalo(null);
    } catch (error) {
      console.error("Hiba történt a felhasználó frissítésekor: ", error);
      console.log(error.response);
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
            <select
              id="jog"
              name="jog"
              value={formData.jog}
              onChange={handleChange}
            >
              <option value="tanar">Tanár</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              style={{ background: "none", padding: "5px" }}
            >
              Felhasználó létrehozása
            </button>
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
                          //value={item.password}
                          placeholder="új jelszó"
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
                          type="text"
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
                        onClick={() =>
                          editableRow === item.id
                            ? frissit(item.id)
                            : handleEditClick(item.id)
                        }
                      >
                        {editableRow === item.id ? "✔️" : "🖌"}
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ background: "none", border: "none" }}
                        onClick={() => torol(item.id)}
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
    </div>
  );
};

export default Felhasznalo;
