import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../api/supabaseClient";

export function FuncionPage() {
    const [salas, setSalas] = useState([]);
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        async function loadsalas() {
            const { data, error } = await supabase.from("sala").select("*");
            if (error) return console.error(error);
            setSalas(data);
        }
        loadsalas();
    }, [])

    console.log(salas);

    const onSubmit = handleSubmit((data) => { 
        console.log("Funcion creada correctamente", data);
    })

  return (
    <div className="register-container">
        <form onSubmit={onSubmit}>
            <input type="date" placeholder="Fecha"
            {...register('fecha', { required: true })}
            />
            {errors.date && <span>La fecha es obligatoria</span>}
            <input type="time" 
            {...register('hora', { required: true })}
            />
            <select>
                <option value="">Seleccione una sala</option> 
            </select>
            <button>Crear funcion</button>
        </form>
    </div>
  )
}
