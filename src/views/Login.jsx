import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../database/firebaseconfig.jsx';
import '../styles/Login.css';

// Iconos SVG inline
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Z"></path>
  </svg>
);

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
    <path d="M224,48H32a16,16,0,0,0-16,16V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16v.85L128,134.15,32,64.85V64ZM32,192V83.15l93.79,68.57a8,8,0,0,0,9.42,0L224,83.15V192Z"></path>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
    <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"></path>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.2-79.93-33.25A133.48,133.48,0,0,1,25,128a133.48,133.48,0,0,1,23.07-30.75C70.33,75.2,97.22,64,128,64s57.67,11.2,79.93,33.25A133.48,133.48,0,0,1,231,128a133.48,133.48,0,0,1-23.07,30.75C185.67,180.8,158.78,192,128,192Zm0-80a16,16,0,1,0,16,16A16,16,0,0,0,128,112Z"></path>
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
    <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.18,123.24,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.38,52.15,19.16,21.11C108,108.59,104,113.42,104,120a24,24,0,0,0,38.84,18.88l17.44,19.21C148.53,163.23,138.34,168,128,168c-30.78,0-57.67-11.2-79.93-33.25A133.42,133.42,0,0,1,25,128C26,125,39.27,95.75,70,75.53ZM128,96a24,24,0,0,1,23.86,21.57l-31.3-34.51A23.87,23.87,0,0,1,128,96ZM231,128c-.38.87-6.78,16.37-21.65,32.07l-15.53-17.11C203.16,135.16,208,128,208,120a47.89,47.89,0,0,0-79.43-36.15l-13.88-15.3C132.16,60.85,159.24,48,185.67,75.35C204.5,94.18,212.83,113,213.18,113.83A8,8,0,0,1,231,128Z"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256">
    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      // Obtener datos adicionales del usuario desde Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Datos del usuario desde Firestore:', userData);
        // Guardar en localStorage para acceso rápido
        localStorage.setItem('userData', JSON.stringify(userData));
      }
      
      console.log('Usuario logueado:', user);
      navigate('/');
    } catch (err) {
      console.error('Error de login:', err);
      setError('Correo o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Animaciones de Fondo (Blobs) */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Contenedor Principal (Tarjeta) */}
      <div className="login-card-container">
        
        {/* Panel Izquierdo: Bienvenida y Branding */}
        <div className="login-panel-left">
          {/* Circulos decorativos internos */}
          <div className="inner-glow top"></div>
          <div className="inner-glow bottom"></div>

          <div className="panel-content">
            {/* Logo */}
            <div className="logo-section">
              <div className="logo-icon">
                <BriefcaseIcon />
              </div>
              <span className="logo-text">JobLink</span>
            </div>

            <h1>Bienvenido<br/> de vuelta.</h1>
            <p className="panel-description">
              Accede a tu cuenta para encontrar las mejores oportunidades laborales y dar el siguiente paso en tu carrera profesional.
            </p>
          </div>

          <div className="panel-footer">
            <a href="#">Términos</a>
            <span>&bull;</span>
            <a href="#">Privacidad</a>
          </div>
        </div>

        {/* Panel Derecho: Formulario de Login */}
        <div className="login-panel-right">
          <div className="form-wrapper">
            
            <div className="form-header">
              <h2>Iniciar sesión</h2>
              <p>Ingresa tus credenciales para continuar</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              
              {/* Campo de Correo */}
              <div className="form-field">
                <label htmlFor="email">Correo Electrónico</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <EnvelopeIcon />
                  </div>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Campo de Contraseña */}
              <div className="form-field">
                <label htmlFor="password">Contraseña</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <LockIcon />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* Recordarme y Olvidé contraseña */}
              <div className="form-options">
                <label className="custom-checkbox">
                  <input type="checkbox" />
                  <div className="checkmark">
                    <CheckIcon />
                  </div>
                  <span>Recordarme</span>
                </label>

                <a href="#" className="forgot-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón de Ingresar */}
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Ingresando...' : 'Ingresar a mi cuenta'}
              </button>

            </form>

            {/* Separador */}
            <div className="separator">
              <div className="line"></div>
              <span>O</span>
              <div className="line"></div>
            </div>

            {/* Enlace de Registro */}
            <p className="register-text">
              ¿No tienes cuenta? 
              <Link to="/register">Regístrate ahora</Link>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
