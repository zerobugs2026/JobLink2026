import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './database/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Register from './views/Register';
import Home_User from './views/Home_User';
import PerfilUsuario from './views/PerfilUsuario';
import PerfilEmpresa from './views/PerfilEmpresa';
import EditarPerfil from './views/EditarPerfil';
import University_User from './views/University_User';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      {!isAuthPage && <Toaster richColors position="top-center" />}
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
        <Route path="/university-user" element={
          <ProtectedRoute>
            <University_User />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
