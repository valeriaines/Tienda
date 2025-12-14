import { useState } from "react";
import { useProductoContext } from "./Context/ProductoContext";

const FormProducto = ({ productoInicial, modo, onCerrar }) => {
  const { agregarProducto, editarProducto } = useProductoContext();
  const [nombre, setNombre] = useState(productoInicial?.nombre || "");
  const [precio, setPrecio] = useState(productoInicial?.precio || "");
  const [descripcion, setDescripcion] = useState(productoInicial?.descripcion || "");
  const [imagen, setImagen] = useState(productoInicial?.imagen || "");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    if (Number(precio) <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }
    if (descripcion.trim().length < 10) {
      setError("La descripción debe tener al menos 10 caracteres");
      return;
    }

    const producto = { nombre, precio, descripcion, imagen };

    try {
      if (modo === "agregar") {
        await agregarProducto(producto);
      } else if (modo === "editar") {
        await editarProducto({ ...producto, id: productoInicial.id });
      }
      onCerrar();
    } catch (err) {
      setError("Error al guardar el producto");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        className="bg-white p-6 rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">
          {modo === "agregar" ? "Agregar Producto" : "Editar Producto"}
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL Imagen (opcional)"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCerrar}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProducto;
