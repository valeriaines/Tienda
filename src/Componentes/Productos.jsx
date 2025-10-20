import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

const Productos =({agregarProducto} = {}) => {
    const [productos, setProductos] = useState([]);
    const[cargando, setCargando] = useState(true);
    const[error, setError] = useState(null);
    useEffect(() => {
        // Simulamos una llamada a una API para obtener los productos
        fetch('https://68f562c46b852b1d6f140202.mockapi.io/productos')
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setProductos(datos);
                setCargando(false);
            })
            .catch((error) => {
                setError('Error al cargar los productos');
                setCargando(false);
            });
    }, []);
    if (cargando) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <h2>Lista de Productos</h2>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>Producto :
                        {producto.nombre} - {producto.precio}$
                        <img src={producto.imagen} alt={producto.nombre} />
                        <button onClick={()=>agregarProducto(producto)}>Agregar al carrito</button>
                        <Link to={`/producto/${producto.id}`}>Ver detalles</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Productos;
