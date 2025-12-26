import { useContext, useState } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import { Link } from "react-router-dom";

const Carrito = () => {
  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
    totalProductos,
    totalPrecio,
  } = useContext(CarritoContext);

  const [eliminandoId, setEliminandoId] = useState(null);
  const [agregandoId, setAgregandoId] = useState(null);

  // 🟡 Carrito vacío
  if (carrito.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">🛒 Carrito</h2>
        <p className="text-gray-600 mb-6">
          El carrito está vacío. Agregá productos para comenzar tu compra.
        </p>
        <Link
          to="/productos"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Volver a productos
        </Link>
      </div>
    );
  }

  const confirmarVaciar = () => {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
      vaciarCarrito();
    }
  };

  const handleEliminar = (id) => {
    setEliminandoId(id);
    setTimeout(() => {
      eliminarDelCarrito(id);
      setEliminandoId(null);
    }, 250);
  };

  const handleAgregar = (producto) => {
    setAgregandoId(producto.id);
    agregarAlCarrito(producto);
    setTimeout(() => setAgregandoId(null), 300);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">🛒 Carrito de compras</h2>

      <div className="space-y-4">
        {carrito.map((producto) => (
          <div
            key={producto.id}
            className={`flex flex-col sm:flex-row gap-4 items-center border rounded-lg p-4 shadow-sm
              transition-all duration-300 ease-in-out
              hover:scale-[1.01] hover:shadow-md
              ${
                eliminandoId === producto.id
                  ? "opacity-0 scale-95 -translate-x-4"
                  : agregandoId === producto.id
                  ? "ring-2 ring-green-400 scale-[1.02]"
                  : ""
              }`}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h4 className="font-semibold text-lg">{producto.nombre}</h4>
              <p className="text-gray-600 text-sm mb-1">
                {producto.descripcion}
              </p>
              <p className="text-sm">
                Precio: ${Number(producto.precio).toFixed(2)}
              </p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => handleEliminar(producto.id)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded
                    transition-all duration-200
                    hover:bg-red-200 hover:scale-110 active:scale-95"
                >
                  −
                </button>

                <span
                  key={producto.cantidad}
                  className="font-semibold animate-pulse"
                >
                  {producto.cantidad}
                </span>

                <button
                  onClick={() => handleAgregar(producto)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded
                    transition-all duration-200
                    hover:bg-green-200 hover:scale-110 active:scale-95"
                >
                  +
                </button>
              </div>

              <p className="font-semibold mt-2">
                Subtotal: ${(producto.precio * producto.cantidad).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">🧾 Resumen de compra</h3>

        <div className="flex justify-between mb-2">
          <span>Total de productos</span>
          <span className="font-medium">{totalProductos}</span>
        </div>

        <div className="flex justify-between text-xl font-bold border-t pt-4 mt-4">
          <span>Total a pagar</span>
          <span>${totalPrecio.toFixed(2)}</span>
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={confirmarVaciar}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Vaciar carrito
        </button>

        <Link
          to="/checkout"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Finalizar compra
        </Link>

        <Link
          to="/productos"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
        >
          ← Seguir comprando
        </Link>
      </div>
    </div>
  );
};

export default Carrito;
