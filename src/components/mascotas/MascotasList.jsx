import { Link } from "react-router-dom";

function MascotasList({ lista }) {

    const badgeColor = (estado) => {
        const map = {
            perdida: "#b45309",
            encontrada: "#b45309",
            adoptada: "#4a5d43",
        };
        return map[estado?.toLowerCase()] || "#4a5d43";
    }

    return (
        <>
            {lista.length === 0 ? (
                <p className="text-muted text-center">No hay mascotas reportadas todavía.</p>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {lista.map(m => (
                        <div className="col" key={m.id}>
                            <div
                                className="card h-100 position-relative"
                                style={{
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                                    border: "2px solid #4a5d43"
                                }}
                            >

                                <div className="position-relative">
                                    <img
                                        src={m.imagen}
                                        className="card-img-top"
                                        alt={m.nombre}
                                        style={{ height: "220px", objectFit: "cover" }}
                                    />
                                    {m.estado && (
                                        <span
                                            className="position-absolute top-0 start-0 m-2 badge text-uppercase"
                                            style={{
                                                backgroundColor: badgeColor(m.estado),
                                                fontFamily: "'Poppins', sans-serif",
                                                fontWeight: 600,
                                                fontSize: "10px",
                                                letterSpacing: "0.5px",
                                                padding: "6px 10px",
                                                borderRadius: "20px"
                                            }}
                                        >
                                            {m.estado}
                                        </span>
                                    )}
                                </div>

                                <div className ="card-body">
                                    <h5
                                        className="card-title mb-1"
                                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#2f332c" }}
                                    >
                                        {m.nombre || "Sin nombre"}
                                    </h5>
                                    <p className="small mb-2 fw-semibold" style={{ color: "#b45309"}}>
                                        {m.raza} {m.edad ? `· ${m.edad} años` : ""}
                                    </p>
                                    <p className="card-text small text-truncate mb-3" style={{color: "#7a7a7a" }}>
                                        {m.descripcion}
                                    </p>
                                    <Link
                                        to={`${m.id}`}
                                        className="stretched-link text-decoration-none small fw-semibold"
                                        style={{ color: "#4a5d43" }}
                                    >
                                        Ver mascota →
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default MascotasList