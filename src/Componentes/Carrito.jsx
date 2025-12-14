import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

const Carrito = () => {
    const {
        carrito,
        eliminarDelCarrito,
        vaciarCarrito,
        totalProductos,
        totalPrecio
    } = useContext(CarritoContext);

    if (carrito.length === 0) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>🛒 El carrito está vacío</h2>
                <p>Agregá productos para comenzar tu compra.</p>
            </div>
        );
    }

    const confirmarVaciar = () => {
        if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
            vaciarCarrito();
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Carrito de compras</h2>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {carrito.map((producto, index) => (
                    <li
                        key={index}
                        style={{
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                            padding: '10px',
                            borderRadius: '6px'
                        }}
                    >
                        {/* Imagen del producto */}
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            style={{
                                width: '90px',
                                height: '90px',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            }}
                        />

                        <div>
                            <h4>{producto.nombre}</h4>
                            <p>{producto.descripcion}</p>
                            <p>Precio unitario: ${producto.precio}</p>
                            <p>Cantidad: {producto.cantidad}</p>
                            <p>
                                <strong>
                                    Subtotal: ${producto.precio * producto.cantidad}
                                </strong>
                            </p>

                            <button onClick={() => eliminarDelCarrito(index)}>
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <hr />

            <p><strong>Total de productos:</strong> {totalProductos}</p>
            <p><strong>Total a pagar:</strong> ${totalPrecio}</p>

            <button onClick={confirmarVaciar}>
                Vaciar carrito
            </button>
        </div>
    );
};

export default Carrito;
