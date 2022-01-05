import { useEffect, useState } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"

const Layout = () => {

    const [oscuro, setOscuro] = useState(false)
    const location = useLocation()
    const urlActual = location.pathname //me trae la ruta donde estoy parado

    //traigo el tema del LS
    useEffect(() => {
        const temaLS = JSON.parse(localStorage.getItem("tema")) ?? false
        setOscuro(temaLS)
    },[])

    //guardo el tema en LS
    useEffect(() => {
        localStorage.setItem("tema", JSON.stringify(oscuro))
    },[oscuro])

    //cambio el estado del tema a oscuro o claro
    const darkMode = () => {
        if(oscuro) {
            setOscuro(false)
        } else {
            setOscuro(true)
        }
    }

    return (
        <div className={`md:flex md:min-h-screen sm:min-h-screen bg-gray-100 ${oscuro && "dark"}`}>
            <div className="md:w-1/4 bg-blue-900 dark:bg-gray-900 px-5">
                <h2 className="text-white text-4xl font-black text-center">CRM - Clientes</h2>
                <nav className="mt-10 h-3/6">
                    <Link 
                        className={`${urlActual === "/" ? "bg-blue-300 bg-opacity-10 rounded-md  text-white" : "text-white"} text-2xl block p-2 mt-2 hover:text-blue-300`} 
                        to="/">Clientes
                    </Link>
                    <Link 
                        className={`${urlActual === "/nuevo" ? "bg-blue-300 bg-opacity-10 rounded-md  text-white" : "text-white"} text-2xl block p-2 mt-2 hover:text-blue-300`} 
                        to="/nuevo">Nuevos Clientes
                    </Link>
                </nav>

                <div className="h-2/6 relative flex">
                    <input
                        type="button"
                        className={`${oscuro ? "bg-gray-300" : "bg-gray-900 text-white "} w-40 mx-auto p-2 rounded-md cursor-pointer md:absolute my-2  inset-x-0 bottom-0 `}
                        value={`${oscuro ? "Claro" : "Oscuro"}`}
                        onClick={darkMode}
                    />
                </div>
               
            </div>
            <div className="md:w-3/4 p-10 md:h-screen overflow-x-auto dark:bg-gray-800">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout
