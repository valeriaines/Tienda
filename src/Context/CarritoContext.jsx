import { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto
export const CarritoContext = createContext();

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarAlCarrito = (productoAAgregar) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(item => item.id === productoAAgregar.id);

      if (existe) {
        // Si ya existe, aumentar la cantidad
        return prevCarrito.map(item =>
          item.id === productoAAgregar.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevCarrito, { ...productoAAgregar, cantidad: 1 }];
      }
    });
  };

  // Eliminar producto por índice
  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((_, indice) => indice !== indiceAEliminar)
    );
  };

  // Vaciar carrito
  const vaciarCarrito = () => setCarrito([]);

  // Total de productos y precio total
  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
  const totalPrecio = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

  // Debug opcional para ver los cambios en el carrito
  useEffect(() => {
    console.log("Carrito actualizado:", carrito);
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        totalProductos,
        totalPrecio
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// Hook personalizado para usar el contexto más fácilmente
export const useCarritoContext = () => useContext(CarritoContext);

export default CarritoContext;
