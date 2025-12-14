import { useState } from "react";
import { useProductoContext } from "./Context/ProductoContext";
import { useCarritoContext } from "./Context/CarritoContext";

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
    <div className="max-w-6xl mx-auto mt-10 p-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosPaginados.map((producto) => (
            <div key={producto.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{producto.nombre}</h3>
              <p className="text-gray-700 mb-2">Precio: ${producto.precio}</p>
              {producto.imagen && (
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
              )}
              <button
                onClick={() => agregarAlCarrito(producto)}
                className="px-4 py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
  );
};

export default Productos;
