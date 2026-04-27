import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './database/AuthContext.jsx';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Register from './views/Register';
import PerfilUsuario from './views/PerfilUsuario';
import PerfilEmpresa from './views/PerfilEmpresa';
import EditarPerfil from './views/EditarPerfil';
import './styles/Inicio.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
            <Route path="/perfil-empresa" element={<PerfilEmpresa />} />
            <Route path="/editar-perfil" element={<EditarPerfil />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
