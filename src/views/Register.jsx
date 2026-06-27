import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../database/AuthContext';
import { toast } from 'sonner';
import {
  Briefcase, Sparkles, GraduationCap, BriefcaseBusiness, Sprout, Building2,
  User, Phone, Mail, Lock, Eye, EyeOff, ArrowRight, Rocket, Users,
  TrendingUp, ShieldCheck, Headphones, KeyRound,
} from 'lucide-react';
import '../styles/AuthRegister.css';

const ROLES = [
  { id: 'universitario', title: 'Universitario', subtitle: 'Estudiante universitario', icon: GraduationCap, iconClass: 'jl-auth-register__role-icon--uni' },
  { id: 'empleado', title: 'Empleado', subtitle: 'Profesional con experiencia', icon: BriefcaseBusiness, iconClass: 'jl-auth-register__role-icon--emp' },
  { id: 'sin_experiencia', title: 'Sin Experiencia', subtitle: 'Busco mi primera oportunidad', icon: Sprout, iconClass: 'jl-auth-register__role-icon--sin' },
  { id: 'empresa', title: 'Empresa', subtitle: 'Busco talento para mi empresa', icon: Building2, iconClass: 'jl-auth-register__role-icon--company' },
];

const FEATURES = [
  { icon: Briefcase, cls: 'jl-auth-register__feature-icon--blue', title: 'Encuentra oportunidades', text: 'Accede a ofertas de empleo, prácticas y proyectos que se ajusten a tu perfil.' },
  { icon: Rocket, cls: 'jl-auth-register__feature-icon--green', title: 'Crea tu perfil profesional', text: 'Destaca tus habilidades, experiencia y logros ante empresas y reclutadores.' },
  { icon: Users, cls: 'jl-auth-register__feature-icon--purple', title: 'Conecta y crece', text: 'Construye tu red profesional y crece junto a grandes empresas.' },
];

const TRUST = [
  { icon: ShieldCheck, title: 'Seguro y confiable', text: 'Tu información está protegida con los más altos estándares.' },
  { icon: Headphones, title: 'Soporte 24/7', text: 'Estamos aquí para ayudarte en cada paso del camino.' },
  { icon: KeyRound, title: 'Privacidad garantizada', text: 'Tu información personal está 100% segura.' },
];

function Field({ label, required, icon: Icon, children }) {
  return (
    <div className="jl-auth-register__field">
      <label>
        {label} {required && <span className="jl-auth-register__req">*</span>}
      </label>
      <div className="jl-auth-register__input-wrap">
        <Icon size={16} />
        {children}
      </div>
    </div>
  );
}

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [role, setRole] = useState('universitario');
  const [form, setForm] = useState({
    first_name: '', middle_name: '', last_name: '', second_last_name: '',
    phone: '', email: '', password: '', confirm: '', terms: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Las contraseñas no coinciden');
    if (form.password.length < 8) return toast.error('La contraseña debe tener mínimo 8 caracteres');
    if (!form.terms) return toast.error('Debes aceptar los términos');
    setLoading(true);
    try {
      const name = [form.first_name, form.middle_name, form.last_name, form.second_last_name].filter(Boolean).join(' ');
      const redirectPath = await register({
        name,
        email: form.email,
        password: form.password,
        role,
        phone: form.phone,
        first_name: form.first_name,
        middle_name: form.middle_name,
        last_name: form.last_name,
        second_last_name: form.second_last_name,
      });
      toast.success('¡Cuenta creada! Bienvenido a JobLink');
      nav(redirectPath);
    } catch (err) {
      toast.error(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const isEmpresa = role === 'empresa';

  return (
    <div className="jl-auth-register">
      <div className="jl-auth-register__wrap">
        <div className="jl-auth-register__grid">
          <div className="jl-auth-register__brand">
            <Link to="/" className="jl-auth-register__logo-row">
              <div className="jl-auth-register__logo-icon">
                <Briefcase size={24} />
              </div>
              <span className="jl-auth-register__logo-text">JOBLINK</span>
            </Link>

            <div className="jl-auth-register__pill">
              <Sparkles size={14} /> Tu futuro, conectado
            </div>

            <h1 className="jl-auth-register__hero-title">
              Más oportunidades,<br />
              <span className="jl-auth-register__gradient-text">mejor futuro.</span>
            </h1>
            <p className="jl-auth-register__hero-desc">
              Únete a JobLink y conecta con oportunidades reales que impulsarán tu carrera profesional.
            </p>

            <div className="jl-auth-register__features">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="jl-auth-register__feature">
                    <div className={`jl-auth-register__feature-icon ${f.cls}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3>{f.title}</h3>
                      <p>{f.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="jl-auth-register__hero-img">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
                alt="Graduados profesionales"
              />
              <div className="jl-auth-register__badge jl-auth-register__badge--tl">
                <div className="jl-auth-register__badge-inner">
                  <TrendingUp size={16} />
                  <div>
                    <div className="jl-auth-register__badge-num">+2K</div>
                    <div className="jl-auth-register__badge-label">Ofertas activas</div>
                  </div>
                </div>
              </div>
              <div className="jl-auth-register__badge jl-auth-register__badge--tr">
                <div className="jl-auth-register__badge-inner">
                  <Building2 size={16} />
                  <div>
                    <div className="jl-auth-register__badge-num">Empresas</div>
                    <div className="jl-auth-register__badge-label">confiables</div>
                  </div>
                </div>
              </div>
              <div className="jl-auth-register__badge jl-auth-register__badge--bc">
                <div className="jl-auth-register__badge-inner">
                  <Users size={16} />
                  <div>
                    <div className="jl-auth-register__badge-num">Miles</div>
                    <div className="jl-auth-register__badge-label">de usuarios</div>
                  </div>
                </div>
              </div>
              <div className="jl-auth-register__hero-overlay" aria-hidden="true" />
            </div>
          </div>

          <div className="jl-auth-register__card">
            <div className="jl-auth-register__card-header">
              <h2>Crea tu cuenta</h2>
              <p>Selecciona tu tipo de perfil y completa<br />tus datos para comenzar.</p>
            </div>

            <form onSubmit={submit}>
              <div className="jl-auth-register__section">
                <div className="jl-auth-register__section-head">
                  <span className="jl-auth-register__step">1</span>
                  <h3>Selecciona tu rol</h3>
                </div>
                <div className="jl-auth-register__roles">
                  {ROLES.map((r) => {
                    const Icon = r.icon;
                    const active = role === r.id;
                    return (
                      <button
                        type="button"
                        key={r.id}
                        data-testid={`role-${r.id}`}
                        onClick={() => setRole(r.id)}
                        className={`jl-auth-register__role${active ? ' jl-auth-register__role--active' : ''}`}
                      >
                        <div className={`jl-auth-register__role-icon ${r.iconClass}`}>
                          <Icon size={24} />
                        </div>
                        <div className="jl-auth-register__role-title">{r.title}</div>
                        <div className="jl-auth-register__role-sub">{r.subtitle}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="jl-auth-register__section">
                <div className="jl-auth-register__section-head">
                  <span className="jl-auth-register__step">2</span>
                  <h3>Información personal</h3>
                </div>

                {!isEmpresa && (
                  <div className="jl-auth-register__fields-grid">
                    <Field label="Primer nombre" required icon={User}>
                      <input data-testid="reg-first-name" value={form.first_name} onChange={set('first_name')} required placeholder="Ej. Juan" className="jl-auth-register__input" />
                    </Field>
                    <Field label="Segundo nombre" icon={User}>
                      <input data-testid="reg-middle-name" value={form.middle_name} onChange={set('middle_name')} placeholder="Ej. Carlos (Opcional)" className="jl-auth-register__input" />
                    </Field>
                    <Field label="Primer apellido" required icon={User}>
                      <input data-testid="reg-last-name" value={form.last_name} onChange={set('last_name')} required placeholder="Ej. Pérez" className="jl-auth-register__input" />
                    </Field>
                    <Field label="Segundo apellido" icon={User}>
                      <input data-testid="reg-second-last-name" value={form.second_last_name} onChange={set('second_last_name')} placeholder="Ej. López (Opcional)" className="jl-auth-register__input" />
                    </Field>
                  </div>
                )}

                {!isEmpresa && (
                  <div className="jl-auth-register__field-spacer">
                    <Field label="Número de celular" required icon={Phone}>
                      <input data-testid="reg-phone" value={form.phone} onChange={set('phone')} required placeholder="+505 0000 0000" className="jl-auth-register__input" />
                    </Field>
                  </div>
                )}

                <div className="jl-auth-register__field-spacer">
                  <Field label="Correo electrónico" required icon={Mail}>
                    <input data-testid="reg-email" type="email" value={form.email} onChange={set('email')} required placeholder="tu@correo.com" className="jl-auth-register__input" />
                  </Field>
                </div>

                <div className="jl-auth-register__field-spacer">
                  <Field label="Contraseña" required icon={Lock}>
                    <input data-testid="reg-password" type={showPwd ? 'text' : 'password'} value={form.password} onChange={set('password')} required minLength={8} placeholder="Mínimo 8 caracteres" className="jl-auth-register__input jl-auth-register__input--pwd" />
                    <button type="button" className="jl-auth-register__eye" onClick={() => setShowPwd(!showPwd)} aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </Field>
                </div>

                <div className="jl-auth-register__field-spacer">
                  <Field label="Confirmar contraseña" required icon={Lock}>
                    <input data-testid="reg-confirm" type={showPwd2 ? 'text' : 'password'} value={form.confirm} onChange={set('confirm')} required placeholder="Repite tu contraseña" className="jl-auth-register__input jl-auth-register__input--pwd" />
                    <button type="button" className="jl-auth-register__eye" onClick={() => setShowPwd2(!showPwd2)} aria-label={showPwd2 ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                      {showPwd2 ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </Field>
                </div>
              </div>

              <div className="jl-auth-register__section">
                <div className="jl-auth-register__section-head">
                  <span className="jl-auth-register__step">3</span>
                  <h3>Acepta los términos</h3>
                </div>
                <label className="jl-auth-register__terms">
                  <input data-testid="reg-terms" type="checkbox" checked={form.terms} onChange={set('terms')} />
                  <span>
                    Acepto los <span className="jl-auth-register__terms-link">Términos de Servicio</span> y la <span className="jl-auth-register__terms-link">Política de Privacidad</span> <span className="jl-auth-register__req">*</span>
                  </span>
                </label>
              </div>

              <button type="submit" data-testid="register-submit-button" disabled={loading} className="jl-auth-register__submit">
                {loading ? 'Creando cuenta...' : <>Crear cuenta <ArrowRight size={16} /></>}
              </button>

              <p className="jl-auth-register__login-link">
                ¿Ya tienes una cuenta? <Link to="/login" data-testid="register-login-link">Inicia sesión</Link>
              </p>
            </form>
          </div>
        </div>

        <div className="jl-auth-register__trust">
          <div className="jl-auth-register__trust-grid">
            {TRUST.map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={i} className="jl-auth-register__trust-item">
                  <div className="jl-auth-register__trust-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <strong>{t.title}</strong>
                    <span>{t.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
