import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLanguage } from "./pages/NyelvSegedlet";

const BgImageWithNavbar = () => {
  const { selectedLanguage } = useLanguage();
  return (
    <header
      className="hero-header"
      style={{ paddingTop: "100px", width: "100%" }}
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 menukep"
            src={process.env.PUBLIC_URL + "/kepek/bg2.jpg"}
            alt="Slide 1"
          />
          <div className="carousel-caption d-md-block ">
            <div
              className="mask"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", height: "100vh" }}
            >
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white text-center szovegdoboz">
                  <h1 className="mb-3">ARC Project</h1>
                  <h2 className="mb-3 padd">
                    {selectedLanguage === "hu"
                      ? "Üdvözöllek az oldalon!"
                      : "Welcome to the site!"}
                  </h2>

                  <h4 className="mb-4 meret">
                    {/* Lorem Ipsum szöveg */}
                    {selectedLanguage === "hu"
                      ? "A Tartuban és Dél-Észtországban zajló program a Arts of Survival történetét mutatja be – azokat a tudást, készségeket és értékeket, amelyek a jövőben jó életvitelhez segítenek."
                      : "The program in Tartu and Southern Estonia presents the story of the Arts of Survival – the knowledge, skills, and values that will help us lead a good life in the future."}
                  </h4>
                  <Link
                    className="btn btn-outline-light btn-lg gomb"
                    to="/projekt"
                    role="button"
                  >
                    {selectedLanguage === "hu"
                      ? "A projektről bővebben"
                      : "About the project"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 menukep"
            src={process.env.PUBLIC_URL + "/kepek/bg.jpg"}
            alt="Slide 2"
          />
          <div className="carousel-caption  d-md-block">
            <div
              className="mask"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", height: "100vh" }}
            >
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white text-center">
                  <h1 className="mb-3">ARC Project</h1>

                  <h4 className="mb-4 meret">
                    {/* Lorem Ipsum szöveg */}
                    {selectedLanguage === "hu"
                      ? "Grafikus, fotográfus, dekoratőr, festő, divattervező illetve mozgó animáció készítő diákjaink, akik mindent beleadtak."
                      : "Our students who are graphic designers, photographers, decorators, painters, fashion designers and animation creators gave their all."}
                  </h4>
                  <Link
                    className="btn btn-outline-light btn-lg gomb"
                    to="/alkoto"
                    role="button"
                  >
                    {selectedLanguage === "hu"
                      ? "Alkotók"
                      : "Creators"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 menukep"
            src={process.env.PUBLIC_URL + "/kepek/bg3.jpg"}
            alt="Slide 3"
          />
          <div className="carousel-caption d-md-block">
            <div
              className="mask"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", height: "100vh" }}
            >
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white text-center meret">
                  <h1 className="mb-3">ARC Project</h1>

                  <h4 className="mb-4 meret">
                    {/* Lorem Ipsum szöveg */}
                    {selectedLanguage === "hu"
                      ? "Vegyes művészeti szakos diákjainkból álló csapataink, mind-mind különböző kategórákban alkottak hatalmasat."
                      : "Our teams of mixed art students created great in different categories."}
                  </h4>
                  <Link
                    className="btn btn-outline-light btn-lg gomb"
                    to="/csapat"
                    role="button"
                  >
                    {selectedLanguage === "hu"
                      ? "Csapatok"
                      : "Teams"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </header>
  );
};

export default BgImageWithNavbar;
