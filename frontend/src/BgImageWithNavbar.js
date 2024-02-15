import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BgImageWithNavbar = () => {
  return (

    <header className="hero-header" style={{ paddingTop: '100px', width: '100%' }}>
      <Carousel>
        <Carousel.Item >
          <img
            className="d-block w-100 menukep"
            src={process.env.PUBLIC_URL+"/kepek/bg2.jpg"}
            alt="Slide 1"
          />
          <div className="carousel-caption d-md-block ">
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', height: '100vh' }}>
              <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='text-white text-center szovegdoboz'>
                  <h1 className='mb-3'>ARC Project</h1>
                  <h2 className='mb-3 padd'>Üdvözöllek az oldalon!</h2>

                  <h4 className='mb-4 meret'>
                    {/* Lorem Ipsum szöveg */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </h4>
                  <Link className='btn btn-outline-light btn-lg gomb' to='/projekt' role='button'>
                    A Projektről bővebben..
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 menukep"
            src={process.env.PUBLIC_URL+"/kepek/bg.jpg"}
            alt="Slide 2"
          />
          <div className="carousel-caption  d-md-block">
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', height: '100vh' }}>
              <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='text-white text-center'>
                  <h1 className='mb-3'>ARC Project</h1>
                 
                  <h4 className='mb-4 meret'>
                    {/* Lorem Ipsum szöveg */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </h4>
                  <Link className='btn btn-outline-light btn-lg gomb' to='/alkoto' role='button'>
                    Alkotók
                  </Link>
                </div>
              </div >
            </div >
          </div >
        </Carousel.Item >
        <Carousel.Item>
          <img
            className="d-block w-100 menukep" 
            src={process.env.PUBLIC_URL+"/kepek/bg3.jpg"}
            alt="Slide 3"
          />
          <div className="carousel-caption d-md-block">
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', height: '100vh' }}>
              <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='text-white text-center meret'>
                  <h1 className='mb-3'>ARC Project</h1>
                  
                  <h4 className='mb-4 meret'>
                    {/* Lorem Ipsum szöveg */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </h4>
                  <Link className='btn btn-outline-light btn-lg gomb' to='/csapat' role='button'>
                    Csapatok
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel >
    </header >

  );
}

export default BgImageWithNavbar;