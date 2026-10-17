import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Bienvenida from "./Bienvenida.jsx";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";

import Register from "./pages/Register.jsx";
import Recovery from "./pages/Recovery.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Cursos from "./pages/Cursos.jsx";
import Borrar from "./pages/Borrar.jsx";
import CursoDetalle from "./pages/CursoDetalle.jsx"; 


function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />    
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/cursos" element={<Cursos />} />

      <Route path="/cursos/:id" element={<CursoDetalle />} />  

      <Route path="/borrar" element={<Borrar />} />

      <Route path="/home" element={<Home />} />
      <Route path="/bienvenida" element={<Bienvenida />} />



    </Routes>
  );
}

export default App;
