import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contacto = () => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');

    const manejarSubmit = (e) => {
        e.preventDefault();

        if (!nombre.trim() || !mensaje.trim()) {
            toast.error("Por favor completa todos los campos.");
            return;
        }

        // Simulación de envío
        toast.success("Mensaje enviado correctamente!");

        // Limpiar campos
        setNombre('');
        setMensaje('');
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6 border-b-2 border-blue-400 pb-2">
                Contáctanos
            </h2>

            <form className="flex flex-col gap-4" onSubmit={manejarSubmit}>
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <textarea
                    placeholder="Tu mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[120px]"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Enviar Mensaje
                </button>
            </form>

            {/* Contenedor del Toast */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Contacto;
