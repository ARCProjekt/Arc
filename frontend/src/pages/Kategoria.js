import { Nav } from "react-bootstrap";
import { kategoriak } from "../KatLista";
import { Link } from "react-router-dom";
//import "../css/Kozos.css";
import { useLanguage } from "./NyelvSegedlet";

export default function Kategoria() {
  const { selectedLanguage } = useLanguage();

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
                    {selectedLanguage === "hu" ? "Tovább..." : "More..."}
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