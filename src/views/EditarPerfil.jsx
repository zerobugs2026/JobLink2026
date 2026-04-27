import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../database/AuthContext.jsx';
import { db } from '../database/firebaseconfig.jsx';
import '../styles/EditarPerfil.css';

const EXP_VACIA = { cargo: '', empresa: '', periodo: '', descripcion: '' };
const EDU_VACIA = { titulo: '', institucion: '', periodo: '' };

const EditarPerfil = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const isEmpresa = userData?.type === 'empresa';

  const [form, setForm] = useState({
    name: userData?.name || '',
    ubicacion: userData?.ubicacion || '',
    sobre: userData?.sobre || '',
    titulo: userData?.titulo || '',
    habilidades: (userData?.habilidades || []).join(', '),
    industria: userData?.industria || '',
    sitioWeb: userData?.sitioWeb || '',
    empleados: userData?.empleados || '',
    fundacion: userData?.fundacion || '',
    experiencia: userData?.experiencia?.length ? userData.experiencia : [{ ...EXP_VACIA }],
    educacion: userData?.educacion?.length ? userData.educacion : [{ ...EDU_VACIA }],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleListChange = (lista, index, campo, valor) => {
    const actualizado = form[lista].map((item, i) =>
      i === index ? { ...item, [campo]: valor } : item
    );
    setForm({ ...form, [lista]: actualizado });
  };

  const agregarItem = (lista, plantilla) => {
    setForm({ ...form, [lista]: [...form[lista], { ...plantilla }] });
  };

  const eliminarItem = (lista, index) => {
    const actualizado = form[lista].filter((_, i) => i !== index);
    setForm({ ...form, [lista]: actualizado.length ? actualizado : [lista === 'experiencia' ? { ...EXP_VACIA } : { ...EDU_VACIA }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const habilidadesArray = form.habilidades
        .split(',')
        .map(h => h.trim())
        .filter(h => h.length > 0);

      const datos = {
        name: form.name,
        ubicacion: form.ubicacion,
        sobre: form.sobre,
        ...(isEmpresa
          ? {
              industria: form.industria,
              sitioWeb: form.sitioWeb,
              empleados: form.empleados,
              fundacion: form.fundacion,
            }
          : {
              titulo: form.titulo,
              habilidades: habilidadesArray,
              experiencia: form.experiencia.filter(e => e.cargo || e.empresa),
              educacion: form.educacion.filter(e => e.titulo || e.institucion),
            }
        ),
      };

      await updateDoc(doc(db, 'users', user.uid), datos);
      localStorage.setItem('userData', JSON.stringify({ ...userData, ...datos }));

      setSuccess(true);
      setTimeout(() => {
        navigate(isEmpresa ? '/perfil-empresa' : '/perfil');
      }, 1500);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al guardar los cambios. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const accentColor = isEmpresa ? '#1D4ED8' : '#16A34A';
  const gradientClass = isEmpresa ? 'editar-header-empresa' : 'editar-header-usuario';

  return (
    <div className="editar-perfil-container">

      {/* Header */}
      <div className={`editar-header-banner ${gradientClass}`}>
        <div className="editar-header-content">
          <button
            className="btn-cancelar"
            onClick={() => navigate(isEmpresa ? '/perfil-empresa' : '/perfil')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/>
            </svg>
            Cancelar
          </button>
          <div className="editar-header-titulo">
            <h2>Editar {isEmpresa ? 'Perfil de Empresa' : 'Perfil de Usuario'}</h2>
            <p>{isEmpresa ? 'Actualiza la información de tu empresa' : 'Actualiza tu información personal'}</p>
          </div>
        </div>
      </div>

      <div className="editar-body">
        <form className="editar-form" onSubmit={handleSubmit}>

          {success && (
            <div className="editar-alert editar-alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>
              </svg>
              ¡Perfil actualizado! Redirigiendo...
            </div>
          )}

          {error && (
            <div className="editar-alert editar-alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M236.8,188.09,149.35,36.22a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/>
              </svg>
              {error}
            </div>
          )}

          {/* Sección: Información General */}
          <div className="editar-seccion">
            <div className="editar-seccion-titulo">
              <div className="seccion-dot" style={{ background: accentColor }}></div>
              <h3>Información General</h3>
            </div>
            <div className="editar-campos">
              <div className="campo-grupo campo-full">
                <label htmlFor="name">{isEmpresa ? 'Nombre de la Empresa' : 'Nombre Completo'}</label>
                <div className="campo-input-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" style={{ color: accentColor }}>
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.67,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
                  </svg>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={isEmpresa ? 'Tech Solutions S.A.' : 'Juan Pérez'}
                    required
                  />
                </div>
              </div>

              <div className="campo-grupo">
                <label htmlFor="ubicacion">Ubicación</label>
                <div className="campo-input-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" style={{ color: accentColor }}>
                    <path d="M128,16a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,16Zm37.66,130.34-48-48A8,8,0,0,1,128,88v64a8,8,0,0,1-16,0V88a8,8,0,0,1,13.66-5.66l48,48a8,8,0,0,1-11.32,11.32Z"/>
                  </svg>
                  <input
                    type="text"
                    id="ubicacion"
                    name="ubicacion"
                    value={form.ubicacion}
                    onChange={handleChange}
                    placeholder="Managua, Nicaragua"
                  />
                </div>
              </div>

              {!isEmpresa && (
                <div className="campo-grupo">
                  <label htmlFor="titulo">Título profesional</label>
                  <div className="campo-input-wrap">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" style={{ color: accentColor }}>
                      <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Z"/>
                    </svg>
                    <input
                      type="text"
                      id="titulo"
                      name="titulo"
                      value={form.titulo}
                      onChange={handleChange}
                      placeholder="Desarrollador Web | Diseñador UX"
                    />
                  </div>
                </div>
              )}

              {isEmpresa && (
                <>
                  <div className="campo-grupo">
                    <label htmlFor="industria">Industria / Sector</label>
                    <div className="campo-input-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" style={{ color: accentColor }}>
                        <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.66-13.45l-80,55.54A16,16,0,0,0,32,88.54V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96v112H144V96ZM48,88.54l80-55.54V208H48Z"/>
                      </svg>
                      <input
                        type="text"
                        id="industria"
                        name="industria"
                        value={form.industria}
                        onChange={handleChange}
                        placeholder="Tecnología, Educación, Salud..."
                      />
                    </div>
                  </div>

                  <div className="campo-grupo">
                    <label htmlFor="sitioWeb">Sitio Web</label>
                    <div className="campo-input-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" style={{ color: accentColor }}>
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.5,87.5,0,0,1-1.5,16H175.5a145.27,145.27,0,0,0,0-32h38.92A87.5,87.5,0,0,1,216,128ZM40.08,144H79a145.27,145.27,0,0,0,0-32H40.08a87.91,87.91,0,0,0,0,32ZM128,216c-15.09,0-32.81-19.36-40.87-48h81.74C160.81,196.64,143.09,216,128,216Zm-43.13-64a129.18,129.18,0,0,1,0-48h86.26a129.18,129.18,0,0,1,0,48ZM128,40c15.09,0,32.81,19.36,40.87,48H87.13C95.19,59.36,112.91,40,128,40Z"/>
                      </svg>
                      <input
                        type="url"
                        id="sitioWeb"
                        name="sitioWeb"
                        value={form.sitioWeb}
                        onChange={handleChange}
                        placeholder="https://miempresa.com"
                      />
                    </div>
                  </div>

                  <div className="campo-grupo">
                    <label htmlFor="empleados">Número de empleados</label>
                    <div className="campo-input-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" style={{ color: accentColor }}>
                        <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,1.75-8.78l.28-.27A48,48,0,1,0,112,68a47.65,47.65,0,0,0,6.3,23.65,8,8,0,0,1-1.55,10A16,16,0,0,0,112,116H72a16,16,0,0,0-16,16v12a4,4,0,0,0,4,4h8v4a4,4,0,0,0,4,4h8v4a4,4,0,0,0,4,4H96v4a4,4,0,0,0,4,4H240a8,8,0,0,0,8-8V168A17.6,17.6,0,0,0,244.8,150.4Z"/>
                      </svg>
                      <input
                        type="text"
                        id="empleados"
                        name="empleados"
                        value={form.empleados}
                        onChange={handleChange}
                        placeholder="10-50, 51-200..."
                      />
                    </div>
                  </div>

                  <div className="campo-grupo">
                    <label htmlFor="fundacion">Año de fundación</label>
                    <div className="campo-input-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" style={{ color: accentColor }}>
                        <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"/>
                      </svg>
                      <input
                        type="number"
                        id="fundacion"
                        name="fundacion"
                        value={form.fundacion}
                        onChange={handleChange}
                        placeholder="2010"
                        min="1900"
                        max="2026"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sección: Sobre */}
          <div className="editar-seccion">
            <div className="editar-seccion-titulo">
              <div className="seccion-dot" style={{ background: accentColor }}></div>
              <h3>{isEmpresa ? 'Sobre la Empresa' : 'Sobre mí'}</h3>
            </div>
            <div className="editar-campos">
              <div className="campo-grupo campo-full">
                <label htmlFor="sobre">{isEmpresa ? 'Descripción de la empresa' : 'Descripción personal'}</label>
                <textarea
                  id="sobre"
                  name="sobre"
                  value={form.sobre}
                  onChange={handleChange}
                  rows={5}
                  placeholder={
                    isEmpresa
                      ? 'Describe a qué se dedica tu empresa, misión, visión y cultura...'
                      : 'Cuéntale a las empresas sobre ti, tus objetivos y experiencia...'
                  }
                />
              </div>
            </div>
          </div>

          {/* Solo candidatos */}
          {!isEmpresa && (
            <>
              {/* Sección: Habilidades */}
              <div className="editar-seccion">
                <div className="editar-seccion-titulo">
                  <div className="seccion-dot" style={{ background: accentColor }}></div>
                  <h3>Habilidades</h3>
                </div>
                <div className="editar-campos">
                  <div className="campo-grupo campo-full">
                    <label htmlFor="habilidades">Habilidades <span className="campo-hint">(separadas por comas)</span></label>
                    <div className="campo-input-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" style={{ color: accentColor }}>
                        <path d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136ZM184,80H40A16,16,0,0,0,24,96V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V96A16,16,0,0,0,184,80Zm0,120H40V96H184V200Z"/>
                      </svg>
                      <input
                        type="text"
                        id="habilidades"
                        name="habilidades"
                        value={form.habilidades}
                        onChange={handleChange}
                        placeholder="React, JavaScript, Diseño UX, Python..."
                      />
                    </div>
                    {form.habilidades && (
                      <div className="habilidades-preview">
                        {form.habilidades.split(',').map(h => h.trim()).filter(h => h).map((h, i) => (
                          <span key={i} className="habilidad-preview-tag">{h}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sección: Experiencia Laboral */}
              <div className="editar-seccion">
                <div className="editar-seccion-titulo">
                  <div className="seccion-dot" style={{ background: accentColor }}></div>
                  <h3>Experiencia Laboral</h3>
                </div>

                <div className="lista-dinamica">
                  {form.experiencia.map((exp, i) => (
                    <div key={i} className="item-dinamico">
                      <div className="item-dinamico-header">
                        <span className="item-numero">Experiencia {i + 1}</span>
                        {form.experiencia.length > 1 && (
                          <button
                            type="button"
                            className="btn-eliminar-item"
                            onClick={() => eliminarItem('experiencia', i)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/>
                            </svg>
                            Eliminar
                          </button>
                        )}
                      </div>
                      <div className="item-campos">
                        <div className="campo-grupo">
                          <label>Cargo / Puesto</label>
                          <div className="campo-input-wrap">
                            <input
                              type="text"
                              value={exp.cargo}
                              onChange={e => handleListChange('experiencia', i, 'cargo', e.target.value)}
                              placeholder="Desarrollador Frontend"
                            />
                          </div>
                        </div>
                        <div className="campo-grupo">
                          <label>Empresa</label>
                          <div className="campo-input-wrap">
                            <input
                              type="text"
                              value={exp.empresa}
                              onChange={e => handleListChange('experiencia', i, 'empresa', e.target.value)}
                              placeholder="Tech Solutions S.A."
                            />
                          </div>
                        </div>
                        <div className="campo-grupo">
                          <label>Período</label>
                          <div className="campo-input-wrap">
                            <input
                              type="text"
                              value={exp.periodo}
                              onChange={e => handleListChange('experiencia', i, 'periodo', e.target.value)}
                              placeholder="Ene 2022 – Dic 2023"
                            />
                          </div>
                        </div>
                        <div className="campo-grupo campo-full">
                          <label>Descripción <span className="campo-hint">(opcional)</span></label>
                          <textarea
                            value={exp.descripcion}
                            onChange={e => handleListChange('experiencia', i, 'descripcion', e.target.value)}
                            rows={3}
                            placeholder="Describe tus responsabilidades y logros..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn-agregar-item"
                  style={{ color: accentColor, borderColor: accentColor }}
                  onClick={() => agregarItem('experiencia', EXP_VACIA)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>
                  </svg>
                  Agregar experiencia
                </button>
              </div>

              {/* Sección: Educación */}
              <div className="editar-seccion">
                <div className="editar-seccion-titulo">
                  <div className="seccion-dot" style={{ background: accentColor }}></div>
                  <h3>Educación</h3>
                </div>

                <div className="lista-dinamica">
                  {form.educacion.map((edu, i) => (
                    <div key={i} className="item-dinamico">
                      <div className="item-dinamico-header">
                        <span className="item-numero">Educación {i + 1}</span>
                        {form.educacion.length > 1 && (
                          <button
                            type="button"
                            className="btn-eliminar-item"
                            onClick={() => eliminarItem('educacion', i)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/>
                            </svg>
                            Eliminar
                          </button>
                        )}
                      </div>
                      <div className="item-campos">
                        <div className="campo-grupo campo-full">
                          <label>Título / Grado</label>
                          <div className="campo-input-wrap">
                            <input
                              type="text"
                              value={edu.titulo}
                              onChange={e => handleListChange('educacion', i, 'titulo', e.target.value)}
                              placeholder="Ingeniería en Sistemas"
                            />
                          </div>
                        </div>
                        <div className="campo-grupo">
                          <label>Institución</label>
                          <div className="campo-input-wrap">
                            <input
                              type="text"
                              value={edu.institucion}
                              onChange={e => handleListChange('educacion', i, 'institucion', e.target.value)}
                              placeholder="UNAN-Managua"
                            />
                          </div>
                        </div>
                        <div className="campo-grupo">
                          <label>Período</label>
                          <div className="campo-input-wrap">
                            <input
                              type="text"
                              value={edu.periodo}
                              onChange={e => handleListChange('educacion', i, 'periodo', e.target.value)}
                              placeholder="2020 – 2025"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn-agregar-item"
                  style={{ color: accentColor, borderColor: accentColor }}
                  onClick={() => agregarItem('educacion', EDU_VACIA)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>
                  </svg>
                  Agregar educación
                </button>
              </div>
            </>
          )}

          {/* Botones */}
          <div className="editar-actions">
            <button
              type="button"
              className="btn-cancelar-form"
              onClick={() => navigate(isEmpresa ? '/perfil-empresa' : '/perfil')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-guardar"
              style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${isEmpresa ? '#16A34A' : '#1D4ED8'} 100%)` }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Guardando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M219.31,72,184,36.69A15.86,15.86,0,0,0,172.69,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V83.31A15.86,15.86,0,0,0,219.31,72ZM168,208H88V152h80Zm40,0H184V152a16,16,0,0,0-16-16H88a16,16,0,0,0-16,16v56H48V48H172.69L208,83.31ZM160,72a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h40A8,8,0,0,1,160,72Z"/>
                  </svg>
                  Guardar cambios
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
