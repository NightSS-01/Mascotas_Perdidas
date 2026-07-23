
import { Link } from "react-router-dom";
import MascotasForm from "./MascotasForm";


function MascotasList({ lista, onAdd }) {



    return (
        <>
            <h2>Lista mascotas</h2>

            <MascotasForm onAdd={onAdd} />

            {
                lista.map(m =>
                (
                    <div key={m.id}>
                        <h3>{m.nombre}</h3>
                        <img src={m.imagen} />
                        <p>{m.descripcion}</p>
                        <p>Edad: {m.edad}</p>
                        <p>Raza: {m.raza}</p>
                        <Link to={`${m.id}`}>Ver mascota</Link>

                    </div>
                )
                )

            }
           
        </>
    )
}

export default MascotasList;