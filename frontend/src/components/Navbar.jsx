import { Link } from "react-router-dom"
import { Film, Menu, LogIn, UserPlus, X } from "lucide-react";
import { useState } from "react";

export function NavbarMenu() {
    const [open, setOpen] = useState(false);
  return (
    <nav>
        <div className="nav-container">
        <div className="logo">
          <Film size={22} style={{ marginRight: "8px" }} />
          <Link to="/">CineUleam</Link>
        </div>

        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        <ul className={`menu ${open ? "open" : ""}`}>
          <div className="izquierda">
            <li><Link to="/" onClick={() => setOpen(false)}>Cartelera</Link></li>
            <li><Link to="/funciones" onClick={() => setOpen(false)}>Funciones</Link></li>
            <li><Link to="/reserva" onClick={() => setOpen(false)}>Reserva</Link></li>
          </div>

          <div className="derecha">
            <li>
              <Link to="/Iniciar-Sesion" onClick={() => setOpen(false)}>
                <LogIn size={16} style={{ marginRight: "6px" }} />
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link to="/registrarse" onClick={() => setOpen(false)}>
                <UserPlus size={16} style={{ marginRight: "6px" }} />
                Registrarse
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  )
}