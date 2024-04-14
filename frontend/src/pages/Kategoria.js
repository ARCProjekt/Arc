import { Nav } from "react-bootstrap";
//import { kategoriak } from "../KatLista";
import { Link } from "react-router-dom";
import "../css/Kozos2.css";
import { useLanguage } from "./NyelvSegedlet";
import axios from "axios";
import { useEffect, useState } from "react"; 

export default function Kategoria() {

  const { selectedLanguage } = useLanguage();
   const[kategoriak,setKategoriak] = useState([]);
  useEffect(()=>{
    const getKategoria = async()=>{
      const apiKategoria = await axios.get("http://localhost:8000/api/kategoriaklista");
      console.log(apiKategoria.data.kategoriak)
      setKategoriak(apiKategoria.data.kategoriak);
    };
    getKategoria()
  },[]) 
  return (
    <div className="summary-section">
      <div className="cont">
        <div className="kat">
          <header>
            <h1>{selectedLanguage === "hu" ? "Kategóriák" : "Categories"}</h1>
          </header>
  
          <ul className="list-group list-group-flush">
            {kategoriak.map((elem, i) => (
              <li className="list-group-item border-0 border-bottom border-dark egyKategoria bg-transparent" key={i}>
                <div className="d-flex justify-content-between align-items-center kategoriak">
                  <div>
                    <h5 className="mb-0">
                      {selectedLanguage === "hu" ? elem.magyar : elem.angol} 
                     
                    </h5>
                    <p className="mb-0">
                      {selectedLanguage === "hu"
                        ? elem.magyarLeir
                        : elem.angolLeir}
                    </p>
                  </div>
                  <Nav.Link as={Link} to="/csapat">
                    {selectedLanguage === "hu" ? "Tovább a csapathoz..." : "Go to the team..."}
                  </Nav.Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}