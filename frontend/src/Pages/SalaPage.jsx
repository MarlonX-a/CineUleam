import { useForm } from "react-hook-form"
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";

export function SalaPage() {
    const {
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = handleSubmit( async (data) =>{
        try {
         const { error: insertError} = await supabase
         .from("sala")
         .insert([{
            nombre: data.nombre,
            capacidad: data.capacidad,
            ubicacion: data.ubicacion
         }])
         if (insertError) throw insertError;
         alert("Sala creada correctamente");   
         navigate("/")
        } catch (err) {
            console.error(err);
        }
    })



  return (
    <div className="register-container">
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Nombre" 
            {...register('nombre', { required: true })}
            />
            {errors.nombre && <span>Este campo es Obligatorio</span> }
            <input type="number" placeholder="Capacidad" 
            {...register('capacidad', { required: true })}
            />
            {errors.capacidad && <span>La capacidad Es Obligatoria</span>}

            <input type="text" placeholder="Ubicacion" 
            {...register('ubicacion', { required: true })}
            />
            {errors.ubicacion && <span>La ubicación es Obligatoria</span>}
            <button>Guardar Sala</button>
        </form>
    </div>
  )
}
