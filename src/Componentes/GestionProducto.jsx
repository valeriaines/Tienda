import { useState } from "react";
import FormProducto from "./FormProducto";
import { useProductoContext } from "../Context/ProductoContext";

const GestionProducto = () => {
  const { productos, eliminarProducto } = useProductoContext();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("agregar");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const abrirFormularioAgregar = () => {
    setModoFormulario("agregar");
    setProductoSeleccionado(null);
    setMostrarForm(true);
  };

  const abrirFormularioEditar = (producto) => {
    setModoFormulario("editar");
    setProductoSeleccionado(producto);
    setMostrarForm(true);
  };

  const cerrarFormulario = () => {
    setMostrarForm(false);
    setProductoSeleccionado(null);
  };

  if (!productos) return <p>Cargando productos...</p>; // Manejo de carga

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold mb-4 sm:mb-0">Gestión de Productos</h2>
        <button
          onClick={abrirFormularioAgregar}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Agregar Producto
        </button>
      </div>

      {productos.length === 0 ? (
        <p className="text-center py-10 text-gray-500 italic">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{producto.nombre}</h3>
                <p className="text-gray-700 mb-2">Precio: ${producto.precio}</p>
                {producto.imagen && (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-48 object-cover mb-2 rounded"
                  />
                )}
                <p className="text-gray-600 text-sm">{producto.descripcion}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => abrirFormularioEditar(producto)}
                  className="px-3 py-1 bg-blue-400 text-gray-800 rounded hover:bg-blue-500 transition"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => eliminarProducto(producto.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  ❌ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {mostrarForm && (
        <FormProducto
          productoInicial={productoSeleccionado}
          modo={modoFormulario}
          onCerrar={cerrarFormulario}
        />
      )}
    </div>
  );
};

export default GestionProducto;
