import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Bejelentkezes() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({
    name: "hiba",
    email: "hiba",
    password: "hiba",
    password_confirmation: "hiba",
  });

  let token = "";

  const csrf = () =>
    axios.get("/token").then((response) => {
      console.log(response);
      token = response.data;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();

    const adat = {
      email: email,
      password: password,
      _token: token,
    };

    try {
      await axios.post("/login", adat);
      console.log("Sikeres bejelentkezés");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Frissítjük a CSRF tokent
      await csrf();
  
      // Kijelentkezési kérés elküldése a frissített tokennel
      await axios.post("/logout", { _token: token });
  
      // Frissítjük az authentikációs állapotot
      setUser(null);
  
      console.log("Sikeres kijelentkezés");
      navigate("/bejelentkezes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Bejelentkezés</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            id="email"
            placeholder="email"
            name="email"
          />
        </div>
        <div>
          {errors.email && (
            <span className="text-danger">{errors.email[0]}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Jelszó:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            id="pwd"
            placeholder="jelszó"
            name="pwd"
          />
          <div>
            {errors.password && (
              <span className="text-danger">{errors.password[0]}</span>
            )}
          </div>
        </div>

        <div className=" text-center">
          <button type="submit" className="btn btn-primary w-100">
            Bejelentkezés
          </button>
        </div>

        <div className=" text-center mt-3">
          <button onClick={handleLogout} className="btn btn-danger">
            Kijelentkezés
          </button>
        </div>
      </form>
    </div>
  );
}
