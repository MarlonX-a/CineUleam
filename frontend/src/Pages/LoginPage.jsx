import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from "../api/supabaseClient";

export function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [showPassword, setShowPassword ] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

      const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    const { data: userData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error al iniciar sesión:", error.message);
      setMessage("Credenciales incorrectas o usuario no registrado.");
    } else {
      console.log("Usuario logueado ✅:", userData);
      setMessage("Inicio de sesión exitoso 🎬");
      navigate("/");
    }
  });

  return (
    <div className="register-container">
        <h2>Iniciar Sesion</h2>
        <form onSubmit={onSubmit}>
            <input type="email" placeholder="correo electronico"
            {...register('email', {required: true })}
            />
            {errors.email && <span>Obligatorio ingresar el correo electronico</span>}
            <div style={{ position: "relative" }}>
                    <input type={showPassword ? "text" : "password"} 
                    placeholder="contraseña" 
                    {...register('password', { required: true} )}
                    style={{width: "100%", paddingRight: "40px" }}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    {showPassword ? <EyeOff size={18} />: <Eye size={18} />}
                </button>
                </div>
                {errors.password && <span>Obligatorio ingresar la contraseña</span>}
            <Link to="/registrarse">¿No tienes cuenta? registrate aquí</Link>
            <button>Iniciar Sesion</button>
            {message && <p>{message}</p>}
        </form>
    </div>
  )
}
