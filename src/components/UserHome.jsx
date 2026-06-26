import React, { useState, useEffect } from 'react';

const UserHome = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Simular carga de datos del usuario después del login
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
        ranking: 'Top 15%',
        isNewUser: false
      };
      setUser(userData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Preparando tu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header específico para vistas de Usuario - Estilo Facebook */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo y navegación izquierda */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <i className="ph-fill ph-sparkle text-lg"></i>
                </div>
                <span className="text-xl font-bold text-gray-900">JobLink</span>
              </div>
              
              {/* Barra de búsqueda estilo Facebook */}
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar empleos, empresas..."
                    className="w-80 pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                  <i className="ph ph-magnifying-glass absolute left-3 top-2.5 text-gray-400"></i>
                </div>
              </div>
            </div>

            {/* Navegación central */}
            <nav className="hidden lg:flex items-center gap-1">
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
                <i className="ph-fill ph-house text-sm mr-2"></i>
                Inicio
              </button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">
                <i className="ph ph-briefcase text-sm mr-2"></i>
                Empleos
              </button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">
                <i className="ph ph-users text-sm mr-2"></i>
                Red
              </button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">
                <i className="ph ph-envelope text-sm mr-2"></i>
                Mensajes
              </button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">
                <i className="ph ph-bell text-sm mr-2"></i>
                Notificaciones
              </button>
            </nav>

            {/* Perfil y acciones derecha */}
            <div className="flex items-center gap-3">
              {/* Notificaciones con badge */}
              <div className="relative">
                <button 
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <i className="ph ph-bell text-xl text-gray-600"></i>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="ph ph-briefcase text-blue-600"></i>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Nueva oportunidad disponible</p>
                            <p className="text-xs text-gray-500">Google Cloud está buscando React Developers</p>
                            <p className="text-xs text-gray-400 mt-1">Hace 2 horas</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <i className="ph ph-eye text-green-600"></i>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Tu perfil fue visualizado</p>
                            <p className="text-xs text-gray-500">Microsoft HR vio tu perfil</p>
                            <p className="text-xs text-gray-400 mt-1">Hace 5 horas</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Menu de usuario */}
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.title}</p>
                </div>
                <div className="relative">
                  <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <i className="ph ph-caret-down text-gray-600"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Dashboard estilo Facebook */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Columna izquierda - Perfil y navegación */}
            <div className="lg:col-span-1">
              {/* Tarjeta de perfil */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3">
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{user.title}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                    <i className="ph ph-map-pin"></i>
                    <span>{user.location}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="font-bold text-gray-900">{user.experience}</p>
                      <p className="text-xs text-gray-500">Experiencia</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="font-bold text-gray-900">{user.projects}</p>
                      <p className="text-xs text-gray-500">Proyectos</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h4 className="font-bold text-gray-900 mb-3">Tu Progreso</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Visibilidad</span>
                      <span className="font-medium text-green-600">{user.profileVisibility}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: `${user.profileVisibility}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Ranking</span>
                      <span className="font-medium text-blue-600">{user.ranking}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna central - Feed principal */}
            <div className="lg:col-span-2">
              {/* Crear post/actualización */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <button className="flex-1 text-left text-gray-500 hover:bg-gray-100 rounded-full px-4 py-2 transition-colors">
                    ¿Qué novedades profesionales compartes hoy?
                  </button>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <i className="ph ph-image text-gray-600"></i>
                    <span className="text-sm text-gray-600">Foto</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <i className="ph ph-briefcase text-gray-600"></i>
                    <span className="text-sm text-gray-600">Logro</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <i className="ph ph-article text-gray-600"></i>
                    <span className="text-sm text-gray-600">Artículo</span>
                  </button>
                </div>
              </div>

              {/* Oportunidad destacada */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <i className="ph-fill ph-google-logo text-2xl text-blue-600"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Google Cloud</h4>
                      <p className="text-xs text-gray-500">Patrocinado • Hace 2 horas</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <i className="ph ph-dots-three"></i>
                  </button>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Lead React Architecture</h3>
                  <p className="text-gray-600 text-sm mb-3">Buscamos un Lead React Architecture para unirte a nuestro equipo de Cloud Platform. Ofrecemos salario competitivo y beneficios excepcionales.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">React</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">NextJS</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Cloud</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">98% Match</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">$160k<span className="text-sm text-gray-500">/año</span></p>
                      <p className="text-xs text-gray-500">California, US • Remoto</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Postular Ahora
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <i className="ph ph-thumbs-up"></i>
                    <span className="text-sm">Me gusta</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <i className="ph ph-chat-circle"></i>
                    <span className="text-sm">Comentar</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <i className="ph ph-share"></i>
                    <span className="text-sm">Compartir</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors ml-auto">
                    <i className="ph ph-bookmark"></i>
                    <span className="text-sm">Guardar</span>
                  </button>
                </div>
              </div>

              {/* Más oportunidades */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <i className="ph-fill ph-apple-logo text-2xl text-gray-900"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Apple</h4>
                      <p className="text-xs text-gray-500">Hace 5 horas</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Urgente</span>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Senior UX Engineer</h3>
                  <p className="text-gray-600 text-sm mb-3">Únete a nuestro equipo de diseño y desarrollo de experiencias de usuario innovadoras.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">UX/UI</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">Figma</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">Accessibility</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">$95k<span className="text-sm text-gray-500">/año</span></p>
                      <p className="text-xs text-gray-500">Remote Latam</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Postular
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <i className="ph ph-thumbs-up"></i>
                    <span className="text-sm">Me gusta</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <i className="ph ph-chat-circle"></i>
                    <span className="text-sm">Comentar</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <i className="ph ph-share"></i>
                    <span className="text-sm">Compartir</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Columna derecha - Recomendaciones y actividad */}
            <div className="lg:col-span-1">
              {/* Actividad reciente */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
                <h4 className="font-bold text-gray-900 mb-3">Actividad Reciente</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Postulación enviada</p>
                      <p className="text-xs text-gray-500">Google Cloud • Hace 2h</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Perfil actualizado</p>
                      <p className="text-xs text-gray-500">Nueva habilidad añadida • Ayer</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Nuevo logro</p>
                      <p className="text-xs text-gray-500">Perfil Completo • Hace 2 días</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logros */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm p-4 mb-4 text-white">
                <h4 className="font-bold mb-3">Tus Logros</h4>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-white/20 rounded-lg p-2 text-center">
                    <i className="ph-fill ph-medal text-xl mb-1"></i>
                    <p className="text-xs">Primer Post</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-2 text-center">
                    <i className="ph-fill ph-star text-xl mb-1"></i>
                    <p className="text-xs">Popular</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-2 text-center">
                    <i className="ph-fill ph-rocket text-xl mb-1"></i>
                    <p className="text-xs">Rápido</p>
                  </div>
                </div>
                <p className="text-xs text-white/80">3 de 10 logros desbloqueados</p>
              </div>

              {/* Personas sugeridas */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h4 className="font-bold text-gray-900 mb-3">Conectar con</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">María García</p>
                        <p className="text-xs text-gray-500">HR Manager</p>
                      </div>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Conectar</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">John Smith</p>
                        <p className="text-xs text-gray-500">Tech Lead</p>
                      </div>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Conectar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHome;
