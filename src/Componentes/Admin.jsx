import GestionProducto from "./GestionProducto";
import PageWrapper from "../Componentes/PagesWrapper";
import { useProductoContext } from "../Context/ProductoContext";

const Admin = () => {
    const { productos } = useProductoContext();

    const totalProductos = productos.length;

    const ultimoProducto = 
        productos.length > 0
            ? productos[productos.length - 1].nombre
            : "-";
    const precioPromedio = 
        productos.length > 0
            ? Math.round(
                productos.reduce((acc, p) => acc + Number(p.precio || 0), 0) /
                productos.length
            )
        : 0;

    return(
        <PageWrapper>
            <section className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">

                {/*Encabezado*/}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
                        Panel de Administración
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Gestioná los productos de la tienda
                    </p>

                    {/* Indicadores*/}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

                        <div className="bg-white rounded-lg shadow p-4 sm:p-5 boder-l-4 border-blue-500
                                        transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Total de productos</p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-gray-800">{totalProductos}</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-4 sm:p-5 border-l-4 border-green-500
                                        transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <p className="text-sm text-gray-500">Último producto</p>
                            <p className="text-base sm:text-lg font-semibold line-clamp-1">{ultimoProducto}</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-4 sm:p-5 border-l-4 border-purple-500
                                        transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <p className="text-sm text-gray-500">Precio promedio</p>
                            <p className="text-2xl font-bold">${precioPromedio}</p>
                        </div>
                    </div>
                </header>

                {/* Card contenedora */}
                <div className="mt-10 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4 sm:hidden">
                        Gestión de productos
                    </h2>
                    <GestionProducto />
                </div>

            </section>
        </PageWrapper>
    );
};


export default Admin;