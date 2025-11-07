import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [showPassword, setShowPassword ] = useState(false);

    const onSubmit = handleSubmit((data) =>{
        console.log("datos enviados", data);
    })

  return (
    <div className="register-container">
        <h2>Iniciar Sesion</h2>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="username"
            {...register('username', {required: true })}
            />
            {errors.username && <span>Obligatorio ingresar el nombre de usuario</span>}
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
        </form>
    </div>
  )
}
