import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "./Context/AuthContext";
import { useCarritoContext } from "../Context/CarritoContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { totalProductos } = useCarritoContext(); // Ahora usamos totalProductos
  const { isLoggedIn, isAdmin, logout } = useAuthContext();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200">Mi Tienda</Link>
        </h1>

        {/* Botón menú mobile */}
        <button
          className="sm:hidden text-white"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navegación */}
        <nav className={`flex-col sm:flex sm:flex-row sm:items-center sm:gap-6 absolute sm:static top-16 left-0 w-full sm:w-auto bg-blue-600 sm:bg-transparent transition-all duration-300 ${menuAbierto ? "flex" : "hidden"}`}>
          <Link to="/" className="block px-4 py-2 hover:text-gray-200">Inicio</Link>
          <Link to="/productos" className="block px-4 py-2 hover:text-gray-200">Productos</Link>
          <Link to="/contacto" className="block px-4 py-2 hover:text-gray-200">Contacto</Link>
          {isLoggedIn && isAdmin && (
            <Link to="/admin" className="block px-4 py-2 hover:text-gray-200">Admin</Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 m-2 sm:m-0 border border-white rounded hover:bg-white hover:text-blue-600 transition"
              aria-label="Cerrar sesión"
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 m-2 sm:m-0 border border-white rounded hover:bg-white hover:text-blue-600 transition"
              aria-label="Iniciar sesión"
            >
              Iniciar Sesión
            </Link>
          )}
          <Link
            to="/carrito"
            className="flex items-center gap-1 px-4 py-2 hover:text-gray-200"
            aria-label={`Ir al carrito, ${totalProductos} productos`}
          >
            <FaShoppingCart />
            <span className="bg-red-500 text-white rounded-full px-2 text-sm">{totalProductos}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
