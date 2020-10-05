import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {


  //Citas en local storage

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //Monitorea cambios sobre los elementos del arreglo y ejecuta el código cada que hay un cambio, se manda [] para ejecutar una sola vez
  useEffect ( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);


  //Funcion que tome la citas actuales y tome la nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //Funcion que ellimina una cita por su id



  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional

  const titulo = citas.length === 0 ? ' No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de usuarios</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h1>{titulo}</h1>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita}/>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
