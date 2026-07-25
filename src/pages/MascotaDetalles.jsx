import MascotasDetail from "../components/mascotas/MascotasDetail";

function MascotasDetalles() {
    const COLOR_PRINCIPAL = "#4a5d43";

    return (
        <div
            style={{
                minHeight: "100vh",
                background: `linear-gradient(180deg, ${COLOR_PRINCIPAL} 0%, #ffffff 60%)`,
            }}
        >
            <div className="container py-5">
                <h1 className="fw-bold mb-4 text-center text-white">Detalles de la Mascota</h1>

                <div className="card border-0 bg-transparent">
                    <div className="card-body p-0">
                        <MascotasDetail />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MascotasDetalles;