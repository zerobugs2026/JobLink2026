import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      console.log('Login attempt:', formData);
      setIsLoading(false);
      // Here you would typically handle authentication
    }, 1000);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      {/* Header */}
      <header className="login-header">
        <div className="container">
          <nav className="main-nav">
            <a href="#" className="logo" onClick={(e) => { e.preventDefault(); goToHome(); }}>
              <h4>Job<span>Link</span></h4>
            </a>
          </nav>
        </div>
      </header>

      {/* Login Form Section */}
      <div className="login-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <div className="login-box">
                <div className="login-header-box">
                  <h2>Iniciar Sesión</h2>
                  <p>Accede a tu cuenta de JobLink</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <div className="input-wrapper">
                      <i className="fa fa-envelope"></i>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className="input-wrapper">
                      <i className="fa fa-lock"></i>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-options">
                    <label className="remember-me">
                      <input type="checkbox" />
                      <span>Recordarme</span>
                    </label>
                    <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                  </div>

                  <button 
                    type="submit" 
                    className="login-button"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Ingresando...' : 'Ingresar'}
                  </button>
                </form>

                <div className="login-footer">
                  <p>¿No tienes una cuenta? <a href="#">Regístrate aquí</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="login-footer-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright">
                <p>© Copyright 2026 JobLink. Todos los Derechos Reservados.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
