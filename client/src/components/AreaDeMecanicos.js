/* import React, {useState} from "react";
import Incidencias from "./Incidencias";
import NecesidadDeMaterial from "./NecesidadDeMaterial";
import HerramientaCard from "./HerramientaCard";

const AreaDeMecanicos =()=>{
    const [incidencia, setIncidencia]=useState("");
    const [necesidad, setNecesida]=useState("");
    const [busqueda, setBusqueda]=useState("");
    const [mostrarHerramientas, setMostrarHerramientas]=useState(false) */
    /* const [herramientas, setHerramientas]=useState([{}{}])no se si la voy ha necesitar !! */ 

/*     const handleIncidenciasClick =()=>{ */
        //logica para mostrar incidencia
/*         console.log("Incidencia", incidencia);
    };
    const handleNecesidadClick=()=>{ */
        //logica para manejar la necesidad de material
/*         console.log("Necesidad de material", necesidad);
    };
    const handleBusquedaChange=(e)=>{
        setBusqueda(e.target.value);
    };
    const handleBuscarStockClick = mostrarHerramientas.filter(herramienta=>herramienta.nombre.toLowerCase().includes(busqueda.toLowerCase())
);
return ( 
<div> 
    <h1>Área de Mecánicos</h1> 
    <div> 
        <input 
        type="text" 
        placeholder="Incidencia" 
        value={incidencia} 
        onChange={(e) => setIncidencia(e.target.value)} 
        /> 
        <button onClick={handleIncidenciaClick}>Incidencias</button> 
        </div> 
        <div> 
            <input 
            type="text" 
            placeholder="Necesidad de material" 
            value={necesidad} onChange={(e) => setNecesidad(e.target.value)} 
            /> 
            <button onClick={handleNecesidadClick}>Necesidad de material</button> 
            </div> 
            <div> 
                <input 
                type="text" 
                placeholder="Buscar stock" 
                value={busqueda} onChange={handleBusquedaChange} 
                /> <button onClick={handleBuscarStockClick}>Buscar stock</button> 
                </div> 
                {mostrarHerramientas && ( 
                    <div> {herramientasFiltradas.map((herramienta, index) => ( 
                    <HerramientaCard key={index} herramienta={herramienta} />
                 ))} 
                 </div> 
                 )} 
                 </div>
);
};
export default AreaDeMecanicos; */