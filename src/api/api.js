import axios from "axios";

const mascotasApi = axios.create(
    {
        baseURL:"https://vrodriguezvc.pythonanywhere.com/api/",
    }
);

export default mascotasApi;