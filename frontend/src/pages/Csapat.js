import React from "react";
import { Carousel, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { kepek } from "../KepLista";
import KepGaleria from "./Galeria";
import { useState } from "react";
import "../css/Kozos.css";
import GaleriaKep from "./GaleriaKep";
export default function Csapat() {
  const [nagyKepLathato, setNagyKepLathato] = useState(false);
  const [aktKep, setAktKep] = useState(0);
  function kattintas(index) {
    console.log(kepek.index);
    setAktKep(index);
    setNagyKepLathato(true);
    /*itt kapja a gyerekkomponenstol az adatot*/
  }
  function bezarNagyKep() {
    setNagyKepLathato(false);
  }
  return (
    <div className="summary-section">
      <div className="cont">
        <div>
          <h3 className="mb-4" style={{ textAlign: "justify" }}>
            Csapattagok
          </h3>
          <ul className="list-unstyled">
            <li className="mb-2">
              <Nav.Link
              className="link"
                as={Link}
                to="/alkoto"
                style={{
                  fontSize: "1.2em",
                  marginBottom: "10px",
                  textAlign: "justify",
                }}
              >
                Zöldlomb Legolas - designer
              </Nav.Link>
            </li>
            <li className="mb-2">
              <Nav.Link
              className="link"
                as={Link}
                to="/alkoto"
                style={{
                  fontSize: "1.2em",
                  marginBottom: "10px",
                  textAlign: "justify",
                }}
              >
                Zöldlomb Legolas - designer
              </Nav.Link>
            </li>
            <li className="mb-2">
              <Nav.Link
              className="link"
                as={Link}
                to="/alkoto"
                style={{
                  fontSize: "1.2em",
                  marginBottom: "10px",
                  textAlign: "justify",
                }}
              >
                Zöldlomb Legolas - designer
              </Nav.Link>
            </li>
          </ul>
        </div>
        <div className="mt-4 ">
          <h3 style={{ textAlign: "justify" }}>Csapatmunka bemutatása</h3>
          <p className="csapat_szov"
            style={{
              fontSize: "1.2em",
              marginBottom: "10px",
              textAlign: "justify",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quam
            lacus, vulputate ac porta ac, vehicula pharetra enim. In ipsum
            felis, eleifend at erat in, volutpat condimentum dolor. Vivamus ac
            orci lobortis nisl cursus sollicitudin eu a sem. Integer tristique,
            lacus pellentesque fringilla porttitor, massa tellus semper odio, ac
            ultrices felis purus vitae tortor. Curabitur varius nisi arcu, at
            sollicitudin enim suscipit vitae. In hac habitasse platea dictumst.
            Phasellus ac ligula finibus, eleifend justo eget, dignissim risus.
            Aliquam sodales feugiat pellentesque. Aliquam pharetra eget lorem ac
            eleifend. Maecenas et purus eget erat convallis interdum.
          </p>
        </div>
        <h3 style={{ textAlign: "justify" }}>Képek a Csapatmunkájáról: </h3>
        <div className="mt-5 d-flex justify-content-center">
          <Carousel style={{ width: "60%" }}>
            {kepek.map((kep) => (
              <Carousel.Item key={kep.id}>
                <img className="d-block w-100" src={process.env.PUBLIC_URL+kep.src} alt={kep.cim} />
                <Carousel.Caption>
                  <h5>{kep.leiras}</h5>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <h3 style={{ textAlign: "justify" }}>Videók: </h3>
        <div className="mt-4 d-flex justify-content-center videok">
          <div className="video-container mx-2">
            <iframe
              width="400"
              height="225"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              title="Video 1"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-container mx-2">
            <iframe
              width="400"
              height="225"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              title="Video 2"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <h3 style={{ textAlign: "justify" }}>Teljes képgaléria: </h3>
        {nagyKepLathato && (
          <div
            className="nagyKep"
            style={{
              zIndex: 1,
              borderRadius: "10px",
              position: "absolute",
              margin:"100px",
              top: "auto",
              backgroundColor: "rgb(248, 223, 188)",
              maxWidth: "800px",
            }}
          >
            <button
              onClick={bezarNagyKep}
              style={{
                border: "0",
                float: "left",
                margin: "10px",
                background: "none",
              }}
            >
              ✖️
            </button>
            <GaleriaKep obj={kepek[aktKep]} style={{ width: "40%", margin: "10px" }} />
          </div>
        )}

        <div className="mt-4">
          <KepGaleria
            kepek={kepek}
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
            kattintas={kattintas}
          />
        </div>
      </div>
    </div>
  );
}