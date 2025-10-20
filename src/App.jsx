import './App.css'
import { useState } from 'react'
import Header from './Componentes/Header.jsx'
import Nav from './Componentes/Nav.jsx'
import Contacto from './Componentes/Contacto.jsx'
import Inicio from './Componentes/Inicio.jsx'
import Main from './Componentes/Main.jsx'
import Productos from './Componentes/Productos.jsx'
import Carrito from './Componentes/Carrito.jsx'
import Gallery from './Componentes/Gallery.jsx'
import Footer from './Componentes/Footer.jsx'
import{Routes, Route} from 'react-router-dom'


function App() {
  const [carrito, setCarrito] = useState([])

  const agregarProducto = (producto) => {
    setCarrito([...carrito, producto])
  }
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path='/' element={ <Inicio />} />
        <Route path='/contacto' element={ <Contacto />} />
      </Routes>
      <Main />
      <Productos agregarProducto={agregarProducto} />
      <Carrito />
      <Gallery />
      <Footer />
    </>
  )
}

export default App
