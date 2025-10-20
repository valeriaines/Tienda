import { Link } from 'react-router-dom'
const Nav = () => {
    return (
        <nav style={{ backgroundColor: '#333', color: 'white', padding: '10px' }}>
            <ul style={{ 
                listStyleType: 'none', 
                display: 'flex', 
                justifyContent: 'space-around',
                margin: 0,
                padding: 0}}>
                <li>
                    <Link to={"/"} style={{ color: 'white', margin: '10px' }}>Inicio</Link>
                </li>
                <li>
                    <Link to={"/contacto"} style={{ color: 'white', margin: '10px' }}>Contacto</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
