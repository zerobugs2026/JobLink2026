import React, { createContext, useContext, useState, useEffect } from "react";
// 1. Importamos la instancia de conexión que configuramos antes
import { supabase } from "./supabaseconfig";

// Adaptación de los mensajes de error para Supabase Auth
const supabaseErrorMsg = (message) => {
  if (!message) return 'Error al procesar la solicitud. Intenta de nuevo.';
  
  const msg = message.toLowerCase();
  if (msg.includes('invalid login credentials') || msg.includes('wrong-password')) {
    return 'Credenciales inválidas. Verifica tu correo y contraseña.';
  }
  if (msg.includes('email already in use') || msg.includes('already registered')) {
    return 'Este correo ya está registrado. Intenta iniciar sesión.';
  }
  if (msg.includes('weak-password') || msg.includes('should be at least')) {
    return 'La contraseña es demasiado débil.';
  }
  if (msg.includes('invalid email')) {
    return 'El formato del correo electrónico es inválido.';
  }
  if (msg.includes('too many requests')) {
    return 'Demasiados intentos fallidos. Espera unos minutos e intenta de nuevo.';
  }
  return 'Error al procesar la solicitud. Intenta de nuevo.';
};

const redirectForUserType = (userType) => {
  if (userType === 'universitario') return '/university-user';
  if (userType === 'empresa') return '/perfil-empresa';
  return '/home-user';
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rol, setRol] = useState(null); 
  const [userData, setUserData] = useState(null); 
  const [userType, setUserType] = useState(null); 

  useEffect(() => {
    // 2. Escuchar el estado de autenticación de Supabase (Reemplaza a onAuthStateChanged)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null;
      console.log('Auth state changed. Event:', event, 'User:', currentUser ? currentUser.email : 'null');
      
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      
      if (currentUser) {
        console.log('Usuario autenticado en Supabase. UID:', currentUser.id);
        asignarRol(currentUser.email);
        
        // Obtener datos adicionales de la tabla "users" en PostgreSQL (Reemplaza a Firestore getDoc)
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("uid", currentUser.id)
            .maybeSingle();

          if (data && !error) {
            console.log('Datos del usuario cargados desde Supabase:', data);
            setUserData(data);
            setUserType(data.userType || null);
            localStorage.setItem('userData', JSON.stringify(data));

            // Lógica de eliminación programada (15 días) adaptada
            if (data.deletionRequestedAt) {
              const base = new Date(data.deletionRequestedAt).getTime();
              const fifteenDays = 15 * 24 * 60 * 60 * 1000;
              if (Date.now() - base >= fifteenDays) {
                try {
                  // Borrar de la tabla pública
                  await supabase.from("users").delete().eq("uid", currentUser.id);
                  // Nota: Para borrar el usuario de Auth por completo en Supabase se requiere una Edge Function/Admin,
                  // por lo que procedemos directamente a desloguearlo en el cliente.
                  await supabase.auth.signOut();
                } catch (e) {
                  console.warn("Error en proceso de borrado automático:", e);
                }
              }
            }
          } else {
            console.warn('No se encontró fila en la tabla users para UID:', currentUser.id);
          }
        } catch (e) {
          console.warn("Error al obtener datos del usuario:", e);
        }
      } else {
        console.log('Usuario desautenticado');
        setRol(null);
        setUserData(null);
        setUserType(null);
        localStorage.removeItem('userData');
      }
    });

    // Limpieza de la suscripción al desmontar el componente
    return () => subscription.unsubscribe();
  }, []);

  const asignarRol = (email) => {
    if (email === "desarrolladoressa2000@gmail.com") {  
      setRol("admin");
    } else {
      setRol("usuario");
    }
  };

  // 3. Función de Cerrar Sesión con Supabase
  const logout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setRol(null);
    setUserData(null);
    setUserType(null);
    localStorage.removeItem('userData');
  };

  // 4. Función de Inicio de Sesión con Supabase
  const login = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    try {
      // Intentar iniciar sesión en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password,
      });

      if (authError) throw authError;

      const supabaseUser = authData.user;

      // Buscar perfil en la tabla de base de datos
      const { data: userDoc, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('uid', supabaseUser.id)
        .single();

      if (userDoc && !dbError) {
        localStorage.setItem('userData', JSON.stringify(userDoc));
        return redirectForUserType(userDoc.userType);
      }

      // Si se autenticó pero no tiene perfil (caso raro), crearlo de inmediato
      const basicData = {
        uid: supabaseUser.id,
        email: supabaseUser.email,
        userType: 'empleado',
        createdAt: new Date().toISOString(),
      };

      await supabase.from('users').insert([basicData]);
      localStorage.setItem('userData', JSON.stringify(basicData));
      return '/home-user';
    } catch (err) {
      throw new Error(supabaseErrorMsg(err.message));
    }
  };

  // 5. Función de Registro con Supabase
  const register = async ({
    email,
    password,
    role,
    phone,
    first_name,
    middle_name,
    last_name,
    second_last_name,
    name,
  }) => {
    const normalizedEmail = email.trim().toLowerCase();
    try {
      // Registrar en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: password,
      });

      if (authError) throw authError;

      const supabaseUser = authData.user;

      // Construir el objeto de datos para la base de datos relacional
      const newProfile = {
        uid: supabaseUser.id,
        email: normalizedEmail,
        userType: role,
        createdAt: new Date().toISOString(),
      };

      if (role !== 'empresa') {
        newProfile.nombre1 = first_name;
        newProfile.nombre2 = middle_name || '';
        newProfile.apellido1 = last_name;
        newProfile.apellido2 = second_last_name || '';
        newProfile.celular = phone;
        newProfile.displayName = name || `${first_name} ${last_name}`;
      } else {
        newProfile.displayName = normalizedEmail.split('@')[0];
      }

      // Guardar el perfil en la tabla 'users' de Supabase (PostgreSQL)
      const { error: insertError } = await supabase.from('users').insert([newProfile]);
      if (insertError) throw insertError;

      localStorage.setItem('userData', JSON.stringify(newProfile));
      return redirectForUserType(role);
    } catch (err) {
      throw new Error(supabaseErrorMsg(err.message));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, rol, logout, login, register, userData, userType }}>
      {children}
    </AuthContext.Provider>
  );
};