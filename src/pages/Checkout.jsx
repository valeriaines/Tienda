import { useContext, useEffect, useState } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../Componentes/PagesWrapper";

const Checkout = () => {
  const { carrito, totalPrecio, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const [compraConfirmada, setCompraConfirmada] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [animarSalida, setAnimarSalida] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.telefono) {
      alert("Completá todos los campos");
      return;
    }

    setProcesando(true);
    setAnimarSalida(true);

    setTimeout(() => {
      setCompraConfirmada(true);
      vaciarCarrito();
      setProcesando(false);
    }, 500);
  };

  // 🔁 Redirección automática luego de confirmar compra
  useEffect(() => {
    if (compraConfirmada) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [compraConfirmada, navigate]);

  // 🟢 Compra finalizada
  if (compraConfirmada) {
    return (
      <PageWrapper>
        <div className="
          max-w-xl mx-auto mt-16 p-6 bg-white rounded shadow text-center
          animate-fadeIn
        ">
          <div className="text-5xl mb-4 animate-bounce">🎉</div>

          <h2 className="text-2xl font-bold mb-4">
            ¡Compra realizada!
          </h2>

          <p className="mb-6">
            Gracias <strong>{form.nombre}</strong>, tu pedido fue confirmado.
          </p>

          <Link
            to="/"
            className="
              inline-block px-6 py-2 bg-blue-600 text-white rounded
              transition-all duration-300
              hover:bg-blue-700 hover:scale-105
            "
          >
            Volver al inicio
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div
        className={`
          max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow
          transition-all duration-500 ease-in-out
          ${animarSalida
            ? "opacity-0 scale-95 -translate-y-4"
            : "opacity-100 scale-100 translate-y-0"}
        `}
      >
        <h2 className="text-2xl font-bold mb-6">🧾 Checkout</h2>

        {/* Resumen */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Resumen de compra</h3>

          <ul className="space-y-2">
            {carrito.map((producto) => (
              <li key={producto.id} className="flex justify-between text-sm">
                <span>
                  {producto.nombre} x {producto.cantidad}
                </span>
                <span>
                  ${(producto.precio * producto.cantidad).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-bold border-t pt-4 mt-4">
            <span>Total</span>
            <span>${totalPrecio.toFixed(2)}</span>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-semibold">Datos del comprador</h3>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <button
            type="submit"
            disabled={procesando}
            className={`
              w-full py-2 rounded font-semibold
              transition-all duration-300
              ${
                procesando
                  ? "bg-gray-400 cursor-not-allowed scale-95"
                  : "bg-green-600 text-white hover:bg-green-700 hover:scale-[1.02] active:scale-95"
              }
            `}
          >
            {procesando ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Procesando...
              </span>
            ) : (
              "Confirmar compra"
            )}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default Checkout;
