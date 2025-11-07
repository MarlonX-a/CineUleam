import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import { NavbarMenu } from './components/Navbar';
import { Register } from './Pages/Register';
import { LoginPage } from './Pages/LoginPage';

function App() {

  return (
    <>
      <NavbarMenu />

      <Routes>
        <Route path="/"  />
        <Route path="/registrarse" element={<Register />} />
        <Route path='/Iniciar-Sesion' element={<LoginPage />} />
        
      </Routes>
    </>
  )
}

export default App
