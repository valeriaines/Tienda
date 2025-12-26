import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarritoContext } from "../Context/CarritoContext";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarritoContext();

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`https://68f562c46b852b1d6f140202.mockapi.io/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data));
  }, [id]);

  if (!producto) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded shadow">

      <h2 className="text-2xl font-bold mb-4 text-center">
        {producto.nombre}
      </h2>

      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-64 h-64 object-cover mx-auto mb-4 rounded"
      />

      <p className="mb-2"><strong>Precio:</strong> ${producto.precio}</p>
      <p className="mb-4"><strong>Descripción:</strong> {producto.descripcion}</p>

      <button
        onClick={() => agregarAlCarrito(producto)}
        className="w-full mb-3 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Agregar al carrito
      </button>

      <button
        onClick={() => navigate("/productos")}
        className="w-full px-4 py-2 bg-gray-200 rounded"
      >
        ← Volver a productos
      </button>
    </div>
  );
};

export default ProductoDetalle;
