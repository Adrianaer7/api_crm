import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./layout/Layout"
import EditarCliente from "./paginas/EditarCliente"
import Inicio from "./paginas/Inicio"
import NuevoCliente from "./paginas/NuevoCliente"
import VerCliente from "./paginas/VerCliente"



function App() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}> {/*siempre se va a mostrar el componente layout cuando entremos a /clientes */}
          <Route index element={<Inicio/>}/> {/*cuando vaya a /clientes se va a cargar el componente layout + el componente inicio */}
          <Route path="nuevo" element={<NuevoCliente/>} /> {/*con path añado una ruta a /clientes. Cuando vaya a /clientes/nuevo va a mostrar el componente Layout + NuevoCliente */}
          <Route path="editar/:id" element={<EditarCliente/>} />
          <Route path=":id" element={<VerCliente/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
