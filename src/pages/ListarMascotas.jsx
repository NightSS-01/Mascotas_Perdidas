import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import MascotasList from "../components/mascotas/MascotasList";
import logo from "../assets/logo.png"
import CrearMascotas from "./CrearMascotas";
function ListarMascotas() {
    const [mascotas, setMascotas] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const navegar = useNavigate();
    const handleClick = () => {
        navegar("/crear")
    };

    const fetchMascotas = async () => {
        try {
            const response = await mascotasApi.get("mascotas/");
            setMascotas(response.data);
        }  catch (error) {
            console.log(error);
            setFetchError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMascotas();
    }, []);

    const handleAdd = (nuevaMascota) => {
        setMascotas(prev => [...prev, nuevaMascota]);
    }

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-primary me-2" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mb-0">Cargando mascotas...</p>
        </div>
    );

    if (fetchError) return (
        <div className="container py-4">
            <div className="alert alert-danger" role="alert">
                Error al cargar las mascotas
            </div>
        </div>
    );

    const patitas = [
        { top: "8%", left: "5%", size: "26px", rotate: "-20deg" },
        { top: "18%", left: "15%", size: "16px", rotate: "40deg" },
        { top: "55%", left: "4%", size: "20px", rotate: "10deg" },
        { top: "80%", left: "10%", size: "24px", rotate: "-30deg" },
        { top: "35%", left: "20%", size: "14px", rotate: "5deg" },
        { top: "12%", left: "88%", size: "24px", rotate: "25deg" },
        { top: "40%", left: "94%", size: "18px", rotate: "-15deg" },
        { top: "70%", left: "90%", size: "22px", rotate: "15deg" },
        { top: "85%", left: "80%", size: "16px", rotate: "-5deg" },
        { top: "5%", left: "45%", size: "16px", rotate: "20deg" },
        { top: "90%", left: "40%", size: "18px", rotate: "-25deg" },
        { top: "25%", left: "70%", size: "14px", rotate: "10deg" },
        { top: "60%", left: "25%", size: "16px", rotate: "-10deg" },
        { top: "15%", left: "60%", size: "20px", rotate: "30deg" },
        { top: "75%", left: "55%", size: "18px", rotate: "-20deg" },
    ];

    return (
        <div style={{backgroundColor: "#faf9f7", minHeight: "100vh" }}>


            <header style={{backgroundColor: "#e7ede4", position: "relative", overflow: "hidden"}}>


                {patitas.map((p, i) => (
                    <span
                    key={i}
                    style={{
                        position: "absolute",
                        top: p.top,
                        left: p.left,
                        fontSize: p.size,
                        transform: `rotate(${p.rotate})`,
                        opacity: 0.35,
                        pointerEvents: "none",
                        userSelect: "none"
                    }}
                >
                    🐾
                </span>
            ))}

            <div className="container py-5 text-center" style={{ position: "relative", zIndex: 1 }}>

                <img
                    src={logo}
                    alt="Patitas"
                    className="mb-3"
                    style={{ height: "90px" }}
                />

                <h1
                    className="fw-bold mb-1"
                    style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#3a3f36",
                        fontSize: "2.75rem",
                        letterSpacing: "-0.5px"
                    }}
                >
                    Patitas
                </h1>
                <p
                    className="mb-4"
                    style={{ color: "#6b7566", fontSize: "1.05rem" }}
                >
                    Siempre vuelven al amor
                </p>

                 <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                        <form className="d-flex" style={{ width: "100%", maxWidth: "480px" }}>
                            <div className="input-group">
                                <span
                                    className="input-group-text bg-white border-end-0"
                                    style={{ borderColor: "#d8ded4" }}
                                >
                                    <i className="bi bi-search" style={{ color: "#4a5d43" }}></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0"
                                    placeholder="Buscar mascota"
                                    style={{ borderColor: "#d8ded4" }}
                                />
                            </div>
                        </form>

                        <button
                            type="button"
                            className="btn"
                            onClick={handleClick}
                            style={{
                                backgroundColor: "#4a5d43",
                                color: "#ffffff",
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 600,
                                fontSize: "14px",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                border: "none",
                                whiteSpace: "nowrap"
                            }}

                        >
                            + Publicar mascota
                        </button>
                    </div>

                    </div>
                </header>
                

            <div className="container py-5">
                <MascotasList lista={mascotas} onAdd={handleAdd} />
            </div>
        </div>
    )

}

export default ListarMascotas;