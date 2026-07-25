import { useState } from "react";
import mascotasApi from "../api/api";
import MascotasForm from "../components/mascotas/MascotasForm";

// esta página deja de ser una ruta aparte (no usa navigate)
// ahora se muestra como modal/overlay flotante encima de ListarMascota
function CrearMascotas({ onClose, onCreated}) {
    const COLOR_PRINCIPAL = "#4a5d43";
    const [error, setError] = useState(null);
    const addMascota = async (mascota) => {
        setError(null);
        try {
            const response = await mascotasApi.post("mascotas/", mascota);
            onCreated?.(response.data); // le pasa la mascota recién creada al padre
            onClose(); // antes era navigate("/") ahora simplemente cierra el modal
        } catch (error) {
            const status = error.response?.status;
            const data = error.response?.data;
 
            if (status === 400) {
                setError("Revisa los datos del formulario: hay campos inválidos o incompletos.");
            } else if (status === 404) {
                setError("No se encontró el recurso para registrar la mascota.");
            } else {
                setError("Ocurrió un error inesperado al registrar la mascota. Intenta nuevamente más tarde.");
            }
        }
        console.log(status, data);
    };
    return (
         // overlay que cubre toda la pantalla, con fondo semi-transparente detrás del modal.
         // si el usuario hace click fuera de la tarjeta (en el fondo), se cierra el modal.
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{backgroundColor: "rgba(0, 0, 0, 0.5",zIndex: 1050}}
            onClick={onClose}
        >
            <div 
                className="card border-0 shadow"
                style={{
                    width: "100%",
                    maxWidth: "900px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    background: `linear-gradient(180deg, ${COLOR_PRINCIPAL} 0%, #ffffff 60%)`
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        aria-label="Cerrar"
                        onClick={onClose}
                    ></button>
                </div>
                <h1 className="fw-bold mb-4 text-center text-white">Registrar una nueva mascota</h1>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <MascotasForm onAdd={addMascota} />
            </div>
        </div>
    );
}

export default CrearMascotas;