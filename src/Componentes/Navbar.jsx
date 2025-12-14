import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout } = useAuthContext();

  return (
    <nav className="bg-gray-100 shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo o Nombre de la Tienda */}
        <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
          MiTienda
        </Link>

        {/* Menú */}
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="text-gray-900 font-medium hover:text-blue-600">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos" className="text-gray-900 font-medium hover:text-blue-600">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="text-gray-900 font-medium hover:text-blue-600">
              Contacto
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              {isAdmin && (
                <li>
                  <Link
                    to="/admin"
                    className="text-gray-900 font-medium hover:text-blue-600"
                  >
                    Administración
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={logout}
                  className="text-gray-900 font-medium hover:text-blue-600"
                >
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="text-gray-900 font-medium hover:text-blue-600">
                Iniciar Sesión
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
