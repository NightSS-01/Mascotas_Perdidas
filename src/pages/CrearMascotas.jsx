import { useNavigate } from "react-router-dom";
import mascotasApi from "../api/api";
import MascotasForm from "../components/mascotas/MascotasForm";

 // esta pagina se creo para separa ListarMascotas del formulario
 // ahora esta pagina vive aparte y solo se encarga de la creación.
function CrearMascotas() {
    const navigate = useNavigate();
    const COLOR_PRINCIPAL = "#4a5d43";

    const addMascota = async (mascota) => {
         // esta función reemplaza a "addMascotas" que antes vivia en MascotasPage.jsx
         // se la pasa a MascotasFOrm como prop "onAdd", igual que antes
        try {
            await mascotasApi.post("mascotas/", mascota);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            style={{
                minHeight: "100vh",
                background: `linear-gradient(180deg, ${COLOR_PRINCIPAL} 0%, #ffffff 60%)`,
            }}
        >
            <div className="container py-5">
                <h1 className="fw-bold mb-4 text-center text-white">Registrar una nueva mascota</h1>
 
                <div className="card border-0 bg-transparent">
                    <div className="card-body">
                        <MascotasForm onAdd={addMascota} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearMascotas;