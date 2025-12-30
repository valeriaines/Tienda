import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { useCarritoContext } from "../Context/CarritoContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { totalProductos } = useCarritoContext();
  const { isLoggedIn, isAdmin, logout } = useAuthContext();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [animarCarrito, setAnimarCarrito] = useState(false);
  
  useEffect(() => {
    if (totalProductos === 0) return;

      setAnimarCarrito(true);

      const timer = setTimeout(() => setAnimarCarrito(false), 300);

    return () => clearTimeout(timer);
  }, [totalProductos]);


  const cerrarMenu = () => setMenuAbierto(false);

  const handleLogout = () => {
    logout();
    cerrarMenu();
    navigate("/");

  };

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold whitespace-nowrap">
          <Link to="/" onClick={cerrarMenu}>
            Mi Tienda
          </Link>
        </h1>

        {/* Botón hamburguesa (SOLO MOBILE) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menú desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-gray-200">Inicio</Link>
          <Link to="/productos" className="hover:text-gray-200">Productos</Link>
          <Link to="/contacto" className="hover:text-gray-200">Contacto</Link>

          {isLoggedIn && isAdmin && (
            <Link to="/admin" className="hover:text-gray-200">Admin</Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="h-10 px-4 border border-white rounded hover:bg-white hover:text-blue-600 transition"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="h-10 px-4 flex items-center border border-white rounded hover:bg-white hover:text-blue-600 transition"
            >
              Iniciar sesión
            </Link>
          )}

          <Link to="/carrito" className="relative flex items-center gap-2">
            <FaShoppingCart 
              className={`text-xl transition-transform duration-300
                ${animarCarrito ? "scale-125 rotate-[-10deg]" : "scale-100"}
                `}
            />
            {totalProductos > 0 && (
            <span 
              className={`absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 text-xs
                transition-all duration-300
                ${animarCarrito ? "scale-110" : "scale-100"}
            `}
            >
              {totalProductos}
            </span>
            )}
          </Link>
        </nav>
      </div>

      {/* Menú MOBILE desplegable */}
      {menuAbierto && (
        <div className="md:hidden bg-blue-600 px-4 pb-4 flex flex-col gap-3">
          <Link to="/" onClick={cerrarMenu}>Inicio</Link>
          <Link to="/productos" onClick={cerrarMenu}>Productos</Link>
          <Link to="/contacto" onClick={cerrarMenu}>Contacto</Link>

          {isLoggedIn && isAdmin && (
            <Link to="/admin" onClick={cerrarMenu}>Admin</Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="mx-4 sm:mx-0 px-3 py-2 border border-white rounded
              whitespace-nowrap text-sm
              flex-shrink-0
              hover:bg-white hover:text-blue-600 transition"
              aria-label="Cerrar sesión"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              onClick={cerrarMenu}
              className="mx-4 sm:mx-0 px-3 py-2 border border-white rounded
              whitespace-nowrap text-sm
              flex-shrink-0
              hover:bg-white hover:text-blue-600 transition"
            >
              Iniciar sesión
            </Link>
          )}

          <Link
            to="/carrito"
            onClick={cerrarMenu}
            className="relative flex items-center gap-2"
          >
            <FaShoppingCart 
              className={`text-xl transition-transform duration-300
                ${animarCarrito ? "scale-125 rotate-[-10deg]" : "scale-100"}
                `}
            />
            {totalProductos > 0 && (

            <span 
              className={`absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 text-xs
                transition-all duration-300
                ${animarCarrito ? "scale-110" : "scale-100"}
              `}
              >
              {totalProductos}
            </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
