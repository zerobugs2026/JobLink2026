import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../database/AuthContext.jsx';
import '../styles/PerfilEmpresa.css';

const PerfilEmpresa = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const nombre = userData?.name || 'Empresa';
  const email = userData?.email || '';
  const industria = userData?.industria || 'Sector no especificado';
  const ubicacion = userData?.ubicacion || 'Nicaragua';
  const sitioWeb = userData?.sitioWeb || '';
  const sobre = userData?.sobre || 'Agrega una descripción de tu empresa para atraer al mejor talento.';
  const empleados = userData?.empleados || '—';
  const fundacion = userData?.fundacion || '—';
  const vacantes = userData?.vacantes || [];

  const initials = nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="perfil-empresa-container">

      {/* Header banner */}
      <div className="empresa-header-banner">
        <div className="empresa-header-content">
          <button className="btn-volver-emp" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/>
            </svg>
            Inicio
          </button>
          <button className="btn-logout-emp" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
              <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"/>
            </svg>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="empresa-body container">

        {/* Tarjeta identidad empresa */}
        <div className="empresa-card empresa-identidad">
          <div className="empresa-logo-wrap">
            <div className="empresa-logo">
              {initials}
            </div>
            <div className="empresa-badge">Empresa</div>
          </div>

          <div className="empresa-info-principal">
            <h1>{nombre}</h1>
            <p className="empresa-industria">{industria}</p>
            <div className="empresa-meta">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,16a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,16Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,192Zm-8-80V80a8,8,0,0,1,16,0v32h24a8,8,0,0,1,0,16H128A8,8,0,0,1,120,120Z"/>
                </svg>
                {email}
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,16a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,16Zm37.66,130.34-48-48A8,8,0,0,1,128,88v64a8,8,0,0,1-16,0V88a8,8,0,0,1,13.66-5.66l48,48a8,8,0,0,1-11.32,11.32Z"/>
                </svg>
                {ubicacion}
              </span>
              {sitioWeb && (
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.5,87.5,0,0,1-1.5,16H175.5a145.27,145.27,0,0,0,0-32h38.92A87.5,87.5,0,0,1,216,128ZM40.08,144H79a145.27,145.27,0,0,0,0-32H40.08a87.91,87.91,0,0,0,0,32ZM128,216c-15.09,0-32.81-19.36-40.87-48h81.74C160.81,196.64,143.09,216,128,216Zm-43.13-64a129.18,129.18,0,0,1,0-48h86.26a129.18,129.18,0,0,1,0,48ZM128,40c15.09,0,32.81,19.36,40.87,48H87.13C95.19,59.36,112.91,40,128,40Z"/>
                  </svg>
                  {sitioWeb}
                </span>
              )}
            </div>
          </div>

          <button className="btn-editar-empresa" onClick={() => navigate('/editar-perfil')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
              <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"/>
            </svg>
            Editar perfil
          </button>
        </div>

        {/* Stats */}
        <div className="empresa-stats-row">
          <div className="empresa-stat-card">
            <div className="stat-icon stat-green">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,1.75-8.78l.28-.27A48,48,0,1,0,112,68a47.65,47.65,0,0,0,6.3,23.65,8,8,0,0,1-1.55,10A16,16,0,0,0,112,116H72a16,16,0,0,0-16,16v12a4,4,0,0,0,4,4h8v4a4,4,0,0,0,4,4h8v4a4,4,0,0,0,4,4H96v4a4,4,0,0,0,4,4H240a8,8,0,0,0,8-8V168A17.6,17.6,0,0,0,244.8,150.4Z"/>
              </svg>
            </div>
            <div>
              <span className="stat-valor">{vacantes.length}</span>
              <span className="stat-label">Vacantes activas</span>
            </div>
          </div>
          <div className="empresa-stat-card">
            <div className="stat-icon stat-blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.67,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
              </svg>
            </div>
            <div>
              <span className="stat-valor">{empleados}</span>
              <span className="stat-label">Empleados</span>
            </div>
          </div>
          <div className="empresa-stat-card">
            <div className="stat-icon stat-purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"/>
              </svg>
            </div>
            <div>
              <span className="stat-valor">{fundacion}</span>
              <span className="stat-label">Año fundación</span>
            </div>
          </div>
        </div>

        <div className="empresa-grid">

          {/* Sobre la empresa */}
          <div className="empresa-card empresa-card-full">
            <div className="empresa-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.66-13.45l-80,55.54A16,16,0,0,0,32,88.54V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96v112H144V96ZM48,88.54l80-55.54V208H48Z"/>
              </svg>
              <h3>Sobre la Empresa</h3>
            </div>
            <p className="empresa-sobre">{sobre}</p>
          </div>

          {/* Vacantes publicadas */}
          <div className="empresa-card empresa-card-full">
            <div className="empresa-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Z"/>
              </svg>
              <h3>Vacantes Publicadas</h3>
              <button className="btn-nueva-vacante">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>
                </svg>
                Nueva vacante
              </button>
            </div>

            {vacantes.length > 0 ? (
              <div className="vacantes-lista">
                {vacantes.map((v, i) => (
                  <div key={i} className="vacante-item">
                    <div className="vacante-info">
                      <h4>{v.titulo}</h4>
                      <div className="vacante-tags">
                        <span className="vtag vtag-tipo">{v.tipo || 'Tiempo completo'}</span>
                        <span className="vtag vtag-lugar">{v.modalidad || 'Presencial'}</span>
                      </div>
                    </div>
                    <div className="vacante-fecha">{v.fecha || 'Reciente'}</div>
                    <div className={`vacante-estado ${v.activa !== false ? 'activa' : 'cerrada'}`}>
                      {v.activa !== false ? 'Activa' : 'Cerrada'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empresa-vacio">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Z"/>
                </svg>
                <p>Aún no has publicado vacantes.</p>
                <p className="sub">Publica tu primera oferta y encuentra el talento ideal.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PerfilEmpresa;
