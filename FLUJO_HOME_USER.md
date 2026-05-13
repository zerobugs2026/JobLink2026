# Flujo de Redirección a Home_User

## Descripción
Este documento describe cómo funciona el flujo de redirección cuando un usuario inicia sesión o crea su cuenta en JobLink.

## Vista Home_User
- **Ubicación**: `src/views/Home_User.jsx`
- **Estilo**: Interfaz tipo Facebook con header personalizado y feed de oportunidades
- **Características**:
  - Header estilo Facebook con búsqueda, navegación y notificaciones
  - 3 columnas: perfil (izquierda), feed (centro), actividad (derecha)
  - Oportunidades laborales en formato de posts
  - Interacciones sociales (me gusta, comentar, compartir)
  - Sistema de logros y gamificación

## Flujo de Implementación

### 1. Cuando el usuario INICIA SESIÓN (Login)
**Archivo**: `src/views/Login.jsx`

```jsx
// Después de validar credenciales exitosamente:
const handleLogin = async (e) => {
  e.preventDefault();
  
  // Validar credenciales
  const success = await validateCredentials(email, password);
  
  if (success) {
    // Guardar token/usuario en localStorage o contexto
    localStorage.setItem('user', JSON.stringify(userData));
    
    // REDIRIGIR A HOME_USER
    navigate('/home-user');
  }
};
```

### 2. Cuando el usuario CREA SU CUENTA (Register)
**Archivo**: `src/views/Register.jsx`

```jsx
// Después de completar el registro exitosamente:
const handleRegister = async (e) => {
  e.preventDefault();
  
  // Crear cuenta
  const success = await createAccount(formData);
  
  if (success) {
    // Guardar datos del usuario
    localStorage.setItem('user', JSON.stringify(userData));
    
    // REDIRIGIR A HOME_USER
    navigate('/home-user');
  }
};
```

### 3. Configuración de Rutas
**Archivo**: `App.jsx` o archivo de rutas principal

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home_User from './views/Home_User';
import Login from './views/Login';
import Register from './views/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home-user" element={
          <ProtectedRoute>
            <Home_User />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
```

### 4. Ruta Protegida (Opcional)
**Crear componente**: `src/components/ProtectedRoute.jsx`

```jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
```

## Checklist de Implementación

- [ ] **Login.jsx**: Modificar la función de login para redirigir a `/home-user` después de éxito
- [ ] **Register.jsx**: Modificar la función de registro para redirigir a `/home-user` después de éxito
- [ ] **App.jsx**: Agregar la ruta `/home-user` en el sistema de rutas
- [ ] **ProtectedRoute**: Crear componente para proteger la ruta (opcional pero recomendado)
- [ ] **Home_User.jsx**: Verificar que el componente carga correctamente los datos del usuario
- [ ] **Pruebas**: Probar el flujo completo: Login → Home_User y Register → Home_User

## Notas Importantes

1. **NO abrir vista de perfil**: Home_User es el dashboard principal, no la vista de perfil completo
2. **Header personalizado**: El header de Home_User es diferente al header principal de la aplicación
3. **Datos del usuario**: Home_User carga datos simulados, debe conectarse a tu backend/API real
4. **Navegación**: Desde Home_User se puede navegar a otras vistas (perfil, mensajería, etc.)

## Estructura de Datos del Usuario

Home_User espera recibir un objeto con esta estructura:

```javascript
{
  name: 'Nombre del usuario',
  email: 'correo@ejemplo.com',
  avatar: 'URL del avatar',
  title: 'Título profesional',
  location: 'Ubicación',
  experience: 'X+ Años',
  projects: 23,
  profileVisibility: 94,
  ranking: 'Top 15%'
}
```

## Próximos Pasos

1. Integrar Home_User con tu sistema de autenticación existente
2. Conectar los datos del usuario a tu backend
3. Implementar las funcionalidades de navegación desde Home_User
4. Agregar más contenido dinámico al feed de oportunidades
