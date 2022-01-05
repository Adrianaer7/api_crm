import { useNavigate } from "react-router-dom"

const Cliente = ({cliente, handleEliminar}) => {

    const navigate = useNavigate()

    const {nombre, empresa, email, telefono, id} = cliente

    return (
        <tr className="border-b dark:border-none hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="p-3 dark:text-gray-50 ">{nombre}</td>
            <td className="p-3">
                <p className="dark:text-gray-50"><span className="text-gray-800 dark:text-white uppercase font-bold ">Email:</span> {email}</p>
                <p className="dark:text-gray-50"><span className="text-gray-800 dark:text-white uppercase font-bold">Tel:</span> {telefono}</p>
            </td>
            <td className="p-3 text-center dark:text-gray-50">{empresa}</td>
            <td className="p-3 flex mt-2">
                <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700  w-3/4 text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                    onClick={() => navigate(`/${id}`)}
                >
                    Ver
                </button>
                <button
                    type="button"
                    className="bg-green-600 hover:bg-green-700  w-3/4 text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                    onClick={() => navigate(`/editar/${id}`)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700  w-3/4 text-white p-2 uppercase font-bold text-xs mr-3 rounded-md"
                    onClick={() => handleEliminar(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Cliente
