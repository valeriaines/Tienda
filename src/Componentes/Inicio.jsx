import { Link } from 'react-router-dom'

const Inicio = () => {
return (
    <main style={{ padding: '20px' }}>
    <h2>Bienvenido a Mi Tienda</h2>
    <p>Explora nuestros productos y ofertas.</p>
    <p>
        <Link to="/productos">Ver productos</Link>
    </p>
    </main>
)
}

export default Inicio;