import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../database/firebaseconfig.jsx';
import '../styles/RegisterModern.css';

// Iconos SVG inline
const UserIcon = ({ size = 16, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.67,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
  </svg>
);

const MailIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
    <path d="M224,48H32a16,16,0,0,0-16,16V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16v.85L128,134.15,32,64.85V64ZM32,192V83.15l93.79,68.57a8,8,0,0,0,9.42,0L224,83.15V192Z"/>
  </svg>
);

const LockIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
    <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"/>
  </svg>
);

const PhoneIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
    <path d="M231.88,175.08a56,56,0,0,1-56,56A168,168,0,0,1,32.46,87.12a56,56,0,0,1,56-56h.09A16,16,0,0,1,103,44.28l17.58,40.3a16,16,0,0,1-.61,14.28l-10.92,22.5a4,4,0,0,0,1.34,5.23l34.56,22.26a4,4,0,0,0,5.21-1.22l11-22.52a16,16,0,0,1,14.27-.62l40.26,17.51a16,16,0,0,1,13.17,15.58v.09A56.06,56.06,0,0,1,231.88,175.08ZM216,168.5v.07a40,40,0,0,0-40-40h-.09L144.2,142.61l-10.55-6.79,10.49-21.58L98.36,77.18,76.79,87.67l-6.77-10.54L103.54,55.86a40,40,0,0,0-40-40h-.07A152,152,0,0,0,87.66,215.32,40,40,0,0,0,216,168.5Z"/>
  </svg>
);

const EyeIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.2-79.93-33.25A133.48,133.48,0,0,1,25,128a133.48,133.48,0,0,1,23.07-30.75C70.33,75.2,97.22,64,128,64s57.67,11.2,79.93,33.25A133.48,133.48,0,0,1,231,128a133.48,133.48,0,0,1-23.07,30.75C185.67,180.8,158.78,192,128,192Zm0-80a16,16,0,1,0,16,16A16,16,0,0,0,128,112Z"/>
  </svg>
);

const EyeOffIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
    <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.18,123.24,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.38,52.15,19.16,21.11C108,108.59,104,113.42,104,120a24,24,0,0,0,38.84,18.88l17.44,19.21C148.53,163.23,138.34,168,128,168c-30.78,0-57.67-11.2-79.93-33.25A133.42,133.42,0,0,1,25,128C26,125,39.27,95.75,70,75.53ZM128,96a24,24,0,0,1,23.86,21.57l-31.3-34.51A23.87,23.87,0,0,1,128,96ZM231,128c-.38.87-6.78,16.37-21.65,32.07l-15.53-17.11C203.16,135.16,208,128,208,120a47.89,47.89,0,0,0-79.43-36.15l-13.88-15.3C132.16,60.85,159.24,48,185.67,75.35C204.5,94.18,212.83,113,213.18,113.83A8,8,0,0,1,231,128Z"/>
  </svg>
);

const BriefcaseIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
    <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Z"/>
  </svg>
);

const CheckIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/>
  </svg>
);

const CheckCircleIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>
  </svg>
);

const AlertCircleIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"/>
  </svg>
);

const Register = () => {
  const navigate = useNavigate();
  
  // Estado para alternar la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estado para el tipo de cuenta
  const [accountType, setAccountType] = useState('candidato');

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    celular: '',
    correo: '',
    password: '',
    confirmPassword: '',
    terminos: false
  });

  // Estado para los errores de validación
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (firebaseError) setFirebaseError('');
  };

  // Función de validación
  const validate = () => {
    let newErrors = {};

    if (accountType === 'candidato') {
      if (!formData.nombre1.trim()) newErrors.nombre1 = 'El primer nombre es obligatorio';
      else if (!nameRegex.test(formData.nombre1.trim())) newErrors.nombre1 = 'Solo se permiten letras';
      
      if (!formData.apellido1.trim()) newErrors.apellido1 = 'El primer apellido es obligatorio';
      else if (!nameRegex.test(formData.apellido1.trim())) newErrors.apellido1 = 'Solo se permiten letras';
      
      if (formData.nombre2.trim() && !nameRegex.test(formData.nombre2.trim())) {
        newErrors.nombre2 = 'Solo se permiten letras';
      }
      
      if (formData.apellido2.trim() && !nameRegex.test(formData.apellido2.trim())) {
        newErrors.apellido2 = 'Solo se permiten letras';
      }

      if (!formData.celular.trim()) {
        newErrors.celular = 'El celular es obligatorio';
      } else if (!/^\+?[\d\s-]{8,}$/.test(formData.celular.trim())) {
        newErrors.celular = 'Formato de celular inválido';
      }
    }
    
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = 'Formato de correo inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mínimo 8 caracteres';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Debe incluir al menos una mayúscula';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Debe incluir al menos un número';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.terminos) {
      newErrors.terminos = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError('');
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.correo, formData.password);
      const user = userCredential.user;
      
      // Preparar datos según el tipo de cuenta
      const userData = {
        email: formData.correo,
        type: accountType,
        createdAt: new Date(),
        uid: user.uid
      };

      if (accountType === 'candidato') {
        userData.nombre1 = formData.nombre1;
        userData.nombre2 = formData.nombre2 || '';
        userData.apellido1 = formData.apellido1;
        userData.apellido2 = formData.apellido2 || '';
        userData.celular = formData.celular;
        userData.displayName = `${formData.nombre1} ${formData.apellido1}`;
      } else {
        // Para empresa, usar el nombre de la empresa (se puede agregar campo adicional)
        userData.displayName = formData.correo.split('@')[0];
      }
      
      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', user.uid), userData);
      
      console.log('Usuario creado exitosamente:', user.uid);
      
      setIsSubmitted(true);
      
      // Redirigir al login después de un registro exitoso
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Error al crear usuario:', err);
      
      let errorMessage = 'Error al crear la cuenta. Intenta de nuevo.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Este correo ya está registrado. Intenta iniciar sesión.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'El correo electrónico no es válido.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es demasiado débil.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Sin conexión a internet. Verifica tu red.';
      }
      
      setFirebaseError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isEmpresa = accountType === 'empresa';

  return (
    <div className={`register-modern-page ${isEmpresa ? 'empresa-mode' : ''}`}>
      <div className="register-modern-container">
        <div className="register-modern-content">
          
          {/* Cabecera y Logo */}
          <div className="register-modern-header">
            <div className="register-modern-logo">
              <div className="register-modern-logo-icon">
                <BriefcaseIcon size={24} />
              </div>
              <span>JOB<span style={{ color: isEmpresa ? '#16A34A' : '#2563eb' }}>LINK</span></span>
            </div>

            {/* Selector de tipo de cuenta */}
            <div className="register-modern-toggle">
              <button 
                type="button"
                onClick={() => setAccountType('candidato')}
                className={`register-modern-toggle-btn ${accountType === 'candidato' ? 'active' : ''}`}
              >
                Soy Candidato
              </button>
              <button 
                type="button"
                onClick={() => setAccountType('empresa')}
                className={`register-modern-toggle-btn ${accountType === 'empresa' ? 'active' : ''}`}
              >
                Soy Empresa
              </button>
            </div>

            <h2 className="register-modern-title">Crea tu cuenta</h2>
            <p className="register-modern-subtitle">
              {isEmpresa ? 'Encuentra el mejor talento para tu empresa.' : 'Tu próximo empleo empieza aquí.'}
            </p>
          </div>

          {/* Mensaje de éxito */}
          {isSubmitted && (
            <div className="register-modern-success">
              <CheckCircleIcon size={20} />
              <span>¡Cuenta creada exitosamente! Redirigiendo...</span>
            </div>
          )}

          {/* Error de Firebase */}
          {firebaseError && (
            <div className="register-modern-error" style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fef2f2', borderRadius: '8px' }}>
              <AlertCircleIcon size={16} />
              <span>{firebaseError}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="register-modern-form">
            <div className="register-modern-grid">
              
              {accountType === 'candidato' && (
                <>
                  {/* Primer Nombre */}
                  <div className="register-modern-field">
                    <label className="register-modern-label">
                      Primer Nombre <span className="register-modern-required">*</span>
                    </label>
                    <div className="register-modern-input-wrapper">
                      <UserIcon size={16} className="register-modern-input-icon" />
                      <input 
                        type="text" 
                        name="nombre1"
                        placeholder="Ej. Juan"
                        value={formData.nombre1}
                        onChange={handleChange}
                        className={`register-modern-input ${errors.nombre1 ? 'error' : ''}`}
                        disabled={isLoading || isSubmitted}
                      />
                    </div>
                    {errors.nombre1 && <p className="register-modern-error"><AlertCircleIcon size={12}/> {errors.nombre1}</p>}
                  </div>

                  {/* Segundo Nombre */}
                  <div className="register-modern-field">
                    <label className="register-modern-label">
                      Segundo Nombre
                    </label>
                    <div className="register-modern-input-wrapper">
                      <UserIcon size={16} className="register-modern-input-icon optional" />
                      <input 
                        type="text" 
                        name="nombre2"
                        placeholder="Ej. Carlos (Opcional)"
                        value={formData.nombre2}
                        onChange={handleChange}
                        className={`register-modern-input ${errors.nombre2 ? 'error' : ''}`}
                        disabled={isLoading || isSubmitted}
                      />
                    </div>
                    {errors.nombre2 && <p className="register-modern-error"><AlertCircleIcon size={12}/> {errors.nombre2}</p>}
                  </div>

                  {/* Primer Apellido */}
                  <div className="register-modern-field">
                    <label className="register-modern-label">
                      Primer Apellido <span className="register-modern-required">*</span>
                    </label>
                    <div className="register-modern-input-wrapper">
                      <UserIcon size={16} className="register-modern-input-icon" />
                      <input 
                        type="text" 
                        name="apellido1"
                        placeholder="Ej. Pérez"
                        value={formData.apellido1}
                        onChange={handleChange}
                        className={`register-modern-input ${errors.apellido1 ? 'error' : ''}`}
                        disabled={isLoading || isSubmitted}
                      />
                    </div>
                    {errors.apellido1 && <p className="register-modern-error"><AlertCircleIcon size={12}/> {errors.apellido1}</p>}
                  </div>

                  {/* Segundo Apellido */}
                  <div className="register-modern-field">
                    <label className="register-modern-label">
                      Segundo Apellido
                    </label>
                    <div className="register-modern-input-wrapper">
                      <UserIcon size={16} className="register-modern-input-icon optional" />
                      <input 
                        type="text" 
                        name="apellido2"
                        placeholder="Ej. López (Opcional)"
                        value={formData.apellido2}
                        onChange={handleChange}
                        className={`register-modern-input ${errors.apellido2 ? 'error' : ''}`}
                        disabled={isLoading || isSubmitted}
                      />
                    </div>
                    {errors.apellido2 && <p className="register-modern-error"><AlertCircleIcon size={12}/> {errors.apellido2}</p>}
                  </div>

                  {/* Celular */}
                  <div className="register-modern-field">
                    <label className="register-modern-label">
                      Número de Celular <span className="register-modern-required">*</span>
                    </label>
                    <div className="register-modern-input-wrapper">
                      <PhoneIcon size={16} className="register-modern-input-icon" />
                      <input 
                        type="tel" 
                        name="celular"
                        placeholder="+505 0000 0000"
                        value={formData.celular}
                        onChange={handleChange}
                        className={`register-modern-input ${errors.celular ? 'error' : ''}`}
                        disabled={isLoading || isSubmitted}
                      />
                    </div>
                    {errors.celular && <p className="register-modern-error"><AlertCircleIcon size={12}/> {errors.celular}</p>}
                  </div>
                </>
              )}

              {/* Correo Electrónico */}
              <div className={`register-modern-field ${accountType === 'empresa' ? 'full-width' : ''}`}>
                <label className="register-modern-label">
                  Correo Electrónico <span className="register-modern-required">*</span>
                </label>
                <div className="register-modern-input-wrapper">
                  <MailIcon size={16} className="register-modern-input-icon" />
                  <input 
                    type="email" 
                    name="correo"
                    placeholder="tu@correo.com"
                    value={formData.correo}
                    onChange={handleChange}
                    className={`register-modern-input ${errors.correo ? 'error' : ''}`}
                    disabled={isLoading || isSubmitted}
                  />
                </div>
                {errors.correo && <p className="register-modern-error"><AlertCircleIcon size={12}/> {errors.correo}</p>}
              </div>

              {/* Contraseña */}
              <div className="register-modern-field">
                <label className="register-modern-label">
                  Contraseña <span className="register-modern-required">*</span>
                </label>
                <div className="register-modern-input-wrapper">
                  <LockIcon size={16} className="register-modern-input-icon" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    placeholder="Mínimo 8 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    className={`register-modern-input ${errors.password ? 'error' : ''}`}
                    style={{ paddingRight: '2.5rem' }}
                    disabled={isLoading || isSubmitted}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="register-modern-toggle-password"
                    disabled={isLoading || isSubmitted}
                  >
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
                {errors.password && <p className="register-modern-error"><AlertCircleIcon size={12}/> {errors.password}</p>}
              </div>

              {/* Confirmar Contraseña */}
              <div className="register-modern-field">
                <label className="register-modern-label">
                  Confirmar Contraseña <span className="register-modern-required">*</span>
                </label>
                <div className="register-modern-input-wrapper">
                  <LockIcon size={16} className="register-modern-input-icon" />
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword"
                    placeholder="Repite tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`register-modern-input ${errors.confirmPassword ? 'error' : ''}`}
                    style={{ paddingRight: '2.5rem' }}
                    disabled={isLoading || isSubmitted}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="register-modern-toggle-password"
                    disabled={isLoading || isSubmitted}
                  >
                    {showConfirmPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="register-modern-error"><AlertCircleIcon size={12}/> {errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Checkbox de Términos */}
            <div className="register-modern-terms">
              <label className="register-modern-checkbox-wrapper">
                <div className="register-modern-checkbox">
                  <input 
                    type="checkbox" 
                    name="terminos"
                    checked={formData.terminos}
                    onChange={handleChange}
                    disabled={isLoading || isSubmitted}
                  />
                  <span className="register-modern-checkbox-check">
                    <CheckIcon size={12} />
                  </span>
                </div>
                <span className="register-modern-terms-text">
                  Acepto los <a href="#">Términos de Servicio</a> y la <a href="#">Política de Privacidad</a> <span className="register-modern-required">*</span>
                </span>
              </label>
              {errors.terminos && <p className="register-modern-error" style={{ marginLeft: '2rem', marginTop: '0.25rem' }}><AlertCircleIcon size={12}/> {errors.terminos}</p>}
            </div>

            {/* Botón de Registro */}
            <button 
              type="submit" 
              className="register-modern-submit"
              disabled={isLoading || isSubmitted || !formData.terminos}
            >
              {isLoading ? (
                <>
                  <span className="register-modern-spinner"></span>
                  Creando cuenta...
                </>
              ) : isSubmitted ? (
                <>
                  <CheckCircleIcon size={20} />
                  ¡Cuenta Creada Exitosamente!
                </>
              ) : (
                'Registrarte'
              )}
            </button>

            {/* Enlace de login */}
            <p className="register-modern-login-link">
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
