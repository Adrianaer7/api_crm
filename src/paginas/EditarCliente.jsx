import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Formulario from "../components/Formulario"
import Spinner from "../components/Spinner"

const server = import.meta.env.VITE_API_URL


const EditarCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    const {id} = useParams()    //extraigo la id

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `${server}/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            setCargando(!cargando)  //esta sintaxis cambia el estado del state al contrario de lo que tiene
        }
        obtenerClienteAPI()
    }, [])

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900 dark:text-blue-300">Editar Cliente</h1>
            <p className="mt-3 dark:text-white ">LLena los siguientes campos para agregar modificar el cliente</p>
            {cargando ? <Spinner/> : !cliente.nombre ? <p className="p-4 font-bold dark:text-white">No existe el cliente a editar</p> : (
                <Formulario
                    cliente={cliente}
                    cargando={cargando}
                />
            )
            }
        </>
    )
}

export default EditarCliente
