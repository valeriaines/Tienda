import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario")) || null;
  const [usuario, setUsuario] = useState(usuarioGuardado);

  const login = ({ usuario: nombreUsuario, password }) => {
    let rol = null;

    if (nombreUsuario === "admin" && password === "admin123") {
      rol = "admin";
    } else if (nombreUsuario === "user" && password === "user123") {
      rol = "user";
    } else {
      return false;
    }

    const usuarioData = { usuario: nombreUsuario, rol };
    setUsuario(usuarioData);
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
    return true;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const isLoggedIn = !!usuario;
  const isAdmin = usuario?.rol === "admin";

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
