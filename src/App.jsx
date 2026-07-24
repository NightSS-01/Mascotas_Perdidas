import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import MascotasDetail from "./components/mascotas/MascotasDetail";
import ListarMascotas from "./pages/ListarMascotas";

function App() {

  return (
    <>
      <Router>
        <nav>
          <NavLink to={"/mascotas"}>Mascotas</NavLink>
        </nav>

        <Routes>
          <Route path="/mascotas" element={<ListarMascotas />} />
          <Route path="/mascotas/:id" element={<MascotasDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
