import { useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient";

export function PeliculasAdmin() {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculasFiltradas, setPeliculasFiltradas] = useState([]);

  // Buscador
  const [busqueda, setBusqueda] = useState("");

  // Filtros
  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [filtroClasificacion, setFiltroClasificacion] = useState("todos");

  // Paginación
  const [pagina, setPagina] = useState(1);
  const porPagina = 8;

  // Modal Edición/Eliminar
  const [modalEditar, setModalEditar] = useState(null);
  const [modalEliminar, setModalEliminar] = useState(null);

  useEffect(() => {
    cargarPeliculas();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [peliculas, busqueda, filtroGenero, filtroClasificacion]);

  async function cargarPeliculas() {
    const { data, error } = await supabase.from("pelicula").select("*");
    if (error) return console.error(error);
    setPeliculas(data);
  }

  function aplicarFiltros() {
    let filtradas = [...peliculas];

    if (busqueda.trim() !== "") {
      filtradas = filtradas.filter((p) =>
        p.titulo.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (filtroGenero !== "todos") {
      filtradas = filtradas.filter((p) => p.genero.includes(filtroGenero));
    }

    if (filtroClasificacion !== "todos") {
      filtradas = filtradas.filter(
        (p) => p.clasificacion === filtroClasificacion
      );
    }

    setPeliculasFiltradas(filtradas);
    setPagina(1);
  }

  // Calcular páginas
  const inicio = (pagina - 1) * porPagina;
  const peliculasPagina = peliculasFiltradas.slice(inicio, inicio + porPagina);
  const totalPaginas = Math.ceil(peliculasFiltradas.length / porPagina);

  return (
    <>
      <style>{`
        .admin-container {
          padding: 30px;
          margin-top: 70px;
        }

        .header-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 20px;
        }

        .search-input {
          padding: 10px;
          width: 250px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .filtros {
          display: flex;
          gap: 15px;
        }

        select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .lista-peliculas {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
        }

        .card {
          width: 230px;
          background: #fff;
          padding: 12px;
          border-radius: 10px;
          box-shadow: 0px 2px 8px rgba(0,0,0,0.15);
          transition: all 0.25s ease;
        }

        .card:hover {
          transform: scale(1.05);
          box-shadow: 0px 4px 12px rgba(0,0,0,0.25);
        }

        .card img {
          width: 100%;
          height: 330px;
          object-fit: cover;
          border-radius: 8px;
        }
        .card h3,
        .card p {
            color: #000; 
            }

        .acciones {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }

        .btn-edit {
          background: #f1c40f;
          padding: 6px 10px;
          border-radius: 6px;
        }

        .btn-delete {
          background: #e74c3c;
          padding: 6px 10px;
          color: white;
          border-radius: 6px;
        }

        .fab-button {
          position: fixed;
          bottom: 25px;
          right: 25px;
          background: #4a90e2;
          color: white;
          padding: 18px;
          border-radius: 50%;
          font-size: 22px;
          cursor: pointer;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.3);
        }

        .paginacion {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .paginacion button {
          padding: 8px 12px;
          border-radius: 6px;
        }

        .modal-fondo {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background: white;
          padding: 25px;
          border-radius: 12px;
          width: 350px;
        }
      }.card h3, .card p {
  color: #000;
}

.card p {
  color: #000;
}`}

</style>

      <div className="admin-container">
        <div className="header-controls">
          <input
            className="search-input"
            placeholder="Buscar película..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <div className="filtros">
            <select onChange={(e) => setFiltroGenero(e.target.value)}>
              <option value="todos">Todos los géneros</option>
              <option value="Accion">Acción</option>
              <option value="Drama">Drama</option>
              <option value="Comedia">Comedia</option>
              <option value="Terror">Terror</option>
              <option value="Fantasía">Fantasía</option>
            </select>

            <select
              onChange={(e) => setFiltroClasificacion(e.target.value)}
            >
              <option value="todos">Todas las clasificaciones</option>
              <option value="R">R</option>
              <option value="PG-13">PG-13</option>
            </select>
          </div>
        </div>

        {/* Lista */}
        <div className="lista-peliculas">
          {peliculasPagina.map((p) => (
            <div className="card" key={p.id_pelicula}>
              <img src={p.imagen_url} alt={p.titulo} />
              <h3>{p.titulo}</h3>
              <p>Género: {p.genero.join(", ")}</p>
              <p>{p.duracion} min</p>

              <div className="acciones">
                <button className="btn-edit" onClick={() => setModalEditar(p)}>
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => setModalEliminar(p)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="paginacion">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => setPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Botón flotante */}
      <a href="/crear-pelicula" className="fab-button">+</a>

      {/* Modal eliminar */}
      {modalEliminar && (
        <div className="modal-fondo" onClick={() => setModalEliminar(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Eliminar "{modalEliminar.titulo}"?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <button className="btn-delete">Eliminar</button>
          </div>
        </div>
      )}

      {/* Modal editar (solo estructura) */}
      {modalEditar && (
        <div className="modal-fondo" onClick={() => setModalEditar(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Editar película</h3>
            <p>Pronto aquí irá el formulario completo</p>
            <button className="btn-edit">Guardar</button>
          </div>
        </div>
      )}
    </>
  );
}
