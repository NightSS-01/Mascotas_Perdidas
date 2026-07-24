import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import MascotasDetail from "./components/mascotas/MascotasDetail";
import ListarMascotas from "./pages/ListarMascotas";
import CrearMascotas from "./pages/CrearMascotas";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/mascotas" element={<ListarMascotas />} />
          <Route path="/mascotas/crear" element={<CrearMascotas />} />
          <Route path="/mascotas/:id" element={<MascotasDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
