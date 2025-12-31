import { Link } from "react-router-dom";
import { useState } from "react";
import { useProductoContext } from "../Context/ProductoContext";
import { useCarritoContext } from "../Context/CarritoContext";
import PageWrapper from "./PagesWrapper";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // tiempo entre cards
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    },
    visible: {
      opacity: 1,
      y:0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  const pageVaiants = {
    initial: { opacity: 0, y: 20 },
    animate:{ opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

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
        <AnimatePresence mode="wait">
        <motion.div 
          key={paginaActual}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.35, ease: "easeOut"}}
          >
          {productosPaginados.map((producto) => (
            <motion.div 
              key={producto.id} 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="
                group bg-white p-4 rounded-lg shadow
                transition-all duration-300 ease-out
                hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
              "
            >
              <h2 className="text-2xl font-bold mb-2 animate-fadeIn">{producto.nombre}</h2>

              <p className="text-xl font-semibold mb-6">
                Precio: ${producto.precio}
                </p>

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
                  hover:underline
                  "
              >
                Ver detalles
              </Link>

              {/* Botón agregar al carrito */}

              <button
                onClick={() => agregarAlCarrito(producto)}
                className="
                  w-full px-4 py-2 bg-blue-600 text-white rounded 
                  hover:bg-blue-700 transition
                  active:scale-95"
              >
                Agregar al carrito
              </button>
              
            </motion.div>
          ))}
        </motion.div>
     </AnimatePresence>
      )}

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPaginas }, (_, i) => {
            const isActive = paginaActual === i + 1;

            return (

             <motion.button
              key={i}
              onClick={() => setPaginaActual(i + 1)}
              animate={{
                scale: isActive ? 1.15 : 1,
                backgroundColor: isActive ? "#2563eb" : "#e5e7eb",
                color: isActive ? "#ffffff" : "#374151",
                boxShadow: isActive
                  ? "0px 6px 14px rgba(37, 99, 235, 0.35)"
                  : "0px 0px 0px rgba(0,0,0,0)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20}}
              className="px-3 py-1 rounded font-medium"
            >
              {i + 1}
            </motion.button>
            );
})}
        </div>
      )}
    </div>
    </PageWrapper>
  );
  

};

export default Productos;
