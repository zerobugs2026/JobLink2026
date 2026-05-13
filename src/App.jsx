import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './database/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Register from './views/Register';
import Home_User from './views/Home_User';
import PerfilUsuario from './views/PerfilUsuario';
import PerfilEmpresa from './views/PerfilEmpresa';
import EditarPerfil from './views/EditarPerfil';
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
            <Route path="/home-user" element={
              <ProtectedRoute>
                <Home_User />
              </ProtectedRoute>
            } />
            <Route path="/perfil" element={
              <ProtectedRoute>
                <PerfilUsuario />
              </ProtectedRoute>
            } />
            <Route path="/perfil-empresa" element={
              <ProtectedRoute>
                <PerfilEmpresa />
              </ProtectedRoute>
            } />
            <Route path="/editar-perfil" element={
              <ProtectedRoute>
                <EditarPerfil />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
