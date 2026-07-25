import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import mascotasApi from "../../api/api";

const COLOR_PRINCIPAL = "#4a5d43";

function MascotasDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // estados principales
    const [mascota, setMascota] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    //estados para comentarios y edición de estado
    const [nuevoAutor, setNuevoAutor] = useState("");
    const [nuevoContenido, setNuevoContenido] = useState("");
    const [nuevoEstado, setNuevoEstado] = useState("");

    // este es para usarse en handleCambiarEstado, handleAgregarComentario y handleEliminarComentario
    const fetchMascotaDetail = async () => {
        setLoading(true);
        try {
            const response = await mascotasApi.get(`mascotas/${id}/`);
            setMascota(response.data);
            setNuevoEstado(response.data.estado || "");
            setErrorStatus(null);
        } catch (error) {
            const status = error.response?.status;
            setErrorStatus(status);
            if (status === 404) {
                setErrorMessage("La mascota solicitada no fue encontrada.");
            } else {
                setErrorMessage("Ocurrió un error al cargar la información. Intente más tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    // obtener detalles (GET)
    useEffect(() => {
        let ignore = false;
        const CargarMascota = async () => {
        setLoading(true);
            try {
                const response = await mascotasApi.get(`mascotas/${id}/`);
                if(!ignore){
                    setMascota(response.data);
                    setNuevoEstado(response.data.estado || "");
                    setErrorStatus(null);
                }
            } catch (error) {
                if(!ignore) {
                    const status = error.response?.status;
                    setErrorStatus(status);
                    if (status === 404) {
                        setErrorMessage("La mascota solicitada no fue encontrada.");
                    } else {
                        setErrorMessage("Ocurrió un error al cargar la información. Intente más tarde.");
                    }
                }
            } finally {
                if(!ignore){
                    setLoading(false);
                }
            }
        };
        CargarMascota();
        return() => {
            ignore = true;
        }
    }, [id]);

    // para actualizar estado (aplicando PATCH)
    const handleCambiarEstado = async (e) => {
        e.preventDefault();
        try {
            await mascotasApi.patch(`mascotas/${id}/`, { estado: nuevoEstado });
            fetchMascotaDetail();
        } catch (error) {
            alert("Error al actualizar el estado: " + (error.response?.data?.estado?.[0] || "Error de servidor"));
        }
    };

    // eliminar mascota (metodo DELETE)
    const handleEliminarMascota = async () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
            try {
                await mascotasApi.delete(`mascotas/${id}/`);
                navigate("/");
            } catch (error) {
                alert("Error al eliminar la mascota: " + (error.response?.data?.detail || "Error de servidor"));
            }
        }
    };

    // AGREGAR COMENTARIO (POST comentarios)
    const handleAgregarComentario = async (e) => {
        e.preventDefault();
        if (!nuevoAutor.trim() || !nuevoContenido.trim()) return;

        try {
            await mascotasApi.post(`mascotas/${id}/comentar/`, {
                autor: nuevoAutor,
                contenido: nuevoContenido,
            });
            setNuevoAutor("");
            setNuevoContenido("");
            fetchMascotaDetail();
        } catch (error) {
            alert("Error al agregar el comentario: " + (error.response?.data?.detail || "Error de servidor"));
        }
    };

    // eliminar comentario (DELETE comentarios)
    const handleEliminarComentario = async (comentarioId) => {
        try {
            await mascotasApi.delete(`comentarios/${comentarioId}/`);
            fetchMascotaDetail();
        } catch (error) {
            alert("Error al eliminar el comentario: "+ (error.response?.data?.detail || "Error de servidor"));
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5 text-white">
                <div className="spinner-border" role="status"></div>
                <p className="mt-2">Cargando detalles...</p>
            </div>
        );
    }

    if (errorStatus) {
        return (
            <div className="card shadow-sm border-0 p-5 text-center">
                <h2 className="fw-bold text-danger">Error {errorStatus}</h2>
                <p className="text-muted">{errorMessage}</p>
                <div>
                    <Link to="/" className="btn rounded-pill text-white fw-bold px-4" style={{ backgroundColor: COLOR_PRINCIPAL }}>
                        Volver a la lista
                    </Link>
                </div>
            </div>
        );
    }

// SECCION DE RENDERIZADO PRINCIPAL
    return (
        <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
            {/* Botón Volver */}
            <div className="mb-3">
                <Link to="/" className="text-decoration-none fw-bold" style={{ color: COLOR_PRINCIPAL }}>
                    &larr; Volver a la lista
                </Link>
            </div>

            <div className="row g-4">
                {/* Columna Izquierda: Imagen */}
                <div className="col-12 col-md-5">
                    <div
                        className="rounded-4 overflow-hidden bg-light d-flex align-items-center justify-content-center"
                        style={{ border: `2px solid ${COLOR_PRINCIPAL}`, aspectRatio: "0.9 / 1.2" }}
                    >
                        {mascota?.imagen ? (
                            <img
                                src={mascota.imagen}
                                alt={mascota.nombre}
                                className="w-100 h-100 object-fit-cover"
                            />
                        ) : (
                            <span className="text-muted">Sin imagen disponible</span>
                        )}
                    </div>
                    {mascota?.fecha_creacion && (
                        <p className="text-muted text-center small mt-2">
                            Publicado el: {new Date(mascota.fecha_creacion).toLocaleDateString()}
                        </p>
                    )}
                </div>

                {/* Columna Derecha: Información */}
                <div className="col-12 col-md-7">
                    <h2 className="fw-bold mb-3" style={{ color: COLOR_PRINCIPAL }}>
                        {mascota?.nombre}
                    </h2>

                    <div className="row g-2 mb-3">
                        <div className="col-6">
                            <div className="p-3 rounded-3" style={{ backgroundColor: `${COLOR_PRINCIPAL}15` }}>
                                <span className="d-block small fw-bold text-muted">Estado</span>
                                <strong style={{ color: COLOR_PRINCIPAL }}>{mascota?.estado || "Sin definir"}</strong>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="p-3 rounded-3" style={{ backgroundColor: `${COLOR_PRINCIPAL}15` }}>
                                <span className="d-block small fw-bold text-muted">Tipo</span>
                                <strong style={{ color: COLOR_PRINCIPAL }}>{mascota?.tipo_animal || "Sin definir"}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h5 className="fw-semibold">Descripción</h5>
                        <p className="text-muted">{mascota?.descripcion || "Sin descripción disponible."}</p>
                    </div>

                    {/* Atributos Adicionales */}
                    <div className="table-responsive mb-4">
                        <table className="table table-borderless table-sm">
                            <tbody>
                                <tr>
                                    <td className="fw-semibold text-muted">Raza:</td>
                                    <td className="fw-bold">{mascota?.raza || "No especificada"}</td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold text-muted">Edad:</td>
                                    <td className="fw-bold">{mascota?.edad ? `${mascota.edad} años` : "Desconocida"}</td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold text-muted">Sexo:</td>
                                    <td className="fw-bold">{mascota?.sexo || "Sin definir"}</td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold text-muted">Tamaño:</td>
                                    <td className="fw-bold">{mascota?.tamano || "Sin definir"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Panel de Gestión (PATCH y DELETE) */}
                    <div className="p-3 rounded-3 border bg-light">
                        <h6 className="fw-bold mb-3">Administrar Registro</h6>
            
                        <form onSubmit={handleCambiarEstado} className="row g-2 align-items-center mb-3">
                            <div className="col-8">
                                <select
                                    className="form-select"
                                    style={{ borderColor: COLOR_PRINCIPAL }}
                                    value={nuevoEstado}
                                    onChange={(e) => setNuevoEstado(e.target.value)}
                                >
                                    <option value="">Seleccionar estado...</option>
                                    <option value="perdida">Perdida</option>
                                    <option value="encontrada">Encontrada</option>
                                    <option value="en_adopcion">En adopción</option>
                                    <option value="adoptada">Adoptada</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <button
                                    type="submit"
                                    className="btn text-white w-100 fw-semibold"
                                    style={{ backgroundColor: COLOR_PRINCIPAL }}
                                >
                                    Cambiar
                                </button>
                            </div>
                        </form>

                        <button
                            onClick={handleEliminarMascota}
                            className="btn btn-outline-danger w-100 fw-semibold"
                        >
                            Eliminar Mascota
                        </button>
                    </div>
                </div>
            </div>

            <hr className="my-5" />

            {/* Sección de Comentarios */}
            <div>
                <h4 className="fw-bold mb-3" style={{ color: COLOR_PRINCIPAL }}>
                    Comentarios ({mascota?.comentarios?.length || 0})
                </h4>

                {/* Formulario Agregar Comentario */}
                <form onSubmit={handleAgregarComentario} className="mb-4">
                    <div className="mb-2">
                        <input
                            type="text"
                            className="form-control"
                            style={{ borderColor: COLOR_PRINCIPAL }}
                            placeholder="Tu nombre"
                            value={nuevoAutor}
                            onChange={(e) => setNuevoAutor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <textarea
                            className="form-control"
                            style={{ borderColor: COLOR_PRINCIPAL }}
                            rows="2"
                            placeholder="Escribe un comentario..."
                            value={nuevoContenido}
                            onChange={(e) => setNuevoContenido(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="btn text-white fw-bold rounded-pill px-4"
                        style={{ backgroundColor: COLOR_PRINCIPAL }}
                    >
                        Publicar Comentario
                    </button>
                </form>

                {/* Lista de Comentarios */}
                <div className="d-flex flex-column gap-2">
                    {mascota?.comentarios?.length === 0 ? (
                        <p className="text-muted">Aún no hay comentarios publicados.</p>
                    ) : (
                        mascota?.comentarios?.map((c) => (
                            <div key={c.id} className="p-3 rounded-3 bg-light d-flex justify-content-between align-items-center">
                                <div>
                                    <strong className="d-block" style={{ color: COLOR_PRINCIPAL }}>{c.autor}</strong>
                                    <span className="text-dark">{c.contenido}</span>
                                </div>
                                <button
                                    onClick={() => handleEliminarComentario(c.id)}
                                    className="btn btn-sm btn-outline-danger border-0"
                                    title="Eliminar comentario"
                                >
                                    &times;
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default MascotasDetail;