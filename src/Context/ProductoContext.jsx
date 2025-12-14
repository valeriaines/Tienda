import { createContext, useContext, useState, useEffect } from "react";

export const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "https://68f562c46b852b1d6f140202.mockapi.io/productos";

  // Traer productos desde MockAPI
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Agregar producto a MockAPI
  const agregarProducto = async (producto) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      const data = await response.json();
      setProductos([...productos, data]);
    } catch (err) {
      console.error(err);
    }
  };

  // Editar producto
  const editarProducto = async (productoEditado) => {
    try {
      const response = await fetch(`${apiUrl}/${productoEditado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoEditado),
      });
      const data = await response.json();
      setProductos(productos.map(p => (p.id === data.id ? data : p)));
    } catch (err) {
      console.error(err);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProductoContext.Provider value={{
      productos,
      loading,
      error,
      agregarProducto,
      editarProducto,
      eliminarProducto
    }}>
      {children}
    </ProductoContext.Provider>
  );
};

export const useProductoContext = () => useContext(ProductoContext);
