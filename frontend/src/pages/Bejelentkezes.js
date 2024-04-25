import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Bejelentkezes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, logout, loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adat = {
      email: email,
      password: password,
    };

    loginReg(adat, "/login");
  };

  // Ha a felhasználó be van jelentkezve, ne jelenítsük meg a bejelentkezés űrlapot
  if (user) {
    return (
      <div className="summary-section ">
    <div className="cont katsec">
      <div className="m-auto" style={{ maxWidth: "400px" }}>
        <h1 className="text-center">Bejelentkezve</h1>
        <div className=" text-center mt-3 log">
          <button onClick={logout} className="btn btn-danger">
            Kijelentkezés
          </button>
        </div>
      </div>
      </div>
      </div>
    );
  }

  return (
    <div className="summary-section ">
    <div className="cont katsec">
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
              <span className="text-danger">
                {errors.password[0]}
              </span>
            )}
          </div>
        </div>

        <div className=" text-center log">
          <button type="submit" className="btn btn-primary w-100">
            Bejelentkezés
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}
