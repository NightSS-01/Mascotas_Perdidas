import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";

function MascotasForm({ onAdd }) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(nombre, descripcion, edad, raza, selectedEstado, selectedTipoMascota, selectedSexo, selectedTamano, imagen);
        console.log(imagen);
        
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Nombre:
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>
            <label>Descripcion:
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
            </label>
            <label>Edad:
                <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
            </label>
            <label>Raza:
                <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} />
            </label>
            <label>Estado:
                <select value={selectedEstado} onChange={(e) => setEstado(e.target.value)}>
                    <option value={""} >Sin estado</option>
                    {
                        estados.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            <label>Tipo Animal:
                <select value={selectedTipoMascota} onChange={(e) => setTipoMascotaSeleccionada(e.target.value)}>
                    <option value={""} >Sin estado</option>
                    {
                        tipoMascota.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            <label>Sexo:
                <select value={selectedSexo} onChange={(e) => setSexoSeleccionado(e.target.value)}>
                    <option value={""} >Sin estado</option>
                    {
                        sexo.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            <label>Tamaño:
                <select value={selectedTamano} onChange={(e) => setTamanoSeleccionado(e.target.value)}>
                    <option value={""} >Sin estado</option>
                    {
                        tamano.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            <label>Imagen:
                <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
            </label>

            <button type="submit">Guardar</button>
        </form>
    )
}

export default MascotasForm;