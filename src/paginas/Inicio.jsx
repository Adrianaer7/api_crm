import { useState, useEffect } from "react"
import Cliente from "../components/Cliente"
import Spinner from "../components/Spinner"

const server = import.meta.env.VITE_API_URL

const Inicio = () => {

    const [clientes, setClientes] = useState([])
    const [cargando, setCargando] = useState(true)

    //obtengo la lista de clientes y lo envio al state
    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = server
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setClientes(resultado)
            } catch (error) {
                console.log(error)
            }
            setCargando(!cargando)
        }
        obtenerClientesAPI()
    }, [])

    const handleEliminar = async id => {
        const confirmar = confirm("¿Quieres eliminar este cliente?")
        if(confirmar) {
            try {
                const url = `${server}/${id}`
                const respuesta = await fetch(url, {
                    method: "DELETE"
                })
                await respuesta.json()
                const nuevoArray = clientes.filter(cliente => cliente.id !== id)
                setClientes(nuevoArray)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900 dark:text-blue-300">Listado de clientes</h1>
            <p className="mt-3 dark:text-white ">Administra tus clientes</p>
            {cargando ? <Spinner/>  : Object.keys(clientes).length === 0 ? <p className=" mt-5 font-bold dark:text-white">No hay clientes existentes</p> :(

                <table className="w-full mt-5 table-auto shadow rounded-lg bg-white dark:bg-gray-900 ">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="p-2 rounded-tl-lg">Nombre</th>
                            <th className="p-2">Contacto</th>
                            <th className="p-2">Empresa</th>
                            <th className="p-2 rounded-tr-lg">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                            {clientes.map(cliente => (
                                <Cliente
                                    key={cliente.id}
                                    cliente={cliente}
                                    handleEliminar={handleEliminar}
                                />
                            ))}
                    </tbody>
                </table>
            )}
       </>
    )
}

export default Inicio
