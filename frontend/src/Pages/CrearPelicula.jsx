import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "../api/supabaseClient";

export function CrearPelicula() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);
  const [imagenFile, setImagenFile] = useState(null);

  const opcionesGenero = ["Acción", "Drama", "Comedia", "Terror", "Fantasía"];
  const opcionesClasificacion = ["G", "PG", "PG-13", "R", "NC-17"];

  const onSubmit = handleSubmit(async (data) => {
    if (!imagenFile) {
      setMessage("Debes subir una imagen para la película.");
      return;
    }

    try {
      // Subir imagen a Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from("pelicula")
        .upload(`imagenes/${imagenFile.name}`, imagenFile);

      if (uploadError) throw uploadError;

      const imagenUrl = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/pelicula/${imagenFile.name}`;

      // Insertar película en tabla
      const { error: insertError } = await supabase
        .from("pelicula")
        .insert([{
          titulo: data.titulo,
          genero: generosSeleccionados,
          duracion: parseInt(data.duracion),
          clasificacion: data.clasificacion,
          sinopsis: data.sinopsis,
          imagen_url: imagenUrl,
          idioma: data.idioma
        }]);

      if (insertError) throw insertError;

      setMessage("Película creada correctamente ✅");
      reset();
      setGenerosSeleccionados([]);
      setImagenFile(null);

      setTimeout(() => navigate("/admin/peliculas"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Error al crear la película ❌");
    }
  });

  const toggleGenero = (genero) => {
    setGenerosSeleccionados(prev =>
      prev.includes(genero)
        ? prev.filter(g => g !== genero)
        : [...prev, genero]
    );
  };

  return (
    <div className="register-container">
      <h2>Crear Película</h2>
      <form onSubmit={onSubmit} className="form-content">

        <input
          type="text"
          placeholder="Título"
          {...register("titulo", { required: true })}
        />
        {errors.titulo && <span>Obligatorio ingresar el título</span>}

        <div className="multi-select">
          <label>Género (puedes seleccionar varios):</label>
          <div className="opciones-genero">
            {opcionesGenero.map(g => (
              <label key={g}>
                <input
                  type="checkbox"
                  value={g}
                  checked={generosSeleccionados.includes(g)}
                  onChange={() => toggleGenero(g)}
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <input
          type="number"
          placeholder="Duración (minutos)"
          {...register("duracion", { required: true })}
        />
        {errors.duracion && <span>Obligatorio ingresar la duración</span>}

        <select {...register("clasificacion", { required: true })}>
          <option value="">Selecciona clasificación</option>
          {opcionesClasificacion.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.clasificacion && <span>Obligatorio seleccionar clasificación</span>}

        <textarea
          placeholder="Sinopsis"
          {...register("sinopsis", { required: true })}
        />
        {errors.sinopsis && <span>Obligatorio ingresar la sinopsis</span>}

        <input
          type="text"
          placeholder="Idioma"
          {...register("idioma", { required: true })}
        />
        {errors.idioma && <span>Obligatorio ingresar el idioma</span>}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagenFile(e.target.files[0])}
        />
        {!imagenFile && <span>Debes seleccionar una imagen</span>}

        <button type="submit">Crear Película</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}
