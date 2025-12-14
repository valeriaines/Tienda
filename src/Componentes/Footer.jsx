const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-600 border-t border-gray-300 mt-auto">
            <div className="max-w-6xl mx-auto py-6 px-4 text-center">
                {/* Opcional: enlaces de navegación o redes sociales */}
                <div className="mb-4 space-x-4">
                    <a href="/" className="hover:text-blue-600 transition">Inicio</a>
                    <a href="/productos" className="hover:text-blue-600 transition">Productos</a>
                    <a href="/contacto" className="hover:text-blue-600 transition">Contacto</a>
                </div>

                {/* Texto de copyright */}
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
