import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
// Importaciones de Providers (Ajusta las rutas si son diferentes)
import { AuthProvider } from './context/AuthContext'; 
import { CarritoProvider } from './context/CarritoContext'; 
import { ProductoProvider } from './context/ProductoContext'; 

// Importación de Componentes
import Header from './Componentes/Header.jsx'
import Contacto from './Componentes/Contacto.jsx'
import Inicio from './pages/Inicio.jsx'
import Productos from './Componentes/Productos.jsx'
import Carrito from './Componentes/Carrito.jsx'
import Footer from './Componentes/Footer.jsx'
import Login from './pages/Login.jsx'
import Admin from './Componentes/Admin.jsx'
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import RutaProtegida from './Componentes/RutaProtegida.jsx'

function App() {
    
    return (
        // 1. Envolver toda la aplicación con los Providers
        <AuthProvider> 
            <CarritoProvider> 
                <ProductoProvider> {/* ProductoProvider envuelve a Admin/GestionProducto */}
                    
                    <Header /> {/* Header necesita Auth y Carrito Context */}

                    <Routes>
                        <Route path='/' element={<Inicio />} />
                        <Route path='/contacto' element={<Contacto />} />
                        <Route path='/productos' element={<Productos />} />
                        <Route path='/productos/:id' element={<ProductoDetalle />} />
                        <Route path='/login' element={<Login />} />
                        
                        {/* Rutas Protegidas */}
                        <Route
                            path='/carrito'
                            element={
                                <RutaProtegida>
                                    <Carrito />
                                </RutaProtegida>
                            }
                        />
                        <Route
                            path='/admin'
                            element={
                                <RutaProtegida requiereAdmin>
                                    <Admin />
                                </RutaProtegida>
                            }
                        />
                    </Routes>
                    
                    <Footer /> 

                </ProductoProvider>
            </CarritoProvider>
        </AuthProvider>
    )
}

export default App;