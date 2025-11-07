import { Link } from "react-router-dom";
import { Film, Menu, LogIn, UserPlus, X, Ticket, CalendarDays, Clapperboard, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../api/supabaseClient";

export function NavbarMenu() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
  };

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
          {user ? (
            <>
              <div className="izquierda">
                <li>
                  <Link to="/" onClick={() => setOpen(false)}>
                    <Clapperboard size={16} style={{ marginRight: "6px" }} />
                    Cartelera
                  </Link>
                </li>
                <li>
                  <Link to="/funciones" onClick={() => setOpen(false)}>
                    <CalendarDays size={16} style={{ marginRight: "6px" }} />
                    Funciones
                  </Link>
                </li>
                <li>
                  <Link to="/reserva" onClick={() => setOpen(false)}>
                    <Ticket size={16} style={{ marginRight: "6px" }} />
                    Mis Reservas
                  </Link>
                </li>
              </div>

              <div className="derecha">
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={16} style={{ marginRight: "6px" }} />
                    Cerrar sesión
                  </button>
                </li>
              </div>
            </>
          ) : (
            <>
              {/* --- USUARIO NO AUTENTICADO --- */}
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
