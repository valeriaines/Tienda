import { useState, useEffect } from 'react';

const EditarProducto = ({ productoSeleccionado, onActualizar }) => {
    
    const [producto, setProducto] = useState(productoSeleccionado || {
        nombre: "",
        precio: "",
        imagen: "",
        descripcion: ""
    }); 

    const API = 'https://68f562c46b852b1d6f140202.mockapi.io/productos';

    useEffect(() => {
        if (productoSeleccionado) 
            setProducto(productoSeleccionado);
            
    }, [productoSeleccionado]);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setProducto({...producto,[name]:value});
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        try {
            const respuesta = await fetch(`${API}/${producto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
            },
                body: JSON.stringify(producto),
            });
            if (!respuesta.ok) {
                throw new Error('Error al actualizar el producto');
            }

            const datosActualizados = await respuesta.json();
            onActualizar(datosActualizados);
            alert('Producto actualizado con éxito');
        } catch (error) {
            console.error(error.message);
            alert('Error al actualizar el producto');
        }
    };

    return (
        <form onSubmit={manejarEnvio}>
            <h2>Editar Producto</h2>
            <div>
                <label>Nombre</label>
                <br/>
                <input
                type="text"
                name="nombre"
                value={producto.nombre || ''}
                onChange={manejarCambio}
                required
                />
            </div>
                <label>Precio:</label>
                <br/>
                <input
                type="number"
                name="precio"
                value={producto.precio || ''}
                onChange={manejarCambio}
                required
                min='0'
                step='any'
                />
            <div>
                <label>Imagen URL:</label>
                <br/>
                <input
                type="text"
                name="imagen"
                value={producto.imagen}
                onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Descripción:</label>
                <br/>
                <textarea
                name="descripcion"
                value={producto.descripcion || ''}
                onChange={manejarCambio}
                required
                />
            </div>
            <button type="submit">Actualizar Producto</button>
        </form>
    );
}

export default EditarProducto;
                     