import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch(`https://68f562c46b852b1d6f140202.mockapi.io/productos/${id}`)
            .then((respuesta) => respuesta.json())
            .then((datos) => setProducto(datos))
            .catch((error) => console.error('Error al cargar el producto:', error));
    }, [id]);
    if (!producto) {
        return <p>Cargando detalles del producto...</p>;
    }
    return (
        <div>
            <h2>{producto.nombre}</h2>
            <p>Precio: ${producto.precio}</p>
            <p>Descripción: {producto.descripcion}</p>
        </div>
    );
};

export default ProductoDetalle;