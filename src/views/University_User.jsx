import React, { useState, useEffect } from 'react';
import '../styles/University_User.css';

// SVG Icons
const Icons = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  briefcase: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  ),
  graduation: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
    </svg>
  ),
  building: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <path d="M9 22v-4h6v4"></path>
      <path d="M8 6h.01"></path>
      <path d="M16 6h.01"></path>
      <path d="M12 6h.01"></path>
      <path d="M12 10h.01"></path>
      <path d="M12 14h.01"></path>
      <path d="M16 10h.01"></path>
      <path d="M16 14h.01"></path>
      <path d="M8 10h.01"></path>
      <path d="M8 14h.01"></path>
    </svg>
  ),
  calendar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  book: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  ),
  bookmark: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  message: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  bell: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  chart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  star: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  search: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  bellHeader: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  logo: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      <rect x="2" y="10" width="20" height="10" rx="2"></rect>
    </svg>
  ),
  robot: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
      <circle cx="12" cy="5" r="2"></circle>
      <path d="M12 7v4"></path>
      <line x1="8" y1="16" x2="8" y2="16"></line>
      <line x1="16" y1="16" x2="16" y2="16"></line>
    </svg>
  )
};

const University_User = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser({ name: 'Byron' });
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="university-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="joblink-logo">
            <span className="logo-icon-wrapper">{Icons.logo}</span>
            <span className="logo-text">JobLink</span>
          </div>
        </div>
        <div className="header-center">
          <div className="search-container">
            <span className="search-icon-wrapper">{Icons.search}</span>
            <input type="text" placeholder="Busca empleos en empresas grandes..." className="search-input" />
          </div>
        </div>
        <div className="header-right">
          <button className="btn-create-cv">Crear CV</button>
          <div className="notification-box">
            <span className="notification-icon-wrapper">{Icons.bellHeader}</span>
            <span className="notification-text">Bienvenido a JobLink</span>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <nav className="sidebar-nav">
            <a href="#" className="nav-item active">
              <span className="nav-icon-wrapper">{Icons.home}</span>
              <span className="nav-text">Inicio</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon-wrapper">{Icons.briefcase}</span>
              <span className="nav-text">Empleos</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon-wrapper">{Icons.graduation}</span>
              <span className="nav-text">Prácticas</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon-wrapper">{Icons.building}</span>
              <span className="nav-text">Empresas</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon-wrapper">{Icons.calendar}</span>
              <span className="nav-text">Eventos</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon-wrapper">{Icons.book}</span>
              <span className="nav-text">Cursos</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon-wrapper">{Icons.bookmark}</span>
              <span className="nav-text">Guardados</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon-wrapper">{Icons.message}</span>
              <span className="nav-text">Mensajes</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon-wrapper">{Icons.bell}</span>
              <span className="nav-text">Notificaciones</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon-wrapper">{Icons.chart}</span>
              <span className="nav-text">Mi Progreso</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon-wrapper">{Icons.settings}</span>
              <span className="nav-text">Configuración</span>
            </a>
          </nav>
          <button className="btn-improve-capacity">
            <span className="btn-icon-wrapper">{Icons.star}</span>
            <span>Mejora tu Capacidad</span>
          </button>
          <a href="#" className="logout-link">Cerrar sesión</a>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <div className="ai-badge">
              <span className="ai-icon-wrapper">{Icons.robot}</span>
              <span>Recomendado por IA</span>
            </div>
            <h1 className="welcome-title">Bienvenido Byron</h1>
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
          </div>

          {/* Featured Companies Section */}
          <div className="featured-companies-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">EMPRESAS GRANDES DESTACADAS</h2>
                <p className="section-subtitle">Oportunidades en las mejores empresas del mundo</p>
              </div>
              <a href="#" className="view-all-link">Ver todas →</a>
            </div>
            <div className="companies-grid">
              <div className="company-card">
                <div className="company-logo-wrapper">MS</div>
                <h3 className="company-card-name">Microsoft</h3>
                <p className="company-card-info">+50 vacantes para graduados</p>
                <button className="btn-follow-company">Ver vacantes</button>
              </div>
              <div className="company-card">
                <div className="company-logo-wrapper">G</div>
                <h3 className="company-card-name">Google</h3>
                <p className="company-card-info">+35 vacantes para graduados</p>
                <button className="btn-follow-company">Ver vacantes</button>
              </div>
              <div className="company-card">
                <div className="company-logo-wrapper">AMZ</div>
                <h3 className="company-card-name">Amazon</h3>
                <p className="company-card-info">+40 vacantes para graduados</p>
                <button className="btn-follow-company">Ver vacantes</button>
              </div>
              <div className="company-card">
                <div className="company-logo-wrapper">M</div>
                <h3 className="company-card-name">Meta</h3>
                <p className="company-card-info">+25 vacantes para graduados</p>
                <button className="btn-follow-company">Ver vacantes</button>
              </div>
            </div>
          </div>

          {/* AI Recommendations Section */}
          <div className="recommendations-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">RECOMENDACIONES IA</h2>
                <p className="section-subtitle">Empleos compatibles para tu perfil de graduado</p>
              </div>
              <a href="#" className="view-all-link">Ver todos →</a>
            </div>
            <div className="job-cards">
              {/* Job Card 1 */}
              <div className="job-card">
                <div className="job-header">
                  <h3 className="job-title">Ingeniero de Software Junior</h3>
                  <span className="ai-compatibility">Compatibilidad IA 100%</span>
                </div>
                <p className="company-name">Microsoft</p>
                <div className="job-details">
                  <span className="job-detail">🌎 Global</span>
                  <span className="job-detail">🏢 Remoto</span>
                  <span className="job-detail">💰 $2,500 - $3,200</span>
                </div>
                <div className="job-footer">
                  <span className="job-time">Hace 1 día</span>
                  <button className="btn-apply">Aplicar</button>
                </div>
              </div>
              {/* Job Card 2 */}
              <div className="job-card">
                <div className="job-header">
                  <h3 className="job-title">Desarrollador Backend Node.js</h3>
                  <span className="ai-compatibility">Compatibilidad IA 95%</span>
                </div>
                <p className="company-name">Google</p>
                <div className="job-details">
                  <span className="job-detail">🇺🇸 Estados Unidos</span>
                  <span className="job-detail">🏢 Híbrido</span>
                  <span className="job-detail">💰 $3,000 - $4,000</span>
                </div>
                <div className="job-footer">
                  <span className="job-time">Hace 2 días</span>
                  <button className="btn-apply">Aplicar</button>
                </div>
              </div>
              {/* Job Card 3 */}
              <div className="job-card">
                <div className="job-header">
                  <h3 className="job-title">Data Scientist Junior</h3>
                  <span className="ai-compatibility">Compatibilidad IA 90%</span>
                </div>
                <p className="company-name">Amazon</p>
                <div className="job-details">
                  <span className="job-detail">🇪🇺 Europa</span>
                  <span className="job-detail">🏢 Remoto</span>
                  <span className="job-detail">💰 $2,800 - $3,500</span>
                </div>
                <div className="job-footer">
                  <span className="job-time">Hace 3 días</span>
                  <button className="btn-apply">Aplicar</button>
                </div>
              </div>
            </div>
          </div>

          {/* Career Opportunities Section */}
          <div className="career-opportunities-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">OPORTUNIDADES DE CARRERA</h2>
                <p className="section-subtitle">Programas especiales para recién graduados</p>
              </div>
            </div>
            <div className="opportunities-grid">
              <div className="opportunity-card">
                <div className="opportunity-icon">🎓</div>
                <h3 className="opportunity-title">Graduate Programs</h3>
                <p className="opportunity-description">Programas de rotación en empresas Fortune 500</p>
                <span className="opportunity-badge">+20 empresas</span>
              </div>
              <div className="opportunity-card">
                <div className="opportunity-icon">🚀</div>
                <h3 className="opportunity-title">Tech Startups</h3>
                <p className="opportunity-description">Oportunidades en startups tecnológicas en crecimiento</p>
                <span className="opportunity-badge">+50 startups</span>
              </div>
              <div className="opportunity-card">
                <div className="opportunity-icon">🌍</div>
                <h3 className="opportunity-title">Internacional</h3>
                <p className="opportunity-description">Trabaja en cualquier parte del mundo</p>
                <span className="opportunity-badge">+15 países</span>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          {/* Career Progress Section */}
          <div className="progress-section">
            <h3 className="section-title">Tu Carrera Profesional</h3>
            <p className="section-subtitle">Progreso hacia tu empleo ideal en empresas grandes</p>
            
            <div className="progress-circle">
              <div className="circle">
                <span className="percentage">85%</span>
              </div>
              <div className="progress-info">
                <p className="progress-status">PERFIL LISTO PARA GRANDES EMPRESAS</p>
                <a href="#" className="complete-link">Optimiza tu CV para Microsoft, Google y más →</a>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">12</span>
                <span className="stat-label">Postulaciones</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">8</span>
                <span className="stat-label">Empresas Grandes</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">3</span>
                <span className="stat-label">Entrevistas</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">92%</span>
                <span className="stat-label">Match Empresas Top</span>
              </div>
            </div>

            <div className="career-tips">
              <h4 className="tips-title">Consejos para Grandes Empresas</h4>
              <div className="tip-item">
                <span className="tip-icon">💡</span>
                <p className="tip-text">Completa proyectos en GitHub para destacar</p>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🎯</span>
                <p className="tip-text">Prepara entrevistas técnicas con LeetCode</p>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🌟</span>
                <p className="tip-text">Obtén certificaciones de AWS/Azure</p>
              </div>
            </div>
          </div>

          {/* Improve Capacity Section */}
          <div className="improve-section">
            <h3 className="section-title">Plan de Carrera IA</h3>
            <p className="section-subtitle">Ruta personalizada para trabajar en empresas Fortune 500.</p>
            <button className="btn-view-plan">Ver mi plan de carrera</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default University_User;
