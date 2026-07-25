 // se agrego useRef para controlar el input de archivo de forma pragmática
 // (fileInputRef)
import { useEffect, useState, useRef } from "react";
import mascotasApi from "../../api/api";
 // se agrego esta constante para aplicar el color de todo el formulario
 // via style line (ya que el proyecto usa bootstrap)
const COLOR_PRINCIPAL = "#4a5d43";

function MascotasForm({ onAdd }) {
     // se agrego esta constanto para poder hacer referencia
     // al <input types="file"> oculto, para poder "clickear" desde el div de la imagen
    const fileInputRef = useRef(null);

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
     // se agrego el estado preview para guardar la URL temporal de la imagen
     // para poder mostrarla antes de enviarla
    const [preview, setPreview] = useState(null);

    const [errorChoices, setErrorChoices] = useState(null)
    useEffect(() => {
        let ignore = false;
        const fetchChoices = async () => {
            try {
                const response = await mascotasApi.get("choices/");
                console.log(response.data.estado);
                if(!ignore){
                    setEstados(response.data.estado);
                    setTipoMascota(response.data.tipo_animal);
                    setSexo(response.data.sexo);
                    setTamano(response.data.tamano);
                    setErrorChoices(null);
                }
            } catch (error) {

                 // manejo de errores diferenciado 400 (validación) y 404 (no encontrado).
                 // sin mostrarle al usuario el mensaje técnico crudo de la petición
                const status = error.response?.status;
                const data = error.response?.data;
                if(!ignore) {
                    if (status === 404){
                        setErrorChoices("No se encontraron las opciones para completar le formulario.");
                    } else if (status === 400){
                        setErrorChoices("La solicitud de opciones no es válida. Intenta recargar la página.")
                    } else {
                        setErrorChoices("No se pudieron cargar las opciones del formulario. Intenta nuevamente más tarde.")
                    }
                }
                console.log(status, data); // el detalle técnico solo queda en consola, no se muestra al usuario                    
            }   
        }
        fetchChoices();
        return () => {ignore = true};
    }, [])

     // Esto limpia la url temporal de la imagen cuando el componente se desmonta
     // o cuando cambia el preview
     // para no dejar URLs de objeto (blob:) ocupando memoria en el navegador
    useEffect(()=> {
        return()=> {
            if(preview) URL.revokeObjectURL(preview)
        }
    }, [preview]);

     // dispara el click del input de archivo oculto cuando el usuario hace click
     // en el recuadro de la imagen
    const HandleImageAreaCLick = () => {
        fileInputRef.current?.click();
    };

     // reemplaza la lógica que antes vivía directo en el onChange del <input type="file">
     // ahora, además de guardar el archivo, genera una URL de preview con URL.createObject
    const HandleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImagen(file);
        setPreview(URL.createObjectURL(file))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
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
    }

    return (
        // el form ya no tiene sus label apilador uno de bajo de otro
        // ahora usa el sistema de grid de bootstrap para separar imagen y datos en columnas
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-3 p-5">
                {/*image*/}
                <div className="col-12 col-md-4">
                    <div 
                         // div clickeable que reemplaza el input de archivo visible del original
                        className="rounded-4 d-flex align-items-center justify-content-center bg-light"
                        style={{border: `2px solid ${COLOR_PRINCIPAL}`, aspectRatio: "0.9/1.2"}}
                        onClick={HandleImageAreaCLick}
                        role="button" // accesibilidad, para que se comporte como botón
                        tabIndex={0} // permite enfocar el div con teclado (tab)
                    >
                        {preview ? ( // si ya hay una imagen elegida, se muestr el preview
                            <img 
                                src={preview}
                                alt="Vista previa de la mascota"
                                className="w-100 h-100 rounded-4 object-fit-fill"
                            />
                        ):( // si no hay imagen, se muestra un placeholder con icono "+" y texto de ayuda
                            <div className="text-center p-4" style={{color: COLOR_PRINCIPAL}}>
                                <span
                                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2 p-3 fs-3"
                                    style={{backgroundColor: `${COLOR_PRINCIPAL}22`, color: COLOR_PRINCIPAL}}
                                >
                                    +
                                </span>
                                <p className="mb-0 fw-semibold"> Haz click para subir una foto</p>
                            </div>
                        )}
                        <input 
                            ref={fileInputRef} // conecta este input con fileInputRef
                            type="file"
                            accept="image/*" // filtra el selecto de archivo para que solo muestre imágenes
                            onChange={HandleImageChange}
                            className="d-none"
                        />
                    </div>
                </div>    
                {/* toda la parte de arriba es para el recuadro de subir foto */}
                {/* Datos: Aqui solamente se estilizo el formulario*/}
                <div className="col-12 col-md-8">
                    {errorChoices && (
                        <div className="alert alert-warning" role="alert">
                            {errorChoices}
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Nombre</label>
                        <input 
                            type="text"
                            className="form-control"
                            style={{borderColor: COLOR_PRINCIPAL}}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Descripción</label>
                        <textarea 
                            className="form-control"
                            style={{borderColor: COLOR_PRINCIPAL}}
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
                                style={{borderColor: COLOR_PRINCIPAL}}
                                value={edad}
                                onChange={(e) => setEdad(e.target.value)}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label fw-semibold">Raza</label>
                            <input 
                                type="text"
                                min="0"
                                className="form-control"
                                style={{borderColor: COLOR_PRINCIPAL}}
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
                                style={{borderColor: COLOR_PRINCIPAL}}
                                value={selectedEstado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="">Sin estado</option>
                                {estados.map((e)=> (<option value={e.value} key={e.value}>{e.label}</option>))}
                            </select>
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label fw-semibold">Tipo de animal</label>
                            <select
                                className="form-select"
                                style={{borderColor: COLOR_PRINCIPAL}}
                                value={selectedTipoMascota}
                                onChange={(e) => setTipoMascotaSeleccionada(e.target.value)}
                            >
                                <option value="">Sin tipo</option>
                                {tipoMascota.map((e)=> (<option value={e.value} key={e.value}>{e.label}</option>))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className="form-label fw-semibold">Sexo</label>
                            <select
                                className="form-select"
                                style={{borderColor: COLOR_PRINCIPAL}}
                                value={selectedSexo}
                                onChange={(e) => setSexoSeleccionado(e.target.value)}
                            >
                                <option value="">Sin estado</option>
                                {sexo.map((e)=> (<option value={e.value} key={e.value}>{e.label}</option>))}
                            </select>
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label fw-semibold">Tamaño</label>
                            <select
                                className="form-select"
                                style={{borderColor: COLOR_PRINCIPAL}}
                                value={selectedTamano}
                                onChange={(e) => setTamanoSeleccionado(e.target.value)}
                            >
                                <option value="">Sin definir</option>
                                {tamano.map((e)=> (<option value={e.value} key={e.value}>{e.label}</option>))}
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn rounded-pill w-100 fw-bold py-2 text-white"
                        style={{ backgroundColor: COLOR_PRINCIPAL}}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </form>
    )
}

export default MascotasForm;