import { useEffect, useState, useRef } from "react";
import mascotasApi from "../../api/api";

const COLOR_PRINCIPAL = "#4a5d43"; // sirve para poder usar ese color

function MascotasForm({ onAdd }) {
    const fileInputRef = useRef(null); // 
    
    const [estados, setEstados] = useState([]);
    const [tipoMascota, setTipoMascota] = useState([]);
    const [sexo, setSexo] = useState([]);
    const [tamano, setTamano] = useState([]);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [edad, setEdad] = useState("");
    const [raza, setRaza] = useState("");
    const [selectedEstado, setEstado] = useState("");
    const [selectedTipoMascota, setTipoMascotaSeleccionada] = useState("");
    const [selectedSexo, setSexoSeleccionado] = useState("");
    const [selectedTamano, setTamanoSeleccionado] = useState("");
    const [imagen, setImagen] = useState(null);

    const [previewUrl, setPreviewUrl] = useState(null);
    const fetchChoices = async () => {
        try {
            const response = await mascotasApi.get("choices/");
            console.log(response.data.estado);
            setEstados(response.data.estado);
            setTipoMascota(response.data.tipo_animal);
            setSexo(response.data.sexo);
            setTamano(response.data.tamano);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchChoices();
    }, [])

    useEffect(()=>{
        return () => {
            if(previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl]);

    const handleImageAreaClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImagen(file);
        setPreviewUrl(URL.createObjectURL(file))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(nombre, descripcion, edad, raza, selectedEstado, selectedTipoMascota, selectedSexo, selectedTamano, imagen);
        // console.log(imagen);
        
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("edad", edad);
        formData.append("raza", raza);
        formData.append("estado", selectedEstado);
        formData.append("tipo_animal", selectedTipoMascota);
        formData.append("sexo", selectedSexo);
        formData.append("tamano", selectedTamano);
        formData.append("imagen", imagen);
        onAdd(formData);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-4">
                {/* Imagen */}
                <div className="col-12 col-md-4">
                    <div
                        className="rounded-4 d-flex align-items-center justify-content-center bg-light"
                        style={{ border: `2px solid ${COLOR_PRINCIPAL}`, aspectRatio: "0.9 / 1.2"}}
                        onClick={handleImageAreaClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") handleImageAreaClick();
                        }}
                    >
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Vista previa de la mascota"
                                className="w-100 h-100 rounded-4 object-fit-fill"
                            />
                        ) : (
                            <div className="text-center p-4" style={{ color: COLOR_PRINCIPAL }}>
                                <span
                                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2 p-3 fs-3"
                                    style={{ backgroundColor: `${COLOR_PRINCIPAL}22`, color: COLOR_PRINCIPAL }}
                                >
                                    +
                                </span>
                                <p className="mb-0 fw-semibold">Haz click para subir una foto</p>
                            </div>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="d-none"
                    />
                </div>
                // toda la parte de arriba es para la parte de la imagen donde el estado natural de la "tarjeta" es sin imagen y cuando se agrega un archivo este se puede ver de manera previa
                {/* Datos */}
                <div className="col-12 col-md-8">
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            style={{ borderColor: COLOR_PRINCIPAL }}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
 
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Descripción</label>
                        <textarea
                            className="form-control"
                            style={{ borderColor: COLOR_PRINCIPAL }}
                            rows="3"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>
 
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className="form-label fw-semibold">Edad</label>
                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                style={{ borderColor: COLOR_PRINCIPAL }}
                                value={edad}
                                onChange={(e) => setEdad(e.target.value)}
                            />
                        </div>
 
                        <div className="col-6 mb-3">
                            <label className="form-label fw-semibold">Raza</label>
                            <input
                                type="text"
                                className="form-control"
                                style={{ borderColor: COLOR_PRINCIPAL }}
                                value={raza}
                                onChange={(e) => setRaza(e.target.value)}
                            />
                        </div>
                    </div>
 
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className="form-label fw-semibold">Estado</label>
                            <select
                                className="form-select"
                                style={{ borderColor: COLOR_PRINCIPAL }}
                                value={selectedEstado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="">Sin estado</option>
                                {estados.map((e) => (
                                    <option value={e.value} key={e.value}>{e.label}</option>
                                ))}
                            </select>
                        </div>
 
                        <div className="col-6 mb-3">
                            <label className="form-label fw-semibold">Tipo de animal</label>
                            <select
                                className="form-select"
                                style={{ borderColor: COLOR_PRINCIPAL }}
                                value={selectedTipoMascota}
                                onChange={(e) => setTipoMascotaSeleccionada(e.target.value)}
                            >
                                <option value="">Sin tipo</option>
                                {tipoMascota.map((e) => (
                                    <option value={e.value} key={e.value}>{e.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
 
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className="form-label fw-semibold">Sexo</label>
                            <select
                                className="form-select"
                                style={{ borderColor: COLOR_PRINCIPAL }}
                                value={selectedSexo}
                                onChange={(e) => setSexoSeleccionado(e.target.value)}
                            >
                                <option value="">Sin definir</option>
                                {sexo.map((e) => (
                                    <option value={e.value} key={e.value}>{e.label}</option>
                                ))}
                            </select>
                        </div>
 
                        <div className="col-6 mb-3">
                            <label className="form-label fw-semibold">Tamaño</label>
                            <select
                                className="form-select"
                                style={{ borderColor: COLOR_PRINCIPAL }}
                                value={selectedTamano}
                                onChange={(e) => setTamanoSeleccionado(e.target.value)}
                            >
                                <option value="">Sin definir</option>
                                {tamano.map((e) => (
                                    <option value={e.value} key={e.value}>{e.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
 
                    <button
                        type="submit"
                        className="btn rounded-pill w-100 fw-bold py-2 text-white"
                        style={{ backgroundColor: COLOR_PRINCIPAL }}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </form>
    );
}

export default MascotasForm;