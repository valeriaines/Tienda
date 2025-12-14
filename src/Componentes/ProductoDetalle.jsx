import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://68f562c46b852b1d6f140202.mockapi.io/productos/${id}`)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setProducto(datos);
                setCargando(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Error al cargar los detalles del producto.');
                setCargando(false);
            });
    }, [id]);

    if (cargando) return <p className="text-center mt-10">Cargando detalles del producto...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!producto) return <p className="text-center mt-10">Producto no encontrado.</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">{producto.nombre}</h2>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-64 h-64 object-cover rounded"
                />

                <div className="flex-1">
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Precio:</span> ${producto.precio}</p>
                    <p className="text-gray-700"><span className="font-semibold">Descripción:</span> {producto.descripcion}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductoDetalle;
