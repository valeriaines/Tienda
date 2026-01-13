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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Productos</h2>
        <button
          onClick={abrirFormularioAgregar}
          className="
            flex items-center gap-2
            bg-blue-600 text-white 
            px-5 py-2.5 rounded-lg
            shadow-sm 
            hover:bg-blue-700 hover:shadow-md
            transition 
            w-full sm:w-auto"
        >
          Agregar Producto
        </button>
      </div>

      {productos.length === 0 ? (
        <p className="text-center py-10 text-gray-500 italic">No hay productos disponibles.</p>
      ) : (
        <div className="hidden md:block overflow-x-auto">
          {/* Vista MOBILE - Cards */}
        <div className="md:hidden space-y-4">
          {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
          {/* Nombre + Precio */}
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-800">
              {producto.nombre}
            </h3>
            <span className="font-medium text-blue-600">
              ${producto.precio}
            </span>
          </div>

          {/* Imagen */}
          {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-40 object-cover rounded-md border"
          />
          ) : (
            <p className="text-sm text-gray-400 italic">
              Sin imagen
            </p>
          )}

          {/* Descripción */}
          <p className="text-sm text-gray-600">
            {producto.descripcion}
          </p>

          {/* Acciones */}
          <div className="flex justify-end gap-3 pt-2 border-t">
            <button
              onClick={() => abrirFormularioEditar(producto)}
              className="
                        p-2 rounded-md
                        bg-blue-50 text-blue-700
                        border border-blue-200
                        hover:bg-blue-100
                        transition
                        "
              title="Editar"
            >
          ✏️
            </button>

            <button
              onClick={() => {
                const confirmar = window.confirm(
                  `¿Eliminar "${producto.nombre}"?`
                );
                  if (confirmar) eliminarProducto(producto.id);
              }}
              className="
                        p-2 rounded-md
                        bg-red-50 text-red-700
                        border border-red-200
                        hover:bg-red-100
                        transition
                        "
              title="Eliminar"
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
        {/* Vista DESKTOP - Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left  px-4 py-3">Nombre</th>
                <th className="text-left px-4 py-3">Precio</th>
                <th className="text-left px-4 py-3">Imagen</th>
                <th className="text-left px-4 py-3">Descripción</th>
                <th className="text-left px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
                {productos.map((producto) => (
                  <tr 
                    key={producto.id} 
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* Nombre */}
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {producto.nombre}
                    </td>
                    {/* Precio */}
                    <td className="px-4 py-3 text-gray-700">
                      ${producto.precio}
                    </td>
                    {/* Imagen */}
                    <td className="px-4 py-3">
                      {producto.imagen ? (
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-16 h-16 object-cover rounded-md border"
                          />
                      ) : (
                        <span className="text-gray-400 text-sm">Sin imagen</span>
                      )}
                    </td>
                    {/* Descripción */}
                    <td className="px-4 py-3 max-w-xs">
                      <span
                        title={producto.descripcion}
                        className="block text-sm text-gray-600 truncate cursor-help"
                        >
                          {producto.descripcion}
                        </span>
                    </td>
                    {/*Acciones*/}
                    <td className="px-4 py-3">
                      <div className="flex gap-3 justify-center">
                        {/* Botones */}
                        <button
                          onClick={() => abrirFormularioEditar(producto)}
                          title="Editar producto"
                          className="
                            p-2 rounded-md
                            bg-blue-50 text-blue-700 
                            border border-blue-200 
                            hover:bg-blue-100 hover:border-blue-300
                            active:scale-95 
                            transition"
                        >
                          ✏️ 
                        </button>
                        <button
                          onClick={() => {
                            const confirmar = window.confirm(
                              `¿Seguro que querés eliminar el producto "${producto.nombre}"?`
                            );
                            if (confirmar) eliminarProducto(producto.id);
                          }}
                          className="
                            p-2 rounded-md
                            bg-red-50 text-red-700 
                            border border-red-200 
                            hover:bg-red-100  hover:border-red-300
                            active:scale-95
                            transition"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
          ))}
        </tbody>
      </table>
      </div>
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
