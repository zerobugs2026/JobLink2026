import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../database/firebaseconfig.jsx';
import '../styles/Register.css';

// Iconos SVG inline
const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M208,120V48a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v72a8,8,0,0,0,8,8H200A8,8,0,0,0,208,120Zm-8-64v48H56V56ZM104,152v64a8,8,0,0,1-16,0V152a8,8,0,0,1,16,0Zm32,0v64a8,8,0,0,1-16,0V152a8,8,0,0,1,16,0Zm32,0v64a8,8,0,0,1-16,0V152a8,8,0,0,1,16,0Z"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.67,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
  </svg>
);

const BuildingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
    <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.66-13.45l-80,55.54A16,16,0,0,0,32,88.54V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96v112H144V96ZM48,88.54l80-55.54V208H48ZM120,112a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h16A8,8,0,0,1,120,112Zm-8,24a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16Zm88,0a8,8,0,0,1,0,16h-16a8,8,0,0,1,0-16Zm-8-24a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Z"></path>
  </svg>
);

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
    <path d="M224,48H32a16,16,0,0,0-16,16V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16v.85L128,134.15,32,64.85V64ZM32,192V83.15l93.79,68.57a8,8,0,0,0,9.42,0L224,83.15V192Z"></path>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
    <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"></path>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.2-79.93-33.25A133.48,133.48,0,0,1,25,128a133.48,133.48,0,0,1,23.07-30.75C70.33,75.2,97.22,64,128,64s57.67,11.2,79.93,33.25A133.48,133.48,0,0,1,231,128a133.48,133.48,0,0,1-23.07,30.75C185.67,180.8,158.78,192,128,192Zm0-80a16,16,0,1,0,16,16A16,16,0,0,0,128,112Z"></path>
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
    <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.18,123.24,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.38,52.15,19.16,21.11C108,108.59,104,113.42,104,120a24,24,0,0,0,38.84,18.88l17.44,19.21C148.53,163.23,138.34,168,128,168c-30.78,0-57.67-11.2-79.93-33.25A133.42,133.42,0,0,1,25,128C26,125,39.27,95.75,70,75.53ZM128,96a24,24,0,0,1,23.86,21.57l-31.3-34.51A23.87,23.87,0,0,1,128,96ZM231,128c-.38.87-6.78,16.37-21.65,32.07l-15.53-17.11C203.16,135.16,208,128,208,120a47.89,47.89,0,0,0-79.43-36.15l-13.88-15.3C132.16,60.85,159.24,48,185.67,75.35C204.5,94.18,212.83,113,213.18,113.83A8,8,0,0,1,231,128Z"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256">
    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
  </svg>
);

const Register = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('usuario'); // 'usuario' o 'empresa'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false); // Estado para checkbox de términos
  const [termsError, setTermsError] = useState(''); // Error de validación de términos
  
  // Estados para errores de validación de cada campo
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

  const getPasswordStrength = (pwd) => {
    if (!pwd) return null;
    const hasMin = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const score = [hasMin, hasUpper, hasNumber].filter(Boolean).length;
    if (score === 3) return 'strong';
    if (score === 2) return 'medium';
    return 'weak';
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateField = (name, value) => {
    if (name === 'name') {
      if (!value.trim()) return mode === 'empresa' ? 'El nombre de la empresa es obligatorio.' : 'El nombre completo es obligatorio.';
      if (value.trim().length < 2) return 'Debe tener al menos 2 caracteres.';
      if (value.trim().length > 50) return 'No puede superar los 50 caracteres.';
      if (!nameRegex.test(value.trim())) return 'Solo se permiten letras y espacios.';
    }
    if (name === 'email') {
      if (!value.trim()) return 'El correo electrónico es obligatorio.';
      if (!emailRegex.test(value.trim())) return 'Ingresa un correo electrónico válido.';
    }
    if (name === 'password') {
      if (!value) return 'La contraseña es obligatoria.';
      if (value.length < 8) return 'Debe tener al menos 8 caracteres.';
      if (!/[A-Z]/.test(value)) return 'Debe incluir al menos una letra mayúscula.';
      if (!/[0-9]/.test(value)) return 'Debe incluir al menos un número.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const msg = validateField(name, value);
    if (msg) setErrors(prev => ({ ...prev, [name]: msg }));
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTermsError('');
    
    // Validar todos los campos
    const isFormValid = validateForm();
    
    // Validar que se hayan aceptado los términos
    if (!acceptedTerms) {
      setTermsError('Debes aceptar los Términos de Servicio y la Política de Privacidad para continuar.');
    }
    
    // Si hay errores, no continuar
    if (!isFormValid || !acceptedTerms) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      console.log('Usuario creado exitosamente:', user.uid);
      
      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        type: mode,
        createdAt: new Date(),
        uid: user.uid
      });
      
      console.log('Datos guardados en Firestore:', { name: formData.name, type: mode });
      
      // Redirigir al login después de un registro exitoso
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error('Error al crear usuario:', err);
      
      let errorMessage = 'Error al crear la cuenta. Intenta de nuevo.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Este correo ya está registrado. Intenta iniciar sesión.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'El correo electrónico no es válido.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Sin conexión a internet. Verifica tu red.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isEmpresa = mode === 'empresa';
  const activeColor = isEmpresa ? '#16A34A' : '#1D4ED8';
  const activeClass = isEmpresa ? 'mode-empresa' : '';

  return (
    <div className={`register-container ${activeClass}`}>
      {/* Elementos decorativos de fondo */}
      <div className="bg-decoration rocket">
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" viewBox="0 0 256 256">
          <path d="M156,64a52,52,0,1,0-56,0A52,52,0,0,0,156,64Zm-52-36a36,36,0,1,1,36,36A36,36,0,0,1,104,28Zm118.83,121.17a8,8,0,0,1,.83,7.36l-16,40A8,8,0,0,1,200,200H144a8,8,0,0,1,0-16h46.75l11.2-28H144l-25.6,64a8,8,0,0,1-14.8,0L78.25,156H49.75l11.2,28H80a8,8,0,0,1,0,16H56a8,8,0,0,1-7.43-5.03l-16-40A8,8,0,0,1,33.25,140h30.34l26.88-67.2A8,8,0,0,1,98,68h60a8,8,0,0,1,7.43,4.97L192.41,140h30.34A8,8,0,0,1,222.83,149.17ZM107.25,140h41.5L128,87.6Z"></path>
        </svg>
      </div>
      <div className="bg-decoration chart">
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" viewBox="0 0 256 256">
          <path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path>
        </svg>
      </div>

      {/* Tarjeta Principal */}
      <div className="register-card">
        
        {/* Logo */}
        <div className="logo-section">
          <div className="logo-icon" style={{ backgroundColor: activeColor }}>
            <SparkleIcon />
          </div>
          <span className="logo-text">
            <span style={{ color: '#03a4ed' }}>JOB</span><span style={{ color: '#16A34A' }}>LINK</span>
          </span>
        </div>

        {/* Toggle Switch */}
        <div className="toggle-switch">
          <div 
            className="toggle-slider" 
            style={{ transform: isEmpresa ? 'translateX(100%)' : 'translateX(0)' }}
          ></div>
          <button 
            className={`toggle-btn ${!isEmpresa ? 'active' : ''}`}
            onClick={() => setMode('usuario')}
            style={{ color: !isEmpresa ? activeColor : '#6b7280' }}
          >
            Soy Candidato
          </button>
          <button 
            className={`toggle-btn ${isEmpresa ? 'active' : ''}`}
            onClick={() => setMode('empresa')}
            style={{ color: isEmpresa ? activeColor : '#6b7280' }}
          >
            Soy Empresa
          </button>
        </div>

        {/* Encabezado */}
        <div className="register-header">
          <div className="register-header-icon" style={{ background: `${activeColor}18`, color: activeColor }}>
            {isEmpresa ? <BuildingsIcon /> : <SparkleIcon />}
          </div>
          <h1>{isEmpresa ? 'Registra tu Empresa' : 'Crea tu cuenta'}</h1>
          <p>{isEmpresa ? 'Encuentra el talento ideal para tu equipo.' : 'Tu próximo empleo empieza aquí.'}</p>
        </div>

        {/* Mensaje de error */}
        {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="register-form">
          
          {/* Nombre */}
          <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
            <label htmlFor="name">{isEmpresa ? 'Nombre de la Empresa' : 'Nombre Completo'}</label>
            <div className="input-wrapper">
              <div className="field-icon" style={{ color: errors.name ? '#dc2626' : activeColor }}>
                {isEmpresa ? <BuildingsIcon /> : <UserIcon />}
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={isEmpresa ? 'Tech Solutions S.A.' : 'Emily Espinoza'}
                className={errors.name ? 'input-error' : ''}
              />
            </div>
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-wrapper">
              <div className="field-icon" style={{ color: errors.email ? '#dc2626' : activeColor }}>
                <EnvelopeIcon />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="tu@correo.com"
                className={errors.email ? 'input-error' : ''}
              />
            </div>
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          {/* Contraseña */}
          <div className={`form-field ${errors.password ? 'has-error' : ''}`}>
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <div className="field-icon" style={{ color: errors.password ? '#dc2626' : activeColor }}>
                <LockIcon />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Mínimo 8 caracteres"
                className={errors.password ? 'input-error' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
            {formData.password && !errors.password && (
              <div className="password-strength">
                <div className="strength-bars">
                  <span className={`strength-bar ${passwordStrength ? 'active' : ''}`} style={{ background: passwordStrength === 'weak' ? '#ef4444' : passwordStrength === 'medium' ? '#f59e0b' : '#16A34A' }}></span>
                  <span className={`strength-bar ${passwordStrength === 'medium' || passwordStrength === 'strong' ? 'active' : ''}`} style={{ background: passwordStrength === 'medium' ? '#f59e0b' : passwordStrength === 'strong' ? '#16A34A' : '#e5e7eb' }}></span>
                  <span className={`strength-bar ${passwordStrength === 'strong' ? 'active' : ''}`} style={{ background: passwordStrength === 'strong' ? '#16A34A' : '#e5e7eb' }}></span>
                </div>
                <span className="strength-label" style={{ color: passwordStrength === 'weak' ? '#ef4444' : passwordStrength === 'medium' ? '#f59e0b' : '#16A34A' }}>
                  {passwordStrength === 'weak' ? 'Contraseña débil' : passwordStrength === 'medium' ? 'Contraseña media' : 'Contraseña fuerte'}
                </span>
              </div>
            )}
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          {/* Términos */}
          <div className="terms-section">
            <label className={`custom-checkbox ${termsError ? 'has-error' : ''}`}>
              <input 
                type="checkbox" 
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  if (e.target.checked) setTermsError('');
                }}
              />
              <div className={`checkmark ${acceptedTerms ? 'checked' : ''}`}>
                {acceptedTerms && <CheckIcon />}
              </div>
              <span className="terms-text">
                Acepto los <a href="#" style={{ color: activeColor }}>Términos de Servicio</a> y la <a href="#" style={{ color: activeColor }}>Política de Privacidad</a>
              </span>
            </label>
            {termsError && <div className="terms-error">{termsError}</div>}
          </div>

          {/* Botón */}
          <button 
            type="submit" 
            className="submit-btn"
            style={{ 
              backgroundColor: activeColor, 
              boxShadow: `0 8px 25px ${activeColor}50`,
              opacity: acceptedTerms ? 1 : 0.5
            }}
            disabled={isLoading || !acceptedTerms}
          >
            <span>{isLoading ? 'Creando cuenta...' : 'Comenzar ahora'}</span>
            <SparkleIcon />
          </button>

        </form>

        {/* Footer */}
        <p className="login-link">
          ¿Ya tienes una cuenta?
          <Link to="/login" style={{ color: activeColor }}>Inicia sesión</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
