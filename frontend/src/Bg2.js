import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLanguage } from "./pages/NyelvSegedlet";

const Bg2 = () => {
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
            src={process.env.PUBLIC_URL + "/kepek/bgsuli.png"}
            alt="Slide 1"
          />
          <div className="carousel-caption d-md-block ">
          
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 menukep"
            src={process.env.PUBLIC_URL + "/kepek/bgsuli2.png"}
            alt="Slide 2"
          />
          <div className="carousel-caption  d-md-block">
            
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 menukep"
            src={process.env.PUBLIC_URL + "/kepek/bgsuli3.png"}
            alt="Slide 3"
          />
          <div className="carousel-caption d-md-block">
           
          </div>
        </Carousel.Item>
      </Carousel>
    </header>
  );
};

export default Bg2;
