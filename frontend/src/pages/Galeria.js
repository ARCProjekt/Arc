import React from "react";
import Kep from "./Kep";
import { kepek } from "../KepLista";
export default function KepGaleria(props) {
  function kattintas(index) {
    console.log(index);
    props.kattintas(index);
    /* setAktTermek(index) */
    /*itt kapja a gyerekkomponenstol az adatot*/
  }
  return (
    <div className="row galeria justify-content-center">
     {kepek.map((elem, index) => {
          return (

            <div className="col-4 col-md-4 col-lg-4 mb-3"><Kep obj={elem}  key={index} index={index} kattintas={kattintas} 
              /></div>

          );
        })}
    </div>
  );
}