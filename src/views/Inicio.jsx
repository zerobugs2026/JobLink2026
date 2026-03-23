import React from 'react';
import Encabezado from '../componets/Encabezado';
import '../styles/Inicio.css';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <Encabezado />
      
      {/* Hero Section - Primera Imagen */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Conectando talento <span className="highlight">con oportunidades laborales</span>
          </h1>
          <p className="hero-description">
            Nuestra plataforma conecta a profesionales, personas con habilidades y quienes buscan su primera oportunidad laboral con empresas que necesitan talento. Todo el proceso es digital, rápido y accesible desde cualquier lugar.
          </p>
        </div>
        <div className="hero-background-icons">
          <div className="floating-icon icon-1">💼</div>
          <div className="floating-icon icon-2">🎯</div>
          <div className="floating-icon icon-3">📈</div>
          <div className="floating-icon icon-4">🤝</div>
          <div className="floating-icon icon-5">💡</div>
          <div className="floating-icon icon-6">🚀</div>
        </div>
      </section>

      {/* Sección: Explorar por tipo de perfil - Segunda Imagen */}
      <section className="explore-profile-section">
        <div className="explore-profile-card-main">
          <h2 className="explore-profile-title">Explorar por tipo de perfil</h2>
          <p className="explore-profile-subtitle">Haz clic en cualquier categoría para ver opciones disponibles</p>
        </div>

        <div className="profile-categories-container">
          {/* Para personas que buscan empleo */}
          <div className="profile-category-card">
            <div className="category-header">
              <span className="category-icon">👤</span>
              <h3>Para personas que buscan empleo</h3>
            </div>
            <div className="category-options">
              <div className="option-card">
                <span className="option-icon">🎓</span>
                <h4>Profesional</h4>
                <p>Carreras universitarias</p>
              </div>
              <div className="option-card">
                <span className="option-icon">🔧</span>
                <h4>Técnico</h4>
                <p>Oficios y prácticas</p>
              </div>
              <div className="option-card">
                <span className="option-icon">🌱</span>
                <h4>Sin experiencia</h4>
                <p>Primer empleo</p>
              </div>
            </div>
          </div>

          {/* Para empresas que buscan trabajadores */}
          <div className="profile-category-card">
            <div className="category-header">
              <span className="category-icon">🏢</span>
              <h3>Para empresas que buscan trabajadores</h3>
            </div>
            <div className="category-options">
              <div className="option-card">
                <span className="option-icon">🏪</span>
                <h4>Pequeña Empresa</h4>
                <p>1-10 empleados</p>
              </div>
              <div className="option-card">
                <span className="option-icon">🏬</span>
                <h4>Mediana Empresa</h4>
                <p>11-100 empleados</p>
              </div>
              <div className="option-card">
                <span className="option-icon">🏛️</span>
                <h4>Gran Empresa</h4>
                <p>100+ empleados</p>
              </div>
              <div className="option-card">
                <span className="option-icon">🚀</span>
                <h4>Startup</h4>
                <p>Empresas en crecimiento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Cómo funciona nuestra magia - Tercera Imagen */}
      <section className="how-it-works-section">
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">Cómo funciona nuestra magia</h2>
          <p className="how-it-works-subtitle">Un sistema inteligente que conecta talento con oportunidades</p>
        </div>

        <div className="magic-cards-container">
          {/* Tarjeta de Usuarios */}
          <div className="magic-card">
            <div className="magic-icon users-icon">👥</div>
            <h3 className="magic-title">Usuarios</h3>
            <ul className="magic-features">
              <li>Profesionales</li>
              <li>Técnicos</li>
              <li>Sin experiencia</li>
              <li>Habilidades diversas</li>
            </ul>
          </div>

          {/* Tarjeta de JobLink */}
          <div className="magic-card">
            <div className="magic-icon joblink-icon">⚡</div>
            <h3 className="magic-title">JobLink</h3>
            <ul className="magic-features">
              <li>Matching inteligente</li>
              <li>IA + Algoritmos</li>
              <li>Conexión en tiempo real</li>
              <li>100% digital</li>
            </ul>
          </div>

          {/* Tarjeta de Negocios */}
          <div className="magic-card">
            <div className="magic-icon business-icon">🏢</div>
            <h3 className="magic-title">Negocios</h3>
            <ul className="magic-features">
              <li>Pequeñas empresas</li>
              <li>Medianas</li>
              <li>Grandes corporaciones</li>
              <li>Startups</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sección: Oportunidades perfectas - Cuarta Imagen */}
      <section className="perfect-opportunities-section">
        <div className="perfect-opportunities-header">
          <h2 className="perfect-opportunities-title">
            <span className="sparkle-icon">✨</span> Oportunidades perfectas
          </h2>
        </div>

        <div className="opportunity-cards-container">
          {/* Tarjeta: Empleo digno */}
          <div className="opportunity-card">
            <div className="opportunity-icon briefcase-icon">💼</div>
            <h3 className="opportunity-title">Empleo digno</h3>
            <p className="opportunity-description">Trabajos formales y bien remunerados</p>
          </div>

          {/* Tarjeta: Crecimiento */}
          <div className="opportunity-card">
            <div className="opportunity-icon growth-icon">📈</div>
            <h3 className="opportunity-title">Crecimiento</h3>
            <p className="opportunity-description">Desarrollo profesional continuo</p>
          </div>

          {/* Tarjeta: Conexión */}
          <div className="opportunity-card">
            <div className="opportunity-icon handshake-icon">🤝</div>
            <h3 className="opportunity-title">Conexión</h3>
            <p className="opportunity-description">Networking y relaciones laborales</p>
          </div>

          {/* Tarjeta: Éxito */}
          <div className="opportunity-card">
            <div className="opportunity-icon rocket-icon">🚀</div>
            <h3 className="opportunity-title">Éxito</h3>
            <p className="opportunity-description">Resultados para ambas partes</p>
          </div>
        </div>
      </section>

      {/* Sección: Cita y Llamada a la Acción - Quinta Imagen */}
      <section className="cta-section">
        <div className="quote-container">
          <p className="quote-text">
            "Nuestro sistema inteligente conecta usuarios con negocios, creando oportunidades perfectas para ambos"
          </p>
        </div>

        <div className="search-cta-container">
          <h2 className="search-cta-title">Inicia tu búsqueda</h2>
          <p className="search-cta-description">
            ¿Necesitas inspiración? Descubre qué miles de profesionales están buscando en JobLink hoy.
          </p>
          <div className="scroll-down-indicator">⬇️</div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;