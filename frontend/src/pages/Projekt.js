import { Carousel } from "react-bootstrap";
import { kepek } from "../KepLista";
import "../css/Kozos.css";
import { useLanguage } from "./NyelvSegedlet";
export default function Projekt() {
  const { selectedLanguage } = useLanguage();
  return (
    <div className="summary-section" style={{ textAlign: "justify" }}>
      <div className="cont">
        <h2 className="projekt_cim" style={{ textAlign: "center" }}>
          {selectedLanguage === "hu"
            ? "A projekt Lényege"
            : "The Essence of the Project"}
        </h2>
        <br />
        <p
          className="csapat_szov"
          style={{ textAlign: "justify", width: "600px", margin: "auto" }}
        >
          {" "}
          {selectedLanguage === "hu"
            ? "Az évszázad fő kihívása az ember által előidézett éghajlatváltozáshoz való alkalmazkodás, annak pusztító hatásainak mérséklése a biológiai sokféleség helyreállításával és a szén-dioxid-semlegesség elérésével. A gondolkodási és életmódminták nem könnyen alakíthatók át. A kultúra és Európa kulturális fővárosa bőséges és sokrétű cselekvési lehetőséget kínál. A művészeteket az élet más területeivel összekapcsoló közös alkotás oktathatja, provokálhatja és inspirálhatja az embereket, hogy törődjenek és reagáljanak, és a városok értelmet adják tisztábban a bennük lévő és körülöttük lévő természettel."
            : "The main challenge of this century is adaptation to human-induced climate change, mitigation of its devastating impacts by restoring biodiversity and achieving carbon neutrality. Thought and lifestyle patterns are not easily transformed. Culture and a European Capital of Culture have ample and diverse space for action. Co-creation linking the arts to other fields of life can educate, provoke and inspire people to care and react, and make sense of cities in clearer unison with the nature in and around them."}
        </p>
        <div className="mt-5 d-flex justify-content-center pr_galeria">
          <Carousel style={{ width: "40%" }}>
            {kepek.map((kep) => (
              <Carousel.Item key={kep.id}>
                <img
                  className="d-block w-100"
                  src={process.env.PUBLIC_URL + kep.src}
                  alt={kep.cim}
                />
                <Carousel.Caption>
                  <h5>{kep.leiras}</h5>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <h2 className="projekt_cim" style={{ textAlign: "center" }}>
          {selectedLanguage === "hu"
            ? "Iskolánk szerepe"
            : "The Role of our School"}
        </h2>
        <p
          className="csapat_szov"
          style={{ textAlign: "justify", margin: "auto", width: "600px" }}
        >
          {selectedLanguage === "hu" ? (
            <>
              <p>
                Iskolánk összművészeti projekttel mutatkozik be az észtországi
                Tartuban megrendezendő Európa kulturális fővárosa
                rendezvénysorozat keretein belül.{" "}
              </p>{" "}
              <p>
                A projekt neve az angol “arc” (jelentése “ív”) szóból ered, ami
                egyben az adaptation : rebirth : change (direkt csupa kisbetűvel
                írva) szavak kezdőbetűi által létrehozott akronim is,
                kettőspontokkal elválasztva ez egyes betűket. Ezek fogalmak a
                túlélésért folytatott harcunk/küzdelmünk/erőfeszítéseink
                állomásaiként egymásból következnek, egymásra épülnek, az ív/arc
                tehát egy jól felépíthető folyamatot reprezentál. A projekt
                elemei:
              </p>
              <ul>
                <li>divatperformance,</li>
                <li>kiállítás,</li>
                <li>weblap,</li>
                <li>közösségimédiás megjelenés.</li>
              </ul>
              <p>
                A divatperformance: <br />A koncepció egy
                mozgásszínház-divatbemutató kombináció formájában megjelenített
                történetmesélős divatperformance, amiben a ruhák főszerepet
                játszanak (de nem klasszikus divatbemutató), és a vezérfonallal
                összhangban a koreográfia egy történetet mesél majd el.{" "}
              </p>
              <p>
                {" "}
                <br /> A kiállítás: Az eseményt kiállítás kíséri a helyszínen (a
                GRA, FOT, MOA, DEK diákok munkái), koncepciója szerint: vetített
                kiállítás grafikus, mozgókép és animáció szakos és fotós diákok
                munkáiból, a divatperformance háttérfalaként funkcionáló két
                popup falra vetítve a performence-ot megelőző és követő órákban;
                popup kiállítás a dekoratőr diákok munkáiból a performance
                helyszínén, installációk formájában.
              </p>{" "}
            </>
          ) : (
            <>
              <p>
                Our school presents itself with an overall art project within
                the framework of the Cultural Capital of Europe event series to
                be held in Tartu, Estonia.
              </p>{" "}
              <p>
                The name of the project comes from the English word "arc"
                (meaning "ív" in Hungarian), which is also the words adaptation
                : rebirth : change (written directly in all lowercase letters).
                also an acronym created by initials, separated by colons. These
                concepts follow each other as the stages of our
                fight/struggle/efforts for survival, they build on each other,
                the arc/face therefore represents a well-structured process.
                Elements of the project:
              </p>
              <ul>
                <li>fashion performance,</li>
                <li>exhibition,</li>
                <li>website,</li>
                <li>social media presence.</li>
              </ul>
              <br />
              <p>
                The fashion performance: <br /> The concept is a story-telling
                fashion performance presented in the form of a combination of
                movement theater and fashion show, in which the clothes play the
                main role (but not a classic fashion show), and the choreography
                will tell a story in accordance with the guiding thread.{" "}
              </p>
              <p>
                The exhibition: <br /> The event is accompanied by an exhibition
                on site (the works of GRA, FOT, MOA, DEK students), according to
                the concept: a projected exhibition of the works of graphic,
                motion picture and animation majors and photography students,
                projected onto two pop-up walls that function as the background
                wall of the fashion performance in the hours before and after
                the performance; pop-up exhibition of the works of decorator
                students at the performance site, in the form of installations.
              </p>
            </>
          )}
        </p>
        <div className="mt-5 d-flex justify-content-center pr_galeria">
          <Carousel style={{ width: "40%" }}>
            {kepek.map((kep) => (
              <Carousel.Item key={kep.id}>
                <img
                  className="d-block w-100"
                  src={process.env.PUBLIC_URL + kep.src}
                  alt={kep.cim}
                />
                <Carousel.Caption>
                  <h5>{kep.leiras}</h5>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
