import { useState } from "react";


const Carrito = () => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const agregarProducto = (producto) => {
        setCarrito([...carrito, producto]);
    };

    return (
        <div>
            <h2>Productos en el Carrito</h2>
            <ul>
                {carrito.map((producto) => (
                    <li key={producto.id}>
                        <Producto producto={producto} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Carrito;
