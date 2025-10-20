const Carrito = ({productosEnCarrito, productosEliminados}) => {
        return (
        <div>
            <h2>Productos en el Carrito</h2>
            {productosEnCarrito.map((producto, indice) => (
                <div key={indice}>
                    <img src={producto.image} alt={producto.nombre} height={80} width={80} />
                    <p>{producto.nombre} : {producto.precio}$</p>
                    <button onClick={() => productosEliminados(indice)}>Eliminar del Carrito</button>
                </div>
            ))}    
                    
        </div>
    );
};

export default Carrito;
