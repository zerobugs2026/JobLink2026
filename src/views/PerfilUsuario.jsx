import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../database/AuthContext.jsx';
import '../styles/PerfilUsuario.css';

const PerfilUsuario = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const nombre = userData?.name || 'Usuario';
  const email = userData?.email || '';
  const titulo = userData?.titulo || 'Profesional en búsqueda de oportunidades';
  const ubicacion = userData?.ubicacion || 'Nicaragua';
  const sobre = userData?.sobre || 'Agrega una descripción sobre ti para que las empresas te conozcan mejor.';
  const habilidades = userData?.habilidades || [];
  const experiencia = userData?.experiencia || [];
  const educacion = userData?.educacion || [];

  const initials = nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="perfil-usuario-container">

      {/* Header con gradiente */}
      <div className="perfil-header-banner">
        <div className="perfil-header-content">
          <button className="btn-volver" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/>
            </svg>
            Inicio
          </button>
          <button className="btn-logout-header" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
              <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"/>
            </svg>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="perfil-body container">

        {/* Tarjeta principal de identidad */}
        <div className="perfil-card perfil-identidad">
          <div className="perfil-avatar-wrap">
            <div className="perfil-avatar">
              {initials}
            </div>
            <div className="perfil-badge-tipo">Candidato</div>
          </div>
          <div className="perfil-info-principal">
            <h1>{nombre}</h1>
            <p className="perfil-titulo">{titulo}</p>
            <div className="perfil-meta">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,16a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,16Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,192Zm-8-80V80a8,8,0,0,1,16,0v32h24a8,8,0,0,1,0,16H128A8,8,0,0,1,120,120Z"/>
                </svg>
                {email}
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,16a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,16Zm37.66,130.34-48-48A8,8,0,0,1,128,88v64a8,8,0,0,1-16,0V88a8,8,0,0,1,13.66-5.66l48,48a8,8,0,0,1-11.32,11.32Z"/>
                </svg>
                {ubicacion}
              </span>
            </div>
          </div>
          <button className="btn-editar-perfil" onClick={() => navigate('/editar-perfil')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
              <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"/>
            </svg>
            Editar perfil
          </button>
        </div>

        <div className="perfil-grid">

          {/* Sobre mí */}
          <div className="perfil-card">
            <div className="perfil-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.67,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
              </svg>
              <h3>Sobre mí</h3>
            </div>
            <p className="perfil-sobre">{sobre}</p>
          </div>

          {/* Habilidades */}
          <div className="perfil-card">
            <div className="perfil-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136ZM184,80H40A16,16,0,0,0,24,96V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V96A16,16,0,0,0,184,80Zm0,120H40V96H184V200ZM72,56a8,8,0,0,1,8-8H176a8,8,0,0,1,0,16H80A8,8,0,0,1,72,56ZM56,24a8,8,0,0,1,8-8H192a8,8,0,0,1,0,16H64A8,8,0,0,1,56,24Z"/>
              </svg>
              <h3>Habilidades</h3>
            </div>
            {habilidades.length > 0 ? (
              <div className="habilidades-tags">
                {habilidades.map((h, i) => (
                  <span key={i} className="habilidad-tag">{h}</span>
                ))}
              </div>
            ) : (
              <p className="perfil-vacio">Agrega tus habilidades para destacar ante las empresas.</p>
            )}
          </div>

          {/* Experiencia */}
          <div className="perfil-card perfil-card-full">
            <div className="perfil-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Z"/>
              </svg>
              <h3>Experiencia Laboral</h3>
            </div>
            {experiencia.length > 0 ? (
              <div className="timeline">
                {experiencia.map((exp, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>{exp.cargo}</h4>
                      <span className="timeline-empresa">{exp.empresa}</span>
                      <span className="timeline-fecha">{exp.periodo}</span>
                      {exp.descripcion && <p>{exp.descripcion}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="perfil-vacio">Aún no has agregado experiencia laboral.</p>
            )}
          </div>

          {/* Educación */}
          <div className="perfil-card perfil-card-full">
            <div className="perfil-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87V176a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V117.87l19.76-10.81a8,8,0,0,0,0-14.12ZM208,176H48V125.87l72,39.43a8,8,0,0,0,7.52,0l80-43.81V176ZM128,149.25,28.05,96,128,42.75,227.95,96Z"/>
              </svg>
              <h3>Educación</h3>
            </div>
            {educacion.length > 0 ? (
              <div className="timeline">
                {educacion.map((edu, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot timeline-dot-blue"></div>
                    <div className="timeline-content">
                      <h4>{edu.titulo}</h4>
                      <span className="timeline-empresa">{edu.institucion}</span>
                      <span className="timeline-fecha">{edu.periodo}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="perfil-vacio">Aún no has agregado tu educación.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
