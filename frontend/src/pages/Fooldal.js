// Fooldal.js
import "../css/Fooldal.css";
import "../css/Kozos.css";
import React from 'react';
import BgImageWithNavbar from '../BgImageWithNavbar';
import  { useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";
const Fooldal = () => {
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
                  <p>Bejelentkezett felhasználó: {user?.name}</p>
                    <h1>Bemutatkozás</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis cupiditate atque ex itaque consequuntur molestias! Ipsam nulla veritatis, laudantium nostrum itaque non sunt accusantium rem sapiente aliquam doloribus. Eum, ducimus?
                      Eius officia aut illum iusto sequi sunt nam exercitationem modi asperiores porro odit aliquid accusamus voluptas rem doloremque ab perferendis iure labore laborum, corporis dignissimos tenetur, laudantium ipsa! Dolorum, quasi.
                      Qui alias dolorum magnam itaque aperiam aliquid blanditiis ullam magni odio consequatur recusandae sequi quasi incidunt earum vero aliquam quas placeat quaerat, voluptatum error cum totam ex quod? Quidem, quia.
                      Odio fugiat, esse excepturi deserunt aliquam provident illum ipsum! Et officiis omnis eligendi eum modi atque quibusdam voluptate obcaecati, libero, laborum soluta necessitatibus enim! Aut harum veritatis molestiae provident voluptates?</p>
                  </div>
                </div>
              </div>
              <div className="summary-content">

                <div className="summary-text felul">
                  <h1>Csapatok</h1>

                  <p>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="summary-image alul">

                  <img src={process.env.PUBLIC_URL+"/kepek/bg2.jpg"} alt="Kép leírása" style={{ maxWidth: '600px', width: '100%', height: 'auto' }} />
                </div>
              </div>


              <span></span>


              <div className="summary-content left">
                <div className="summary-text left felul">
                  <h1>Alkotók</h1>

                  <p>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="summary-image left alul">

                  <img src={process.env.PUBLIC_URL+"/kepek/bg3.jpg"} alt="Kép leírása" style={{ maxWidth: '600px', width: '100%' }} />
                </div>
              </div>

              <span></span>

              <div className="summary-content">
                <div className="summary-text felul">
                  <h1>Projektek</h1>

                  <p>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="summary-image alul">

                  <img src={process.env.PUBLIC_URL+"/kepek/bg.jpg"} alt="Kép leírása" style={{ maxWidth: '600px', width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
       
    
    </div>
  );
};

export default Fooldal;