import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../database/AuthContext';
import '../styles/AuthLogin.css';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('byron@joblink.com');
  const [password, setPassword] = useState('Byron123!');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const redirectPath = await login(email, password);
      toast.success('Bienvenido a JobLink');
      nav(redirectPath);
    } catch (err) {
      toast.error(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jl-auth-login">
      <aside className="jl-auth-login__brand">
        <Link to="/" className="jl-auth-login__brand-logo">
          <div className="jl-auth-login__brand-logo-icon">
            <Briefcase size={20} />
          </div>
          <span className="jl-auth-login__brand-logo-text">JobLink</span>
        </Link>

        <div className="jl-auth-login__brand-content">
          <h1>Tu carrera comienza con la conexión correcta</h1>
          <p>
            La plataforma diseñada para que los graduados universitarios encuentren empleo según su carrera profesional, con inteligencia artificial real.
          </p>
          <div className="jl-auth-login__stats">
            <div>
              <div className="jl-auth-login__stat-num">12k+</div>
              <div className="jl-auth-login__stat-label">Empleos activos</div>
            </div>
            <div>
              <div className="jl-auth-login__stat-num">450+</div>
              <div className="jl-auth-login__stat-label">Empresas</div>
            </div>
            <div>
              <div className="jl-auth-login__stat-num">95%</div>
              <div className="jl-auth-login__stat-label">Compatibilidad IA</div>
            </div>
          </div>
        </div>

        <p className="jl-auth-login__brand-footer">© 2026 JobLink. Conectando talento con oportunidades.</p>
        <div className="jl-auth-login__blob-1" aria-hidden="true" />
        <div className="jl-auth-login__blob-2" aria-hidden="true" />
      </aside>

      <main className="jl-auth-login__form-panel">
        <div className="jl-auth-login__form-inner">
          <Link to="/" className="jl-auth-login__mobile-logo">
            <div className="jl-auth-login__mobile-logo-icon">
              <Briefcase size={20} />
            </div>
            <span className="jl-auth-login__mobile-logo-text">JobLink</span>
          </Link>

          <h2>Bienvenido de vuelta</h2>
          <p className="jl-auth-login__subtitle">Inicia sesión para continuar tu camino profesional.</p>

          <form onSubmit={submit}>
            <div className="jl-auth-login__field">
              <label htmlFor="login-email">Correo</label>
              <input
                id="login-email"
                data-testid="login-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="correo@ejemplo.com"
                autoComplete="email"
              />
            </div>
            <div className="jl-auth-login__field">
              <label htmlFor="login-password">Contraseña</label>
              <input
                id="login-password"
                data-testid="login-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={loading}
              className="jl-auth-login__submit"
            >
              {loading ? 'Iniciando...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="jl-auth-login__demo">
            <div className="jl-auth-login__demo-title">
              <Sparkles size={16} />
              Cuenta demo lista para usar
            </div>
            <div className="jl-auth-login__demo-creds">byron@joblink.com / Byron123!</div>
          </div>

          <p className="jl-auth-login__footer-link">
            ¿No tienes cuenta?{' '}
            <Link to="/register" data-testid="login-register-link">Crear cuenta</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
