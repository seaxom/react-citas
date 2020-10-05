import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crear state de citas
    const  [cita, actualizarCita] = useState(
        {
        mascota:'',
        propietario: '',
        fecha: '',
        hora:'',
        sintomas:''    
    
    });


    const [error, actualizarError] = useState(false)

    const actualizarState = (e) =>{

        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })

    }

    const {mascota, propietario, fecha, hora, sintomas} = cita;


    //Cuando el usuario envia formulario

    const sumbitCita = (e) =>{
        e.preventDefault();
        console.log(mascota);

        //Validar

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
 
            actualizarError(true);
            return;
        }

        //Eliminar el mensaje previo
        actualizarError(false);

        //Asignar un ID
        cita.id = uuidv4();

        //Crear la cita
        crearCita(cita);


        //Reinicar el form
        actualizarCita({
        mascota:'',
        propietario: '',
        fecha: '',
        hora:'',
        sintomas:'' 
        })

    }

    return ( 
   <Fragment>
       <h2>Crear Cita</h2>


       {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

       <form onSubmit={sumbitCita}>

           

           <label>Nombre mascota</label>
           <input type="text" name="mascota" className="u-full-width" placeholder="Mascota" onChange={actualizarState} value={mascota}/>

           <label>Nombre dueño mascota</label>
           <input type="text" name="propietario" className="u-full-width" placeholder="Nombre propietario" onChange={actualizarState} value={propietario}/>

           <label>Fecha</label>
           <input type="date" name="fecha" className="u-full-width"  onChange={actualizarState} value={fecha}/>

           <label>Hora </label>
           <input type="time" name="hora" className="u-full-width"  onChange={actualizarState} value={hora}/>

           <label>Sintomas </label>
           <textarea name="sintomas" className="u-full-width " onChange={actualizarState} value={sintomas}></textarea>
           
           <button type="submit" className="u-full-width button-primary">Agregar cita</button>

           
       </form>
   </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;