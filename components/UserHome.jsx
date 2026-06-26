import React, { useState, useEffect } from 'react';

const UserHome = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos del usuario
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando tu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header para vistas de Usuario */}
      <UserHeader user={user} />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        
        {/* Sección de Perfil de Usuario */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Tarjeta de Perfil Principal */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-[2rem] text-white shadow-2xl">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-white/30 p-1 overflow-hidden">
                <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-black">{user.name}</h1>
                <p className="text-white/80 font-medium">{user.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <i className="ph-fill ph-map-pin text-sm"></i>
                  <span className="text-sm text-white/70">{user.location}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
                <p className="text-xs font-bold text-white/70 uppercase">Experiencia</p>
                <p className="text-xl font-black">{user.experience}</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
                <p className="text-xs font-bold text-white/70 uppercase">Proyectos</p>
                <p className="text-xl font-black">{user.projects}</p>
              </div>
            </div>

            <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg">
              Editar Perfil
            </button>
          </div>
          
          {/* Tarjeta de Estadísticas */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Visibilidad del Perfil</p>
              <p className="text-2xl font-black text-green-600">{user.profileVisibility}% Excelente</p>
              <p className="text-xs text-slate-500 mt-1">Tu perfil es muy atractivo para reclutadores</p>
            </div>
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <i className="ph-fill ph-chart-line-up text-2xl"></i>
            </div>
          </div>

          {/* Tarjeta de Popularidad */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Ranking Popular</p>
              <p className="text-2xl font-black text-blue-600">{user.ranking}</p>
              <p className="text-xs text-slate-500 mt-1">Entre los candidatos más buscados</p>
            </div>
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <i className="ph-fill ph-trophy text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Columna de Actividad y Logros */}
          <aside className="lg:w-1/4 space-y-6">
            {/* Actividad Reciente */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-lg font-black mb-6">Actividad Reciente</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ph-fill ph-check text-xs text-green-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Postulación enviada</p>
                    <p className="text-xs text-slate-500">Google Cloud • Hace 2h</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ph-fill ph-eye text-xs text-blue-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Perfil visualizado</p>
                    <p className="text-xs text-slate-500">Microsoft • Hace 5h</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ph-fill ph-star text-xs text-purple-600"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Nuevo logro</p>
                    <p className="text-xs text-slate-500">Perfil Completo • Ayer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logros y Badges */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 rounded-[2.5rem] text-white">
              <h4 className="text-sm font-bold text-green-400 mb-4 tracking-widest uppercase">Tus Logros</h4>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <i className="ph-fill ph-medal text-xl"></i>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <i className="ph-fill ph-star text-xl"></i>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <i className="ph-fill ph-rocket text-xl"></i>
                </div>
              </div>
              <p className="text-xs text-white/70">3 de 10 logros desbloqueados</p>
            </div>
          </aside>

          {/* Oportunidades Populares */}
          <div className="lg:flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black">Oportunidades Populares para Ti</h2>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
                  <i className="ph ph-list text-xl"></i>
                </button>
                <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <i className="ph ph-squares-four text-xl"></i>
                </button>
              </div>
            </div>

            {/* Feed de Oportunidades */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Oportunidad 1 */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-2">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 p-2">
                    <i className="ph-fill ph-google-logo text-3xl text-blue-600"></i>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">98% Match</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">Lead React Architecture</h3>
                <p className="text-sm font-bold text-slate-400 mb-4">Google Cloud • California, US</p>
                
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-black px-2 py-1 bg-slate-100 text-slate-500 rounded-md uppercase">NextJS</span>
                    <span className="text-[10px] font-black px-2 py-1 bg-slate-100 text-slate-500 rounded-md uppercase">Microfrontends</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                    <p className="text-lg font-black">$160k<span className="text-xs font-medium text-slate-400">/año</span></p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">Postular</button>
                  </div>
                </div>
              </div>

              {/* Oportunidad 2 */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-2">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 p-2">
                    <i className="ph-fill ph-apple-logo text-3xl text-slate-900"></i>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Urgente</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">Senior UX Engineer</h3>
                <p className="text-sm font-bold text-slate-400 mb-4">Apple • Remote (Latam)</p>
                
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-black px-2 py-1 bg-slate-100 text-slate-500 rounded-md uppercase">Figma to Code</span>
                    <span className="text-[10px] font-black px-2 py-1 bg-slate-100 text-slate-500 rounded-md uppercase">A11Y</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                    <p className="text-lg font-black">$95k<span class="text-xs font-medium text-slate-400">/año</span></p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">Postular</button>
                  </div>
                </div>
              </div>

              {/* Oportunidad Destacada (Ancha) */}
              <div className="bg-white p-8 md:col-span-2 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-white to-blue-50">
                <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl shadow-xl shadow-indigo-200 shrink-0">
                  <i className="ph ph-lightning"></i>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-black">Fullstack Engineer (Startup Growth)</h3>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">Stock Options</span>
                  </div>
                  <p className="text-slate-500 font-medium">Stripe • Remote Europe • Hace 2 horas</p>
                  <p className="text-sm text-slate-400 line-clamp-2">Sé parte del equipo fundacional para nuevos mercados en Europa. Buscamos expertos en Node.js y React con mentalidad de producto.</p>
                </div>
                <div className="shrink-0 text-center md:text-right">
                  <p className="text-2xl font-black text-slate-900 mb-4">$110k - $140k</p>
                  <button className="px-10 py-4 bg-green-600 text-white rounded-2xl font-extrabold shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all">Aplicación Rápida</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Header específico para vistas de Usuario
const UserHeader = ({ user }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/90 backdrop-blur-lg p-4 rounded-[2rem] shadow-lg border border-white/20">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <i className="ph-fill ph-sparkle text-lg"></i>
            </div>
            <span className="text-lg font-black tracking-tighter">JobLink</span>
          </div>
          
          {/* Navegación del Usuario */}
          <nav className="hidden md:flex items-center gap-6">
            <button className="text-sm font-bold text-blue-600">Mi Dashboard</button>
            <button className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Mi Perfil</button>
            <button className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Postulaciones</button>
            <button className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Mensajes</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Notificaciones */}
          <div className="relative">
            <button 
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="ph ph-bell text-xl"></i>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
                <h4 className="font-bold mb-3">Notificaciones</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-sm font-semibold">Nueva postulación recibida</p>
                    <p className="text-xs text-slate-500">Google Cloud • Hace 2h</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-sm font-semibold">Tu perfil fue visualizado</p>
                    <p className="text-xs text-slate-500">Microsoft • Hace 5h</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Configuración */}
          <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <i className="ph ph-gear text-xl"></i>
          </button>

          {/* Avatar y Menu */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.title}</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-blue-600 p-0.5 overflow-hidden cursor-pointer hover:border-blue-700 transition-colors">
              <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHome;
