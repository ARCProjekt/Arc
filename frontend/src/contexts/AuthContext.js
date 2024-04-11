import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true);
  const [errors] = useState({
    name: "hiba",
    email: "hiba",
    password: "hiba",
    password_confirmation: "hiba",
  });

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get("/api/user");
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Hiba a felhasználó lekérésekor:", error);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    if (!user) verifyUser();
    else setLoading(false);
  }, []);

  let token = "";

  const csrf = () =>
    axios.get("/token").then((response) => {
      console.log(response);
      token = response.data;
    });

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user");
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Hiba a felhasználó lekérésekor:", error);
    }
  };

  const loginReg = async ({ ...adat }, vegpont) => {
    await csrf();
    adat._token = token;
    try {
      await axios.post(vegpont, adat);
      console.log("Sikeres bejelentkezés");
      getUser();
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Hiba történt a kijelentkezés során:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loginReg, errors, getUser, user, logout, loading, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
