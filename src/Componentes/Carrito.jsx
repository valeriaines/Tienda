import { useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import { Link } from "react-router-dom";

const Carrito = () => {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    totalProductos,
    totalPrecio,
  } = useContext(CarritoContext);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* 🔙 Volver */}
      <Link
        to="/productos"
        className="inline-block mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
      >
        ← Volver a productos
      </Link>

      <h2 className="text-2xl font-bold mb-6 text-center">
        🛒 Carrito de compras
      </h2>

      {/* 🟡 Carrito vacío */}
      {carrito.length === 0 ? (
        <p className="text-center text-gray-500">
          El carrito está vacío. Agregá productos para comenzar tu compra.
        </p>
      ) : (
        <>
          {/* 📦 Productos */}
          <ul className="space-y-4">
            {carrito.map((producto, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-lg shadow"
              >
                {/* Imagen */}
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-24 h-24 object-cover rounded"
                />

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-semibold text-lg">
                    {producto.nombre}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {producto.descripcion}
                  </p>
                  <p className="mt-1">Precio: ${producto.precio}</p>
                  <p>Cantidad: {producto.cantidad}</p>
                  <p className="font-semibold mt-1">
                    Subtotal: ${producto.precio * producto.cantidad}
                  </p>
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={() => eliminarDelCarrito(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          {/* 📊 Resumen */}
          <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow">
            <p className="text-lg">
              <strong>Total de productos:</strong> {totalProductos}
            </p>
            <p className="text-xl font-bold mt-2">
              Total a pagar: ${totalPrecio}
            </p>

            <button
              onClick={() => {
                if (confirm("¿Vaciar carrito?")) vaciarCarrito();
              }}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
