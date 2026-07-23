import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import MascotasPage from "./pages/MascotasPage";
import MascotasForm from "./components/mascotas/MascotasForm";
import MascotasDetail from "./components/mascotas/MascotasDetail";

function App() {

  return (
    <>
      <Router>
        <nav>
          <NavLink to={"/mascotas"}>Mascotas</NavLink>
        </nav>

        <Routes>
          <Route path="/mascotas" element={<MascotasPage />} />
          <Route path="/mascotas/:id" element={<MascotasDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
