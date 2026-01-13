import { Link } from "react-router-dom";
import { Home, ShoppingBag, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-gray-100 border-t border-gray-300 mt-auto"
            >
                <div className="max-w-6xl mx-auto py-6 px-4">
                    
                    {/* Links */}
                    <nav className="flex justify-around sm:justify-center sm:gap-8 mb-4">
                    <Link 
                        to="/" 
                            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition active:scale-95">
                                <Home size={20}/>
                                Inicio
                    </Link>

                    <Link 
                        to="/productos" 
                        className="text-sm font-medium text-gray-600 hover:text-blue-600 transition active:scale-95">
                            <ShoppingBag size={20}/>
                            Productos
                        </Link>

                    <Link 
                        to="/contacto" 
                        className="text-sm font-medium text-gray-600 hover:text-blue-600 transition active:scale-95">
                            <Mail size={20}/>
                            Contacto
                        </Link>
                </nav>
                {/*Divider*/}
                <div className="h-px bg-gray-300 my-4" />

                {/* Texto de copyright */}
                <p className="text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.
                </p>
            </div>
        </motion.footer>
        
    );
};

export default Footer;
