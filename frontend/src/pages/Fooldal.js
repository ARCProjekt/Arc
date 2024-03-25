import "../css/Fooldal.css";
import "../css/Kozos.css";
import React from "react";
import BgImageWithNavbar from "../BgImageWithNavbar";
import { useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";
import { useLanguage } from "./NyelvSegedlet";
const Fooldal = () => {
  const { selectedLanguage } = useLanguage();
  const { user, getUser } = useAuthContext();
  useEffect(() => {
    if (!user) {
      getUser();
    }
  });
  return (
    <div>
      <BgImageWithNavbar />

      <div>
        <div className="summary-section">
          <div className="cont">
            <div className="summary-content">
              <div className="summary-text">
                <div className="bem">
                  <h1>
                    {selectedLanguage === "hu"
                      ? "Bemutatkozás"
                      : "Introduction"}
                  </h1>
                  <p>
                    {selectedLanguage === "hu"
                      ? "Iskolánk összművészeti projekttel mutatkozik be az észtországi Tartuban megrendezendő Európa kulturális fővárosa rendezvénysorozat keretein belül. A projekt neve az angol “arc” (jelentése “ív”) szóból ered, ami egyben az adaptation : rebirth : change (direkt csupa kisbetűvel írva) szavak kezdőbetűi által létrehozott akronim is, kettőspontokkal elválasztva ez egyes betűket. Ezek fogalmak a túlélésért folytatott harcunk/küzdelmünk/erőfeszítéseink állomásaiként egymásból következnek, egymásra épülnek, az ív/arc tehát egy jól felépíthető folyamatot reprezentál."
                      : "Our school presents itself with an overall art project within the framework of the Cultural Capital of Europe event series to be held in Tartu, Estonia. The name of the project comes from the English word 'arc' (meaning 'ív' in Hungarian), which is also an acronym created by the initial letters of the words adaptation : rebirth : change (written directly in all lowercase letters), separated by colons. These concepts follow each other as the stages of our fight/struggle/efforts for survival, they build on each other, the arc/face therefore represents a well-structured process."}{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="summary-content">
              <div className="summary-text felul">
                <h1>{selectedLanguage === "hu" ? "Csapatok" : "Teams"}</h1>
                <p>
                  {selectedLanguage === "hu"
                    ? "Az a:r:c projekt művész diákokból álló csapatai, mind külön-külön kategóriákban alkottak..."
                    : "The teams of student artists of the a:r:c project all created in separate categories..."}
                </p>
              </div>
              <div className="summary-image alul">
                <img
                  src={process.env.PUBLIC_URL + "/kepek/bg2.jpg"}
                  alt="Kép leírása"
                  style={{ maxWidth: "600px", width: "100%", height: "auto" }}
                />
              </div>
            </div>

            <span></span>

            <div className="summary-content left">
              <div className="summary-text left felul">
                <h1>{selectedLanguage === "hu" ? "Alkotók" : "Creators"}</h1>
                <p>
                  {selectedLanguage === "hu"
                    ? "Diákjaink, kiknek munkája nélkül ez az egész nem jöhetett volna létre..."
                    : "Our students, without whose work all this would not have been possible..."}
                </p>
              </div>
              <div className="summary-image left alul">
                <img
                  src={process.env.PUBLIC_URL + "/kepek/bg3.jpg"}
                  alt="Kép leírása"
                  style={{ maxWidth: "600px", width: "100%" }}
                />
              </div>
            </div>

            <span></span>

            <div className="summary-content">
              <div className="summary-text felul">
                <h1>Projektek</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="summary-image alul">
                <img
                  src={process.env.PUBLIC_URL + "/kepek/bg.jpg"}
                  alt="Kép leírása"
                  style={{ maxWidth: "600px", width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fooldal;
