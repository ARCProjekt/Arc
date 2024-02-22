import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Modal, Button } from "react-bootstrap";

export default function Bejelentkezes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "hiba",
    email: "hiba",
    password: "hiba",
    password_confirmation: "hiba",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  let token = "";
  const navigate = useNavigate();

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
      setShowSuccessModal(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await csrf();
      await axios.post("/logout", { _token: token });
      console.log("Sikeres kijelentkezés");
      setShowLogoutModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Frissítheted az oldalt, amikor bezáródik a sikeres bejelentkezés ablak
    window.location.reload();
  };

  const handleLogoutModalClose = () => {
    setShowLogoutModal(false);
    // Frissítheted az oldalt, amikor bezáródik a sikeres kijelentkezés ablak
    window.location.reload();
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const loginSuccess = query.get("loginSuccess");
  
    if (loginSuccess) {
      setShowSuccessModal(true);
    }
  }, []); 

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
      </form>

      <div className=" text-center mt-3">
        <button onClick={handleLogout} className="btn btn-danger">
          Kijelentkezés
        </button>
      </div>

      {/* Sikeres bejelentkezés modal */}
      <Modal show={showSuccessModal} onHide={handleSuccessModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sikeres bejelentkezés</Modal.Title>
        </Modal.Header>
        <Modal.Body>Üdvözöllek! Sikeresen bejelentkeztél.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessModalClose}>
            Bezárás
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sikeres kijelentkezés modal */}
      <Modal show={showLogoutModal} onHide={handleLogoutModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sikeres kijelentkezés</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sikeresen kijelentkeztél. Viszlát!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogoutModalClose}>
            Bezárás
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
