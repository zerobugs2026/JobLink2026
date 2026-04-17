import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Inicio.css';

// Hook personalizado para animaciones de scroll
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return visibleElements;
};

const Inicio = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [isLoaded, setIsLoaded] = useState(false);
  const visibleElements = useScrollAnimation();
  
  // Flag para prevenir que el scroll listener sobrescriba la selección manual
  const isManualClick = useRef(false);

  useEffect(() => {
    // Simulate page loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Handle scroll for header background
    const handleScroll = () => {
      const scroll = window.scrollY;
      const headerText = document.querySelector('.header-text');
      const header = document.querySelector('header');
      
      if (headerText && header) {
        const box = headerText.offsetHeight;
        const headerHeight = header.offsetHeight;
        
        if (scroll >= box - headerHeight) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    // Handle active section highlighting - solo durante scroll manual, no durante clic
    const handleScrollForActiveSection = () => {
      // Si es un clic manual, no sobrescribir la selección
      if (isManualClick.current) return;
      
      const scrollPos = window.scrollY + 200; // Offset para detectar la sección centrada en pantalla
      const sections = ['top', 'about', 'services', 'portfolio', 'blog', 'contact'];
      
      let currentSection = 'top';
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          // Detectar si el centro de la pantalla está dentro de esta sección
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = sectionId;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollForActiveSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollForActiveSection);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isManualClick.current = true; // Marcar que es clic manual
      const headerOffset = 120; // Altura del header + margen para centrar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'auto' // Scroll instantáneo sin animación
      });
      setIsMenuActive(false);
      
      // Resetear el flag después de un momento
      setTimeout(() => {
        isManualClick.current = false;
      }, 100);
    }
  };

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted');
  };

  return (
    <div className="inicio-container">
      {/* Preloader */}
      <div id="js-preloader" className={`js-preloader ${isLoaded ? 'loaded' : ''}`}>
        <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`header-area header-sticky animate-slideInDown animate-fill-forwards ${isScrolled ? 'background-header' : ''}`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* Logo */}
                <a href="#top" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}>
                  <h4>Job<span>Link</span></h4>
                </a>
                
                {/* Menu */}
                <ul className={`nav ${isMenuActive ? 'active' : ''}`} style={{ display: isMenuActive ? 'block' : 'none' }}>
                  <li className="scroll-to-section">
                    <a 
                      href="#top" 
                      className={activeSection === 'top' ? 'active' : ''}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        setActiveSection('top');
                        scrollToSection('top'); 
                      }}
                    >
                      Inicio
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a 
                      href="#about" 
                      className={activeSection === 'about' ? 'active' : ''}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        setActiveSection('about');
                        scrollToSection('about'); 
                      }}
                    >
                      Acerca de
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a 
                      href="#services" 
                      className={activeSection === 'services' ? 'active' : ''}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        setActiveSection('services');
                        scrollToSection('services'); 
                      }}
                    >
                      Servicios
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a 
                      href="#portfolio" 
                      className={activeSection === 'portfolio' ? 'active' : ''}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        setActiveSection('portfolio');
                        scrollToSection('portfolio'); 
                      }}
                    >
                      Portafolio
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a 
                      href="#blog" 
                      className={activeSection === 'blog' ? 'active' : ''}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        setActiveSection('blog');
                        scrollToSection('blog'); 
                      }}
                    >
                      Blog
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a 
                      href="#contact" 
                      className={activeSection === 'contact' ? 'active' : ''}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        setActiveSection('contact');
                        scrollToSection('contact'); 
                      }}
                    >
                      Contáctanos
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <div className="main-red-button">
                      <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                        Iniciar Sesión
                      </a>
                    </div>
                  </li>
                </ul>
                
                {/* Mobile Menu Trigger */}
                <a className={`menu-trigger ${isMenuActive ? 'active' : ''}`} onClick={toggleMenu}>
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Banner - Hero Section Mejorada */}
      <div className="main-banner" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div 
                    id="banner-text"
                    className={`left-content header-text scroll-animate fade-in-left scroll-delay-2 ${
                      visibleElements.has('banner-text') ? 'fade-in-left' : ''
                    }`}
                  >
                    <h6>Bienvenido a JobLink</h6>
                    <h2>Conectamos <em>Talento</em> con <span>Oportunidades</span></h2>
                    <p>Nuestra plataforma conecta a profesionales, personas con habilidades y quienes buscan su primera oportunidad laboral con empresas que necesitan talento. Todo el proceso es digital, rápido y accesible desde cualquier lugar.</p>
                    <form id="search" onSubmit={handleFormSubmit}>
                      <fieldset>
                        <input 
                          type="text" 
                          name="address" 
                          className="email" 
                          placeholder="Tu URL o búsqueda..." 
                          autoComplete="on" 
                          required 
                        />
                      </fieldset>
                      <fieldset>
                        <button type="submit" className="main-button">Buscar</button>
                      </fieldset>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div 
                    id="banner-image"
                    className={`right-image scroll-animate fade-in-right ${
                      visibleElements.has('banner-image') ? 'fade-in-right' : ''
                    }`}
                  >
                    <img src="/assets/banner-right-image.png" alt="conexión laboral" style={{maxWidth: '100%', height: 'auto', objectFit: 'contain'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section - Explorar por tipo de perfil */}
      <div id="about" className="about-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div 
                id="about-image"
                className={`left-image scroll-animate fade-in scroll-delay-1 ${
                  visibleElements.has('about-image') ? 'fade-in' : ''
                }`}
              >
                <img src="/assets/about-left-image.png" alt="explorar perfiles" style={{maxWidth: '100%', height: 'auto', objectFit: 'contain'}} />
              </div>
            </div>
            <div className="col-lg-8 align-self-center">
              <div className="services">
                <div className="row">
                  <div className="col-lg-6">
                    <div 
                      id="service-1"
                      className={`item scroll-animate fade-in-up scroll-delay-2 ${
                        visibleElements.has('service-1') ? 'fade-in-up' : ''
                      }`}
                    >
                      <div className="icon">
                        <img src="/assets/service-icon-01.png" alt="profesionales" style={{maxWidth: '60px', height: 'auto'}} />
                      </div>
                      <div className="right-text">
                        <h4>Profesionales</h4>
                        <p>Carreras universitarias y especializadas</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div 
                      id="service-2"
                      className={`item scroll-animate fade-in-up scroll-delay-3 ${
                        visibleElements.has('service-2') ? 'fade-in-up' : ''
                      }`}
                    >
                      <div className="icon">
                        <img src="/assets/service-icon-02.png" alt="técnicos" style={{maxWidth: '60px', height: 'auto'}} />
                      </div>
                      <div className="right-text">
                        <h4>Técnicos</h4>
                        <p>Oficios y habilidades prácticas</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div 
                      id="service-3"
                      className={`item scroll-animate fade-in-up scroll-delay-4 ${
                        visibleElements.has('service-3') ? 'fade-in-up' : ''
                      }`}
                    >
                      <div className="icon">
                        <img src="/assets/service-icon-03.png" alt="primer empleo" style={{maxWidth: '60px', height: 'auto'}} />
                      </div>
                      <div className="right-text">
                        <h4>Primer Empleo</h4>
                        <p>Oportunidades para sin experiencia</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div 
                      id="service-4"
                      className={`item scroll-animate fade-in-up scroll-delay-5 ${
                        visibleElements.has('service-4') ? 'fade-in-up' : ''
                      }`}
                    >
                      <div className="icon">
                        <img src="/assets/service-icon-04.png" alt="empresas" style={{maxWidth: '60px', height: 'auto'}} />
                      </div>
                      <div className="right-text">
                        <h4>Empresas</h4>
                        <p>Pequeñas, medianas y grandes corporaciones</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section - Cómo funciona */}
      <div id="services" className="our-services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div 
                id="services-image"
                className={`left-image scroll-animate fade-in-left scroll-delay-1 ${
                  visibleElements.has('services-image') ? 'fade-in-left' : ''
                }`}
              >
                <img src="/assets/services-left-image.png" alt="cómo funciona" style={{maxWidth: '100%', height: 'auto', objectFit: 'contain'}} />
              </div>
            </div>
            <div className="col-lg-6">
              <div 
                id="services-content"
                className={`section-heading scroll-animate fade-in-right scroll-delay-1 ${
                  visibleElements.has('services-content') ? 'fade-in-right' : ''
                }`}
              >
                <h2>Cómo funciona nuestra <em>Plataforma</em> & <span>Conexiones</span></h2>
                <p>JobLink es el puente perfecto entre talento y oportunidades. Nuestro sistema inteligente utiliza IA para hacer match entre candidatos y empresas.</p>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="first-bar progress-skill-bar">
                    <h4>Matching Inteligente</h4>
                    <span>95%</span>
                    <div className="filled-bar"></div>
                    <div className="full-bar"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="second-bar progress-skill-bar">
                    <h4>Conexiones Exitosas</h4>
                    <span>88%</span>
                    <div className="filled-bar"></div>
                    <div className="full-bar"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="third-bar progress-skill-bar">
                    <h4>Satisfacción Usuarios</h4>
                    <span>92%</span>
                    <div className="filled-bar"></div>
                    <div className="full-bar"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section - Oportunidades */}
      <div id="portfolio" className="our-portfolio section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div 
                id="portfolio-title"
                className={`section-heading scroll-animate bounce-in scroll-delay-1 ${
                  visibleElements.has('portfolio-title') ? 'bounce-in' : ''
                }`}
              >
                <h2>Descubre las <em>Oportunidades</em> que <span>Ofrecemos</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <a href="#">
                <div 
                  id="portfolio-1"
                  className={`item scroll-animate portfolio-item bounce-in-up scroll-delay-2 ${
                    visibleElements.has('portfolio-1') ? 'bounce-in-up' : ''
                  }`}
                >
                  <div className="hidden-content">
                    <h4>Empleo Digno</h4>
                    <p>Trabajos formales y bien remunerados para todos los niveles.</p>
                  </div>
                  <div className="showed-content">
                    <img src="/assets/portfolio-image.png" alt="empleo digno" style={{maxWidth: '100px', height: 'auto', borderRadius: '50%'}} />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6">
              <a href="#">
                <div 
                  id="portfolio-2"
                  className={`item scroll-animate portfolio-item bounce-in-up scroll-delay-3 ${
                    visibleElements.has('portfolio-2') ? 'bounce-in-up' : ''
                  }`}
                >
                  <div className="hidden-content">
                    <h4>Crecimiento Profesional</h4>
                    <p>Oportunidades de desarrollo y aprendizaje continuo.</p>
                  </div>
                  <div className="showed-content">
                    <img src="/assets/portfolio-image.png" alt="crecimiento" style={{maxWidth: '100px', height: 'auto', borderRadius: '50%'}} />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6">
              <a href="#">
                <div 
                  id="portfolio-3"
                  className={`item scroll-animate portfolio-item bounce-in-up scroll-delay-4 ${
                    visibleElements.has('portfolio-3') ? 'bounce-in-up' : ''
                  }`}
                >
                  <div className="hidden-content">
                    <h4>Networking</h4>
                    <p>Conecta con profesionales y empresas del sector.</p>
                  </div>
                  <div className="showed-content">
                    <img src="/assets/portfolio-image.png" alt="networking" style={{maxWidth: '100px', height: 'auto', borderRadius: '50%'}} />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-3 col-sm-6">
              <a href="#">
                <div 
                  id="portfolio-4"
                  className={`item scroll-animate portfolio-item bounce-in-up scroll-delay-5 ${
                    visibleElements.has('portfolio-4') ? 'bounce-in-up' : ''
                  }`}
                >
                  <div className="hidden-content">
                    <h4>Éxito Garantizado</h4>
                    <p>Resultados tangibles para candidatos y empresas.</p>
                  </div>
                  <div className="showed-content">
                    <img src="/assets/portfolio-image.png" alt="éxito" style={{maxWidth: '100px', height: 'auto', borderRadius: '50%'}} />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section - Novedades */}
      <div id="blog" className="our-blog section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div 
                id="blog-title"
                className={`section-heading scroll-animate fade-in-down scroll-delay-1 ${
                  visibleElements.has('blog-title') ? 'fade-in-down' : ''
                }`}
              >
                <h2>Últimas <em>Novedades</em> en nuestro <span>Blog</span></h2>
              </div>
            </div>
            <div className="col-lg-6">
              <div 
                id="blog-dec"
                className={`top-dec scroll-animate fade-in-down scroll-delay-1 ${
                  visibleElements.has('blog-dec') ? 'fade-in-down' : ''
                }`}
              >
                <img src="/assets/blog-dec.png" alt="" style={{maxWidth: '270px', height: 'auto'}} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div 
                id="blog-main"
                className={`left-image scroll-animate fade-in-up scroll-delay-2 ${
                  visibleElements.has('blog-main') ? 'fade-in-up' : ''
                }`}
              >
                <a href="#"><img src="/assets/big-blog-thumb.jpg" alt="Consejos laborales" style={{maxWidth: '100%', height: 'auto', borderRadius: '20px'}} /></a>
                <div className="info">
                  <div className="inner-content">
                    <ul>
                      <li><i className="fa fa-calendar"></i> 25 Mar 2026</li>
                      <li><i className="fa fa-users"></i> JobLink</li>
                      <li><i className="fa fa-folder"></i> Consejos</li>
                    </ul>
                    <a href="#"><h4>Consejos para tu Búsqueda Laboral</h4></a>
                    <p>Descubre las mejores estrategias para encontrar el trabajo perfecto en el mercado actual.</p>
                    <div className="main-blue-button">
                      <a href="#">Leer Más</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div 
                id="blog-list"
                className={`right-list scroll-animate fade-in-up scroll-delay-2 ${
                  visibleElements.has('blog-list') ? 'fade-in-up' : ''
                }`}
              >
                <ul>
                  <li>
                    <div className="left-content align-self-center">
                      <span><i className="fa fa-calendar"></i> 20 Mar 2026</span>
                      <a href="#"><h4>Tendencias del Mercado Laboral</h4></a>
                      <p>Conoce las habilidades más demandadas este año.</p>
                    </div>
                    <div className="right-image">
                      <a href="#"><img src="/assets/blog-thumb-01.jpg" alt="" style={{maxWidth: '250px', height: 'auto', borderRadius: '20px'}} /></a>
                    </div>
                  </li>
                  <li>
                    <div className="left-content align-self-center">
                      <span><i className="fa fa-calendar"></i> 15 Mar 2026</span>
                      <a href="#"><h4>Prepara tu Entrevista Virtual</h4></a>
                      <p>Tips para destacar en entrevistas online.</p>
                    </div>
                    <div className="right-image">
                      <a href="#"><img src="/assets/blog-thumb-01.jpg" alt="" style={{maxWidth: '250px', height: 'auto', borderRadius: '20px'}} /></a>
                    </div>
                  </li>
                  <li>
                    <div className="left-content align-self-center">
                      <span><i className="fa fa-calendar"></i> 10 Mar 2026</span>
                      <a href="#"><h4>Networking Digital Efectivo</h4></a>
                      <p>Cómo construir contactos profesionales en línea.</p>
                    </div>
                    <div className="right-image">
                      <a href="#"><img src="/assets/blog-thumb-01.jpg" alt="" style={{maxWidth: '250px', height: 'auto', borderRadius: '20px'}} /></a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section - Nuevo Diseño */}
      <section id="contact" className="contacto-nuevo">
        <div className="container">
          <div className="row align-items-center">
            {/* Columna Izquierda - Texto de Soporte */}
            <div className="col-lg-6">
              <h2 className="contacto-titulo text-start">Servicio Técnico y Soporte</h2>
              <p className="contacto-subtitulo text-start">¿Tienes algún problema o inconveniente? Nuestro equipo de soporte está listo para ayudarte. Envíanos tu consulta y te responderemos a la brevedad.</p>
            </div>
            
            {/* Columna Derecha - Formulario */}
            <div className="col-lg-6">
              <div className="formulario-contacto">
                <h3>Reporta tu problema:</h3>
                <form onSubmit={handleContactSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input 
                          type="text" 
                          name="nombre" 
                          placeholder="Nombre" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input 
                          type="text" 
                          name="apellido" 
                          placeholder="Apellido" 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Correo Electrónico" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <textarea 
                      name="descripcion" 
                      placeholder="Describe el problema o inconveniente que tienes..." 
                      rows="4" 
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-enviar">
                    <i className="fa fa-paper-plane"></i> Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row">
            {/* About Us Section */}
            <div className="col-lg-4">
              <div 
                id="footer-about"
                className={`scroll-animate fade-in scroll-delay-1 ${
                  visibleElements.has('footer-about') ? 'fade-in' : ''
                }`}
              >
                <div className="about-footer">
                  <h4>JobLink</h4>
                  <p>Somos la plataforma líder en conexión de talento con oportunidades. Nuestra misión es facilitar el encuentro entre profesionales y empresas, creando carreras exitosas y equipos productivos.</p>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="col-lg-4">
              <div 
                id="footer-links"
                className={`scroll-animate fade-in scroll-delay-2 ${
                  visibleElements.has('footer-links') ? 'fade-in' : ''
                }`}
              >
                <div className="quick-links">
                  <h4>Enlaces Rápidos</h4>
                  <ul>
                    <li><a href="#about">Sobre Nosotros</a></li>
                    <li><a href="#services">Servicios</a></li>
                    <li><a href="#portfolio">Oportunidades</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#contact">Contacto</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="col-lg-4">
              <div 
                id="footer-social"
                className={`scroll-animate fade-in scroll-delay-3 ${
                  visibleElements.has('footer-social') ? 'fade-in' : ''
                }`}
              >
                <div className="social-media">
                  <h4>Síguenos</h4>
                  <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-linkedin"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-instagram"></i>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </div>
                  <div className="contact-info">
                    <p><i className="fa fa-envelope"></i> info@joblink.com</p>
                    <p><i className="fa fa-phone"></i> +505 **** - ****</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="row">
            <div className="col-lg-12">
              <div 
                id="footer-copyright"
                className={`scroll-animate fade-in scroll-delay-4 ${
                  visibleElements.has('footer-copyright') ? 'fade-in' : ''
                }`}
              >
                <div className="copyright">
                  <p>© Copyright 2026 JobLink. Todos los Derechos Reservados. | Diseño: <a href="#">JobLink Team</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
