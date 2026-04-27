import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../database/firebaseconfig.jsx';
import '../styles/Login.css';

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
    <path d="M224,48H32a16,16,0,0,0-16,16V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16v.85L128,134.15,32,64.85V64ZM32,192V83.15l93.79,68.57a8,8,0,0,0,9.42,0L224,83.15V192Z"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
    <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.2-79.93-33.25A133.48,133.48,0,0,1,25,128a133.48,133.48,0,0,1,23.07-30.75C70.33,75.2,97.22,64,128,64s57.67,11.2,79.93,33.25A133.48,133.48,0,0,1,231,128a133.48,133.48,0,0,1-23.07,30.75C185.67,180.8,158.78,192,128,192Zm0-80a16,16,0,1,0,16,16A16,16,0,0,0,128,112Z"/>
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
    <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.18,123.24,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.38,52.15,19.16,21.11C108,108.59,104,113.42,104,120a24,24,0,0,0,38.84,18.88l17.44,19.21C148.53,163.23,138.34,168,128,168c-30.78,0-57.67-11.2-79.93-33.25A133.42,133.42,0,0,1,25,128C26,125,39.27,95.75,70,75.53ZM128,96a24,24,0,0,1,23.86,21.57l-31.3-34.51A23.87,23.87,0,0,1,128,96ZM231,128c-.38.87-6.78,16.37-21.65,32.07l-15.53-17.11C203.16,135.16,208,128,208,120a47.89,47.89,0,0,0-79.43-36.15l-13.88-15.3C132.16,60.85,159.24,48,185.67,75.35C204.5,94.18,212.83,113,213.18,113.83A8,8,0,0,1,231,128Z"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 256 256">
    <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Z"/>
  </svg>
);


const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });

  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState({ type: '', text: '' });

  const handleReset = async (e) => {
    e.preventDefault();
    if (!resetEmail.trim() || !emailRegex.test(resetEmail.trim())) {
      setResetMsg({ type: 'error', text: 'Ingresa un correo electrónico válido.' });
      return;
    }
    setResetLoading(true);
    setResetMsg({ type: '', text: '' });
    try {
      await sendPasswordResetEmail(auth, resetEmail.trim().toLowerCase());
      setResetMsg({ type: 'success', text: 'Correo enviado. Revisa tu bandeja de entrada y la carpeta de spam.' });
      setResetEmail('');
    } catch (err) {
      const msg = err.code === 'auth/user-not-found'
        ? 'No existe una cuenta con ese correo.'
        : 'Error al enviar el correo. Intenta de nuevo.';
      setResetMsg({ type: 'error', text: msg });
    } finally {
      setResetLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name]) setFieldErrors({ ...fieldErrors, [name]: '' });
    if (error) setError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      if (!value.trim()) {
        setFieldErrors(f => ({ ...f, email: 'El correo es obligatorio.' }));
      } else if (!emailRegex.test(value.trim())) {
        setFieldErrors(f => ({ ...f, email: 'Ingresa un correo electrónico válido.' }));
      }
    }
    if (name === 'password' && !value) {
      setFieldErrors(f => ({ ...f, password: 'La contraseña es obligatoria.' }));
    }
  };

  const validate = () => {
    const errs = { email: '', password: '' };
    let ok = true;
    const email = formData.email.trim();

    if (!email) {
      errs.email = 'El correo es obligatorio.'; ok = false;
    } else if (!emailRegex.test(email)) {
      errs.email = 'Ingresa un correo electrónico válido.'; ok = false;
    }

    if (!formData.password) {
      errs.password = 'La contraseña es obligatoria.'; ok = false;
    }

    setFieldErrors(errs);
    return ok;
  };

  const firebaseErrorMsg = (code) => {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/invalid-credential':
        return 'No existe una cuenta con ese correo.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta. Intenta de nuevo.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Espera unos minutos e intenta de nuevo.';
      case 'auth/user-disabled':
        return 'Esta cuenta ha sido desactivada. Contacta soporte.';
      case 'auth/network-request-failed':
        return 'Sin conexión a internet. Verifica tu red.';
      default:
        return 'Error al iniciar sesión. Verifica tus datos.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email.trim().toLowerCase(), formData.password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate(userData.type === 'empresa' ? '/perfil-empresa' : '/perfil');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(firebaseErrorMsg(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Panel izquierdo — Branding */}
      <div className="login-brand-panel">
        <div className="brand-panel-inner">

          {/* Logo */}
          <div className="brand-logo">
            <div className="brand-logo-icon">
              <BriefcaseIcon />
            </div>
            <span className="brand-logo-text">
              <span className="logo-job">JOB</span><span className="logo-link">LINK</span>
            </span>
          </div>

          {/* Headline */}
          <div className="brand-headline">
            <h1>Conectamos<br /><span className="headline-accent-green">Talento</span> con<br /><span className="headline-accent-blue">Oportunidades</span></h1>
          </div>

          {/* Decoración */}
          <div className="brand-deco brand-deco-1"></div>
          <div className="brand-deco brand-deco-2"></div>
        </div>
      </div>

      {/* Panel derecho — Formulario */}
      <div className="login-form-panel">
        <div className="login-form-inner">

          {/* Logo mobile */}
          <div className="login-logo-mobile">
            <div className="brand-logo-icon brand-logo-icon--sm">
              <BriefcaseIcon />
            </div>
            <span className="brand-logo-text">
              <span className="logo-job">JOB</span><span className="logo-link">LINK</span>
            </span>
          </div>

          <div className="login-form-header">
            <h2>Bienvenido de vuelta</h2>
            <p>Ingresa tus credenciales para acceder a tu cuenta</p>
          </div>

          {error && (
            <div className="login-error">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                <path d="M236.8,188.09,149.35,36.22a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form-fields">

            {/* Email */}
            <div className="lf-group">
              <label htmlFor="email">Correo Electrónico</label>
              <div className={`lf-input-wrap ${fieldErrors.email ? 'lf-input-error' : ''}`}>
                <span className="lf-icon"><EnvelopeIcon /></span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="correo@ejemplo.com"
                  autoComplete="email"
                />
              </div>
              {fieldErrors.email && <span className="lf-field-error">{fieldErrors.email}</span>}
            </div>

            {/* Contraseña */}
            <div className="lf-group">
              <div className="lf-label-row">
                <label htmlFor="password">Contraseña</label>
                <button
                  type="button"
                  className="lf-forgot"
                  onClick={() => { setShowReset(true); setResetMsg({ type: '', text: '' }); }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className={`lf-input-wrap ${fieldErrors.password ? 'lf-input-error' : ''}`}>
                <span className="lf-icon"><LockIcon /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lf-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
              {fieldErrors.password && <span className="lf-field-error">{fieldErrors.password}</span>}
            </div>

            {/* Submit */}
            <button type="submit" className="login-submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="login-spinner"></span>
                  Ingresando...
                </>
              ) : (
                'Ingresar a mi cuenta'
              )}
            </button>

          </form>

          {showReset && (
            <div className="reset-panel">
              <div className="reset-panel-header">
                <h3>Recuperar contraseña</h3>
                <button
                  type="button"
                  className="reset-close"
                  onClick={() => { setShowReset(false); setResetMsg({ type: '', text: '' }); setResetEmail(''); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
                  </svg>
                </button>
              </div>
              <p className="reset-desc">Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.</p>
              {resetMsg.text && (
                <div className={`reset-msg reset-msg-${resetMsg.type}`}>{resetMsg.text}</div>
              )}
              <form onSubmit={handleReset} className="reset-form">
                <div className="lf-input-wrap">
                  <span className="lf-icon"><EnvelopeIcon /></span>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={e => { setResetEmail(e.target.value); setResetMsg({ type: '', text: '' }); }}
                    placeholder="correo@ejemplo.com"
                    autoComplete="email"
                  />
                </div>
                <button type="submit" className="login-submit-btn" disabled={resetLoading}>
                  {resetLoading ? (
                    <><span className="login-spinner"></span>Enviando...</>
                  ) : 'Enviar enlace'}
                </button>
              </form>
            </div>
          )}

          <div className="login-divider">
            <span></span>
            <p>¿No tienes cuenta?</p>
            <span></span>
          </div>

          <Link to="/register" className="login-register-btn">
            Crear cuenta
          </Link>

          <p className="login-footer-note">
            Al ingresar, aceptas nuestros <a href="#">Términos de Servicio</a> y <a href="#">Política de Privacidad</a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
