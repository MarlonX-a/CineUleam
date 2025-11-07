import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react";
import { supabase } from "../api/supabaseClient";

export function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [ showPassword, setShowPassword ] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
    const { email, password, nombre, apellido, username } = data;

    const { data: userData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre, apellido, username },
      },
    });

    if (error) {
      console.error("Error al registrar:", error.message);
      setMessage("No se pudo registrar el usuario.");
    } else {
      console.log("Usuario registrado:", userData);
      setMessage("Registro exitoso. Revisa tu correo para confirmar tu cuenta.");
      navigate("/")
    }
  });

  return (
        <div className="register-container">
            <h2>Registro</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="username"
                {...register('username', { required: true })}
                />
                {errors.username && <span>Obigatorio ingresar numbre de usuario</span>}
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
                <input type="email" placeholder="correo electronico" 
                {...register('email', { required: true } )}
                />
                {errors.email && <span>Obligatorio ingresar el correo electronico</span>}
                <input type="text" placeholder="Nombre" 
                {...register('first_name', { required: true } )}
                />
                {errors.nombre && <span>Obligatorio ingresar el nombre</span>}
                <input type="text" placeholder="Apellido" 
                {...register('last_name', { required: true } )}
                />
                {errors.apellido && <span>Obligatorio ingresar el apellido</span>}
                <Link to="/Iniciar-Sesion">¿Ya tienes cuenta?</Link>
                <button>Registrarse</button>
                {message && <p>{message}</p>}
            </form>
        </div>
  )
}
