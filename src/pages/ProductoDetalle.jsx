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
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded shadow animate-enter">

      <h2 className="text-3xl font-bold mb-4 text-center animate-fadeIn">
        {producto.nombre}
      </h2>

      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="
          w-72 h-72 object-cover mx-auto mb-6 rounded
          transition-transform duration-500
          hover:scale-105
          animate-fadeIn
          "
      />

      <p className="mb-2 text-lg">
        <strong>Precio:</strong> ${producto.precio}
        </p>
      <p className="mb-6 text-gray-700 leading-relaxed">
        <strong>Descripción:</strong> {producto.descripcion}
        </p>

      <button
        onClick={() => agregarAlCarrito(producto)}
        className="
          w-full mb-4 px-4 py-3 
          bg-green-600 text-white rounded font-semibold
          transition-all duration-200
          hover:bg-green-700 hover:scale-[1.02]
          active:scale-95
          "
      >
        Agregar al carrito
      </button>

      <button
        onClick={() => navigate("/productos")}
        className="
          w-full px-4 py-2 bg-gray-200 rounded 
          transition-all duration-300 
          hover:bg-gray-300 hover:-translate-x-1 hover:shadow-md
          active:scale-95
          "
      >
        ← Volver a productos
      </button>
    </div>
  );
};

export default ProductoDetalle;
