import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const RutaProtegida = ({ children, requiereAdmin = false }) => {
    const { isLoggedIn, isAdmin } = useAuthContext();

    // 1. No logueado → login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // 2. Ruta admin y no es admin → inicio
    if (requiereAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    // 3. Acceso permitido
    return children;
};

export default RutaProtegida;
