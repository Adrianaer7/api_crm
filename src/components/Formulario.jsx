import {Formik, Form, Field} from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import Alerta from "./Alerta"

const Formulario = ({cliente, cargando}) => { //traigo cliente de EditarCliente

    const navigate = useNavigate()

    //Validacion - Lee lo que voy escribiendo y lo valida
    const nuevoClienteSchema = Yup.object().shape({ //shape va a ser la forma que van a tener los datos cuando se crea un cliente
        nombre: Yup.string()
            .min(3, "El nombre es muy corto")
            .max(20, "El nombre es demasiado grande")
            .required("El nombre es obligatorio"),
        empresa: Yup.string()
            .required("El nombre de la empresa es obligatorio"),
        email: Yup.string()
            .email("El email no es valido")
            .required("El correo eletronico es obligatorio"),
        telefono: Yup.number()
            .positive("Numero no válido")
            .integer("Numero no válido")
            .typeError("El numero no es válido"),   //para que no se ingresen caracteres distintos a un numero
            
    })

    //submit
    const handleSubmit = async valores => { //traigo los valores del onSubmit
        try {
            let respuesta   //toma los valores del if o del else
            if(cliente.id) {
                //Editar registro
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url, {    //envia los datos del formulario al server
                    method: "PUT",
                    body: JSON.stringify(valores),
                    headers: {"Content-Type": "application/json"}
                })
            } else {
                //Nuevo registro
                const url = "http://localhost:4000/clientes"
                respuesta = await fetch(url, {    //envia los datos del formulario al server
                    method: "POST",
                    body: JSON.stringify(valores),
                    headers: {"Content-Type": "application/json"}
                })
            }
            await respuesta.json()
            navigate("/clientes")   //luego de enviar los datos, redirecciono al cliente

        } catch (error) {
            console.log(error)
        }
    }

    return (
            <div className='bg-white dark:bg-gray-900 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 dark:text-white font-bold text-xl uppercase text-center'>{cliente.nombre ? "Editar cliente" : "Agregar cliente"}</h1>

                <Formik 
                    initialValues={{    //tomo los valores de los input
                        nombre: cliente?.nombre ?? "", //traigo el dato del cliente si existe, sino, lo inicio como string vacio
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? ""
                    }}
                    enableReinitialize={true}   //muestra el input con los valores del initialValue
                    onSubmit={async (values, {resetForm}) => {  //le paso todos los valores al submit para que lo postee en la bd y reseteo el form
                        await handleSubmit(values)
                        resetForm() //espero a que se complete la funcion de arriba para luego vaciar el formulario
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({errors, touched}) => {   //en errors se almacena el nombre del campo y el msj. Touched es para que al salir de un input vacio, salga la alerta
                        return (
                            <Form className="mt-10">
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="text-gray-800 dark:text-gray-300">Nombre</label>
                                    <Field  //esta etiqueta crea un input
                                        type="text"
                                        autoComplete="off"
                                        className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="nombre"
                                        placeholder="Ingresa tu nombre"
                                        name="nombre"
                                    />
                                    {errors.nombre && touched.nombre ? (    //si sali del input vacio, me muestra la alerta
                                            <Alerta>{errors.nombre}</Alerta>
                                    ): null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="empresa" className="text-gray-800 dark:text-gray-300">Empresa</label>
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="empresa"
                                        placeholder="Ingresa tu empresa"
                                        name="empresa"
                                    />
                                    {errors.empresa && touched.empresa ? (    //si sali del input vacio, me muestra la alerta
                                            <Alerta>{errors.empresa}</Alerta>
                                    ): null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="text-gray-800 dark:text-gray-300">Email</label>
                                    <Field
                                        type="email"
                                        autoComplete="nope"
                                        className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="email"
                                        placeholder="Ingresa tu email"
                                        name="email"
                                    />
                                    {errors.email && touched.email ? (    //si sali del input vacio, me muestra la alerta
                                            <Alerta>{errors.email}</Alerta>
                                    ): null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="telefono" className="text-gray-800 dark:text-gray-300">Telefono</label>
                                    <Field
                                        type="tel"
                                        autoComplete="nope"
                                        className="mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="telefono"
                                        placeholder="Ingresa tu telefono"
                                        name="telefono"
                                    />
                                    {errors.telefono && touched.telefono ? (    //si sali del input vacio, me muestra la alerta
                                            <Alerta>{errors.telefono}</Alerta>
                                    ): null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="notas" className="text-gray-800 dark:text-gray-300">Notas</label>
                                    <Field
                                        as="textarea"   //le especifico que tiene que ser un textarea
                                        type="textarea"
                                        autoComplete="off"
                                        className="mt-2 block w-full p-3 rounded-md h-32 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="notas"
                                        placeholder="Ingresa tu notas"
                                        name="notas"
                                    />
                                    {errors.notas && touched.notas ? (    //si sali del input vacio, me muestra la alerta
                                            <Alerta>{errors.notas}</Alerta>
                                    ): null}
                                </div>
            
                                <input
                                    type="submit"
                                    value={cliente.nombre ? "Editar cliente" : "Agregar cliente"}
                                    className="mt-5 w-full bg-blue-800 dark:bg-blue-500 p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer"
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </div>
    )
}

//formulario para crear nuevo cliente
Formulario.defaultProps = {
    cliente: {}, //incia el formulario vacio a menos que me traiga un cliente
    cargando: false //no muestra el spinner a menos que haya un cliente para editar
}

export default Formulario
