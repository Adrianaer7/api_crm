import Formulario from "../components/Formulario"

const NuevoCliente = () => {
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900 dark:text-blue-300">Nuevo Cliente</h1>
            <p className="mt-3 dark:text-white ">LLena los siguientes campos para agregar un nuevo cliente</p>
            <Formulario/>
        </>
    )
}

export default NuevoCliente
