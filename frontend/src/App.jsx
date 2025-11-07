import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import { NavbarMenu } from './components/Navbar';
import { Register } from './Pages/Register';
import { LoginPage } from './Pages/LoginPage';
import { PeliculasAdmin } from './Pages/PeliculaAdmin';
import { CrearPelicula } from './Pages/CrearPelicula';

function App() {

  return (
    <>
      <NavbarMenu />

      <Routes>
        <Route path="/"  />
        <Route path="/registrarse" element={<Register />} />
        <Route path='/Iniciar-Sesion' element={<LoginPage />} />
        <Route path='/pelicula-admin' element={<PeliculasAdmin />} />
        <Route path='/crear-pelicula' element={<CrearPelicula />} />
        
      </Routes>
    </>
  )
}

export default App
