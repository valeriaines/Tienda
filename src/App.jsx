import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
// Importaciones de Providers (Ajusta las rutas si son diferentes)
import { AuthProvider } from './Context/AuthContext'; 
import { CarritoProvider } from './Context/CarritoContext'; 
import { ProductoProvider } from './Context/ProductoContext'; 

// Importación de Componentes
import Header from './Componentes/Header.jsx'
import Contacto from './Componentes/Contacto.jsx'
import Inicio from './pages/Inicio.jsx'
import Productos from './Componentes/Productos.jsx'
import Carrito from './Componentes/Carrito.jsx'
import Footer from './Componentes/Footer.jsx'
import Login from './pages/Login.jsx'
import Admin from './Componentes/Admin.jsx'
import Checkout from './pages/Checkout.jsx';
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import RutaProtegida from './Componentes/RutaProtegida.jsx'
import { AnimatePresence } from 'framer-motion';

function App() {
    const location = useLocation()
    
    return (
        
        // 1. Envolver toda la aplicación con los Providers
        <AuthProvider> 
            <CarritoProvider> 
                <ProductoProvider> {/* ProductoProvider envuelve a Admin/GestionProducto */}
                    
                    <Header /> {/* Header necesita Auth y Carrito Context */}

                    <main className="pt-16 relative z-0 min-h-screen">
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route path='/' element={<Inicio />} />
                                <Route path='/contacto' element={<Contacto />} />
                                <Route path='/productos' element={<Productos />} />
                                <Route path='/productos/:id' element={<ProductoDetalle />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/checkout' element={<Checkout />} />
                        
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
                        </AnimatePresence>
                    </main>
                    
                    <Footer /> 

                </ProductoProvider>
            </CarritoProvider>
        </AuthProvider>
    )
}

export default App;