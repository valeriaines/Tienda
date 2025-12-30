import { Link } from "react-router-dom";
import { useState } from "react";
import { useProductoContext } from "../Context/ProductoContext";
import { useCarritoContext } from "../Context/CarritoContext";
import PageWrapper from "./PagesWrapper";


const Productos = () => {
  
  const { productos } = useProductoContext();
  const { agregarAlCarrito } = useCarritoContext();

  // Estado para búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Estado para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  // Filtrado según búsqueda
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Cálculo de productos a mostrar por página
  const indexUltimo = paginaActual * productosPorPagina;
  const indexPrimero = indexUltimo - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indexPrimero, indexUltimo);

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  return (
    <PageWrapper>
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow animate-enter">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1); // Reiniciar paginación al filtrar
        }}
        className="border rounded px-3 py-2 mb-6 w-full"
      />

      {/* Lista de productos */}
      {productosFiltrados.length === 0 ? (
        <p className="text-center text-gray-500 italic">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {productosPaginados.map((producto) => (
            <div key={producto.id} 
            className="
              group
              bg-white p-4 rounded-lg shadow
              transition-all duration-300 ease-out
              hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
              "
            >
              <h2 className="text-2xl font-bold mb-2 animate-fadeIn">{producto.nombre}</h2>
              <p className="text-xl font-semibold mb-6 animate-fadeIn delay-200">Precio: ${producto.precio}</p>
              <div className="overflow-hidden rounded">
              {producto.imagen && (
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="
                    w-full h-48 object-cover mb-3
                    transition-transform duration-500
                    group-hover:scale-105
                    group-hover:brightness-110
                  "
                />
              
              )}
              </div>
              {/* Boton ver detalle */}
              <Link
                to={`/productos/${producto.id}`}
                className="
                  block text-center text-blue-600 mb-4 
                  transition-all duration-200
                  hover:underline hover:scale-105
                  "
              >
                Ver detalles
              </Link>

              {/* Botón agregar al carrito */}

              <button
                onClick={() => agregarAlCarrito(producto)}
                className="
                  w-full px-4 py-2 bg-blue-600 text-white rounded 
                  transition-all duration-200 
                  hover:bg-blue-700 hover:scale-[1.05]
                  active:scale-95"
              >
                Agregar al carrito
              </button>
              
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => setPaginaActual(i + 1)}
              className={`px-3 py-1 rounded ${
                paginaActual === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
    </PageWrapper>
  );
  

};

export default Productos;
