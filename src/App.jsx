import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListarMascotas from "./pages/ListarMascotas";
import MascotasDetalles from "./pages/MascotaDetalles";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ListarMascotas />} />
          <Route path="/:id" element={<MascotasDetalles />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
