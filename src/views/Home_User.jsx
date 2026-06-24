import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home_User.css';

const Home_User = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Cargar Phosphor Icons dinámicamente
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@phosphor-icons/web';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    // Cargar datos del usuario después del login/registro
    const timer = setTimeout(() => {
      const userData = {
        name: 'Byron Martínez',
        email: 'byron@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Byron',
        title: 'Desarrollador Full Stack',
        location: 'Ciudad de México, MX',
        experience: '5+ Años',
        projects: 23,
        profileVisibility: 94,
        ranking: 'Top 15%'
      };
      setUser(userData);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F4F7FA' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Preparando tu espacio...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f6fa', overflowX: 'hidden' }}>
      {/* Connecta UI Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">A</div>
          <span className="logo-text">Connecta</span>
        </div>
        <input type="text" placeholder="Buscar personas, empleos, publicaciones..." />
        <div className="header-icons">
          <button className="btn-post">+ Publicar</button>
          <span className="icon-btn">✉️</span>
          <span className="icon-btn with-badge">
            🔔
            <span className="badge">8</span>
          </span>
          <img src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Byron'} alt="Avatar" className="avatar" />
        </div>
      </header>

      <div className="container">
        
        {/* Sidebar */}
        <aside className="sidebar">
          <nav>
            <p className="nav-item active">
              <i className="ph ph-house"></i> Inicio
            </p>
            <p className="nav-item">
              <i className="ph ph-users"></i> Mi Red
            </p>
            <p className="nav-item">
              <i className="ph ph-magnifying-glass"></i> Descubrir
            </p>
            <p className="nav-item">
              <i className="ph ph-chat-circle"></i> Mensajes
              <span className="nav-badge">3</span>
            </p>
            <p className="nav-item">
              <i className="ph ph-bell"></i> Notificaciones
              <span className="nav-badge">8</span>
            </p>
            <p className="nav-item">
              <i className="ph ph-bookmark"></i> Guardados
            </p>
            <p className="nav-item">
              <i className="ph ph-calendar"></i> Eventos
            </p>
            <p className="nav-item">
              <i className="ph ph-chart-line-up"></i> Analíticas
            </p>
          </nav>

          {/* Plan Pro Section */}
          <div className="plan-pro">
            <h3>Plan Pro....</h3>
            <p>Desbloquea herramientas exclusivas para crecer tu red profesional.</p>
            <button className="btn-plan">Ver Planes</button>
          </div>

          <div className="bottom">
            <p className="bottom-item">🌙 Modo oscuro</p>
            <p className="bottom-item">🚪 Cerrar sesión</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main">
          
          {/* Business Card */}
          <div className="business-card">
            <div className="banner">
              <div className="banner-content">
                <div className="logo-box">A</div>
                <div className="banner-info">
                  <h2>Aurora Labs <span className="verified">✓</span></h2>
                  <p>12.5K seguidores · Tecnología · Ciudad de México</p>
                </div>
                <div className="banner-actions">
                  <button className="follow">Seguir</button>
                  <button className="more-options">•••</button>
                </div>
              </div>
            </div>

            <p className="desc">
              Desarrollamos soluciones de software innovadoras que impulsan el crecimiento de empresas en todo el mundo. 🌍
            </p>

            <div className="stats">
              <div className="stat-item">
                <i className="ph ph-calendar-blank"></i>
                <b>2018</b>
                <span>Fundación</span>
              </div>
              <div className="stat-item">
                <i className="ph ph-users"></i>
                <b>120+</b>
                <span>Empleados</span>
              </div>
              <div className="stat-item">
                <i className="ph ph-globe"></i>
                <b>15+</b>
                <span>Países</span>
              </div>
              <div className="stat-item">
                <i className="ph ph-folder"></i>
                <b>48</b>
                <span>Proyectos</span>
              </div>
            </div>

            {/* Lo que hacemos */}
            <div className="section">
              <h4>Lo que hacemos</h4>
              <div className="tags">
                <span className="tag">Cloud Solutions</span>
                <span className="tag">Inteligencia Artificial</span>
                <span className="tag">Desarrollo Web</span>
                <span className="tag">Data Analytics</span>
              </div>
            </div>

            {/* Proyectos destacados */}
            <div className="section">
              <h4>Proyectos destacados</h4>
              <div className="highlights-nav">
                <button className="nav-arrow">‹</button>
                <div className="highlights-scroll">
                  <div className="highlight-card">
                    <div className="highlight-icon">🚀</div>
                    <p className="highlight-title">Lanzamos nuestra nueva plataforma en la nube</p>
                    <span className="highlight-date">Hace 2 días</span>
                  </div>
                  <div className="highlight-card">
                    <div className="highlight-icon">💻</div>
                    <p className="highlight-title">Webinar: Innovación en arquitectura de software</p>
                    <span className="highlight-date">Hace 4 días</span>
                  </div>
                  <div className="highlight-card">
                    <div className="highlight-icon">🌍</div>
                    <p className="highlight-title">Aurora Labs alcanza 15 países</p>
                    <span className="highlight-date">Hace 1 semana</span>
                  </div>
                </div>
                <button className="nav-arrow">›</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="actions">
              <button className="action-btn"><i className="ph ph-bookmark"></i> Guardar</button>
              <button className="action-btn"><i className="ph ph-user-plus"></i> Solicitud</button>
              <button className="action-btn"><i className="ph ph-info"></i> Info</button>
              <button className="action-btn"><i className="ph ph-envelope"></i> Contacto</button>
              <button className="action-btn"><i className="ph ph-globe"></i> Sitio web</button>
              <button className="action-btn"><i className="ph ph-dots-three"></i> Más</button>
            </div>

            {/* Engagement Metrics */}
            <div className="engagement">
              <div className="engagement-group">
                <i className="ph ph-thumbs-up engagement-icon"></i>
                <span className="engagement-count">128</span>
              </div>
              <div className="engagement-group">
                <i className="ph ph-chat-circle engagement-icon"></i>
                <span className="engagement-count">12 comentarios</span>
              </div>
              <div className="engagement-group">
                <i className="ph ph-share-network engagement-icon"></i>
                <span className="engagement-count">34 compartidos</span>
              </div>
            </div>
          </div>

        </main>

        {/* Rightbar */}
        <aside className="rightbar">
          {/* Tu actividad esta semana */}
          <div className="card activity-card">
            <div className="card-header">
              <h3>Tu actividad esta semana</h3>
              <select className="dropdown">
                <option>Esta semana</option>
                <option>Este mes</option>
              </select>
            </div>
            <div className="stats2">
              <div>
                <b>24</b>
                <span>Nuevos contactos</span>
              </div>
              <div>
                <b>152</b>
                <span>Visitas a tu perfil</span>
              </div>
              <div>
                <b>18</b>
                <span>Interacciones</span>
              </div>
            </div>
          </div>

          {/* Eventos para ti */}
          <div className="card">
            <div className="card-header">
              <h3>Eventos para ti</h3>
              <a href="#" className="view-all">Ver todos</a>
            </div>
            <div className="event-list">
              <div className="event-item">
                <div className="event-icon red">📅</div>
                <div className="event-details">
                  <p className="event-title">Workshop de Diseño</p>
                  <p className="event-subtitle">Sistemas escalables y UX</p>
                  <p className="event-date">24 Mayo · En línea</p>
                </div>
              </div>
              <div className="event-item">
                <div className="event-icon green">📅</div>
                <div className="event-details">
                  <p className="event-title">Feria de Empleo Tech</p>
                  <p className="event-subtitle">Conecta con empresas</p>
                  <p className="event-date">31 Mayo · Ciudad de México</p>
                </div>
              </div>
              <div className="event-item">
                <div className="event-icon orange">📅</div>
                <div className="event-details">
                  <p className="event-title">Charla: Liderazgo Moderno</p>
                  <p className="event-subtitle">Equipos + Productividad</p>
                  <p className="event-date">6 Junio · En línea</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personas que podrías conocer */}
          <div className="card">
            <div className="card-header">
              <h3>Personas que podrías conocer</h3>
              <a href="#" className="view-all">Ver todos</a>
            </div>
            <div className="people-list">
              <div className="person-item">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel" alt="Daniel" className="person-avatar" />
                <div className="person-details">
                  <p className="person-name">Daniel Torres</p>
                  <p className="person-title">Product Manager en TechNova</p>
                </div>
                <div className="person-actions">
                  <button className="btn-connect">Conectar</button>
                  <button className="btn-dismiss">×</button>
                </div>
              </div>
              <div className="person-item">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" alt="María" className="person-avatar" />
                <div className="person-details">
                  <p className="person-name">María González</p>
                  <p className="person-title">Desarrolladora en DevStudio</p>
                </div>
                <div className="person-actions">
                  <button className="btn-connect">Conectar</button>
                  <button className="btn-dismiss">×</button>
                </div>
              </div>
              <div className="person-item">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos" alt="Carlos" className="person-avatar" />
                <div className="person-details">
                  <p className="person-name">Carlos Vega</p>
                  <p className="person-title">Especialista en Datos</p>
                </div>
                <div className="person-actions">
                  <button className="btn-connect">Conectar</button>
                  <button className="btn-dismiss">×</button>
                </div>
              </div>
            </div>
            <a href="#" className="show-more">Mostrar más</a>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Home_User;
