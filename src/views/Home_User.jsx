import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home_User.css';

const Home_User = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = {
        name: 'Byron',
        career: 'Ingeniería en Sistemas',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Byron'
      };
      setUser(userData);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Preparando tu espacio...</p>
      </div>
    );
  }

  return (
    <div className="joblink-dashboard">
      {/* Top Navigation Bar */}
      <header className="top-navbar">
        <div className="navbar-left">
          <div className="logo">
            <span className="logo-icon">🔗</span>
            <span className="logo-text">JobLink</span>
          </div>
        </div>
        <div className="navbar-center">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Busca empleos, empresas o eventos" />
          </div>
        </div>
        <div className="navbar-right">
          <button className="btn-create-cv">Crear CV</button>
          <div className="notification-badge">
            <span className="bell-icon">🔔</span>
            <span className="badge">Bienvenido a JobLink</span>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <nav className="sidebar-nav">
            <a href="#" className="nav-item active">
              <span className="nav-icon">🏠</span>
              <span>Inicio</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">💼</span>
              <span>Empleos</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">🎓</span>
              <span>Prácticas</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">🏢</span>
              <span>Empresas</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">📅</span>
              <span>Eventos</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">📚</span>
              <span>Cursos</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">🔖</span>
              <span>Guardados</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">💬</span>
              <span>Mensajes</span>
              <span className="nav-badge">3</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">🔔</span>
              <span>Notificaciones</span>
              <span className="nav-badge">8</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">📊</span>
              <span>Mi Progreso</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">⚙️</span>
              <span>Configuración</span>
            </a>
          </nav>

          Home_User
          {/* Plan Pro Section */}
          <div className="plan-pro">
            <h3>Plan Pro....</h3>
            <p>Desbloquea herramientas exclusivas para crecer tu red profesional.</p>
            <button className="btn-plan">Ver Planes</button>
          </div>

          <button className="btn-improve-capacity">
            <span className="btn-icon">🚀</span>
            <span>Mejora tu Capacidad</span>
          </button>
           main

          <a href="#" className="logout-link">Cerrar sesión</a>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="ai-badge">
              <span className="ai-icon">🤖</span>
              <span>Recomendado por IA</span>
            </div>
            <h1 className="welcome-title">Bienvenido Byron 👋</h1>
            <p className="welcome-subtitle">
              Encuentra oportunidades diseñadas para tu perfil de Ingeniería en Sistemas.
            </p>

            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-value">75%</span>
                <span className="stat-label">de compatibilidad con empleos disponibles</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">8</span>
                <span className="stat-label">empleos compatibles ahora</span>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-primary">Buscar Empleos</button>
              <button className="btn-secondary">Actualizar CV</button>
              <button className="btn-tertiary">Mejora tu Capacidad</button>
            </div>
          </section>

          {/* AI Recommendations Section */}
          <section className="recommendations-section">
            <div className="section-header">
              <h2 className="section-title">RECOMENDACIONES IA</h2>
              <a href="#" className="view-all-link">Ver todos →</a>
            </div>
            <h3 className="section-subtitle">Empleos compatibles para ti</h3>

            <div className="job-cards">
              {/* Job Card 1 */}
              <div className="job-card">
                <div className="job-header">
                  <h4 className="job-title">Ingeniero de Software Junior</h4>
                  <span className="ai-compatibility">Compatibilidad IA 100%</span>
                </div>
                <p className="company-name">CodeLabs</p>
                <div className="job-details">
                  <span className="job-detail">📍 Colombia</span>
                  <span className="job-detail">💼 Hibrido</span>
                  <span className="job-detail">💵 $1,500 - $1,800</span>
                </div>
                <div className="job-footer">
                  <span className="job-time">Hace 1 día</span>
                  <button className="btn-apply">Aplicar</button>
                </div>
              </div>

              {/* Job Card 2 */}
              <div className="job-card">
                <div className="job-header">
                  <h4 className="job-title">Desarrollador Backend Node.js</h4>
                  <span className="ai-compatibility">Compatibilidad IA 85%</span>
                </div>
                <p className="company-name">Microsoft</p>
                <div className="job-details">
                  <span className="job-detail">📍 Ciudad de México</span>
                  <span className="job-detail">💼 Presencial</span>
                  <span className="job-detail">💵 $2,000 - $2,500</span>
                </div>
                <div className="job-footer">
                  <span className="job-time">Hace 3 días</span>
                  <button className="btn-apply">Aplicar</button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          {/* Progress Section */}
          <section className="progress-section">
            <h3 className="section-title">Tu progreso</h3>
            <p className="section-subtitle">Resumen de tu actividad profesional</p>

            <div className="progress-circle">
              <div className="circle">
                <span className="percentage">85%</span>
              </div>
              <div className="progress-info">
                <p className="progress-status">PERFIL COMPLETADO</p>
                <a href="#" className="complete-link">Completa tu CV para acceder al match perfecto. Completar ahora →</a>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">12</span>
                <span className="stat-label">Postulaciones</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">34</span>
                <span className="stat-label">Empresas visitadas</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">3</span>
                <span className="stat-label">Entrevistas</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">75%</span>
                <span className="stat-label">Compatibilidad</span>
              </div>
            </div>

            <div className="graph-container">
              <h4 className="graph-title">Postulaciones esta semana</h4>
              <div className="graph-placeholder">
                <svg viewBox="0 0 300 100" className="graph-svg">
                  <polyline
                    points="0,80 50,60 100,70 150,40 200,50 250,30 300,45"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="80" r="4" fill="#3B82F6" />
                  <circle cx="50" cy="60" r="4" fill="#3B82F6" />
                  <circle cx="100" cy="70" r="4" fill="#3B82F6" />
                  <circle cx="150" cy="40" r="4" fill="#3B82F6" />
                  <circle cx="200" cy="50" r="4" fill="#3B82F6" />
                  <circle cx="250" cy="30" r="4" fill="#3B82F6" />
                  <circle cx="300" cy="45" r="4" fill="#3B82F6" />
                </svg>
              </div>
            </div>
          </section>

          {/* Improve Capacity Section */}
          <section className="improve-section">
            <h3 className="section-title">Mejora tu Capacidad</h3>
            <p className="section-subtitle">Plan personalizado generado por IA según tu carrera y habilidades.</p>
            <button className="btn-view-plan">Ver Plan</button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Home_User;
