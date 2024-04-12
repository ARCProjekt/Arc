import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(
      JSON.parse(localStorage.getItem("user")) || null
    );
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    //const csrf = () => axios.get("/sanctum/csrf-cookie");
    let token = "";
    const csrf = () =>
        axios.get("/token").then((response) => {
            console.log(response);
            token = response.data;
        });

    //bejelentkezett felhasználó adatainak lekérdezése
    const getUser = async () => {
      try {
        const { data } = await axios.get("/api/user");
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Hiba a felhasználó lekérésekor:", error);
      }
    };
    const logout = async () => {
        await csrf()
        console.log(token)
        axios.post("/logout",{_token:token}).then((resp) => {
            setUser(null);
            localStorage.removeItem("user");
            console.log(resp);
        });
    };
    
    const loginReg = async ({ ...adat }, vegpont) => {
        await csrf()
        console.log(token)
        adat._token = token;
        console.log(adat)
        
        await csrf();
       
        try {
            await axios.post(vegpont, adat);
            console.log("siker");
           
            await getUser();
           
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{ logout, loginReg, errors, getUser, user }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export default function useAuthContext() {
    return useContext(AuthContext);
}