import { Link } from 'react-router-dom'
import PageWrapper from '../Componentes/PagesWrapper';
import { motion } from "framer-motion";

const Inicio = () => {
return (
    <PageWrapper>
        <main className="max-w-5xl mx-auto px-6 py-16">

            {/* HERO */}
            <section className="text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y:0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Bienvenido a mi tienda 🛍️
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-gray-600 text-lg mb-8"
                        >
                            Descubrí productos seleccionados, ofertas exclusivas y una experiencia de compra simple y rápida.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity:1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                <Link 
                                to="/productos"
                                className="
                                    inline-block px-8 py-3 rounded-lg 
                                    bg-blue-600 text-white font-semibold
                                    text-lg font-medium
                                    transition-all duration-300
                                    hover:bg-blue-700 hover:scale-105
                                    active:scale-95
                                    "
                                    >
                                        Ver productos
                                    </Link>
                        </motion.div>
            </section>

            {/* BENEFICIOS */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                    {
                        title: "Compra fácil",
                        text: "Navega, elegí y compra en pocos pasos.",
                    },
                    {
                        title: "Gestión segura",
                        text: "Acceso protegido para usuarios y administradores.",
                    },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity:0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.15 }}
                        className="
                            bg-white rounded-xl shadow
                            p-6
                            transition-all duration-300
                            hover:shadow-lg hover:trnslate-y-1
                            "
                            >
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.text}</p>

                        </motion.div>
                ))}

            </section>
    
    
        </main>
    </PageWrapper>
);
};

export default Inicio;