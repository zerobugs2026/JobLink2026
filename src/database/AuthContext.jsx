import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "./firebaseconfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Adaptación de los mensajes de error para Firebase Auth
const firebaseErrorMsg = (errorCode) => {
  const errorMap = {
    'auth/invalid-email': 'El formato del correo electrónico es inválido.',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
    'auth/user-not-found': 'No existe una cuenta con este correo.',
    'auth/wrong-password': 'Credenciales inválidas. Verifica tu correo y contraseña.',
    'auth/email-already-in-use': 'Este correo ya está registrado. Intenta iniciar sesión.',
    'auth/weak-password': 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.',
    'auth/too-many-requests': 'Demasiados intentos fallidos. Espera unos minutos e intenta de nuevo.',
    'auth/popup-closed-by-user': 'Operación cancelada.',
  };
  return errorMap[errorCode] || 'Error al procesar la solicitud. Intenta de nuevo.';
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
    // Escuchar el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Auth state changed. User:', currentUser ? currentUser.email : 'null');

      setUser(currentUser);
      setIsLoggedIn(!!currentUser);

      if (currentUser) {
        console.log('Usuario autenticado en Firebase. UID:', currentUser.uid);
        asignarRol(currentUser.email);

        // Obtener datos adicionales de la colección "users" en Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));

          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log('Datos del usuario cargados desde Firestore:', data);
            setUserData(data);
            setUserType(data.userType || null);
            localStorage.setItem('userData', JSON.stringify(data));

            // Lógica de eliminación programada (15 días)
            if (data.deletionRequestedAt) {
              const base = new Date(data.deletionRequestedAt).getTime();
              const fifteenDays = 15 * 24 * 60 * 60 * 1000;
              if (Date.now() - base >= fifteenDays) {
                try {
                  // Borrar el usuario de Auth
                  await currentUser.delete();
                } catch (e) {
                  console.warn("Error en proceso de borrado automático:", e);
                }
              }
            }
          } else {
            console.warn('No se encontró documento en la colección users para UID:', currentUser.uid);
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
    return () => unsubscribe();
  }, []);

  const asignarRol = (email) => {
    if (email === "desarrolladoressa2000@gmail.com") {  
      setRol("admin");
    } else {
      setRol("usuario");
    }
  };

  // Función de Cerrar Sesión con Firebase
  const logout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setRol(null);
    setUserData(null);
    setUserType(null);
    localStorage.removeItem('userData');
  };

  // Función de Inicio de Sesión con Firebase
  const login = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    try {
      // Intentar iniciar sesión en Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
      const firebaseUser = userCredential.user;

      // Buscar perfil en la colección de Firestore
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

      if (userDoc.exists()) {
        const data = userDoc.data();
        localStorage.setItem('userData', JSON.stringify(data));
        return redirectForUserType(data.userType);
      }

      // Si se autenticó pero no tiene perfil (caso raro), crearlo de inmediato
      const basicData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        userType: 'empleado',
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", firebaseUser.uid), basicData);
      localStorage.setItem('userData', JSON.stringify(basicData));
      return '/home-user';
    } catch (err) {
      throw new Error(firebaseErrorMsg(err.code));
    }
  };

  // Función de Registro con Firebase
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
      // Registrar en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      const firebaseUser = userCredential.user;

      // Construir el objeto de datos para Firestore
      const newProfile = {
        uid: firebaseUser.uid,
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

      // Guardar el perfil en la colección 'users' de Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), newProfile);

      localStorage.setItem('userData', JSON.stringify(newProfile));
      // Siempre redirigir a Home_User después del registro
      return '/home-user';
    } catch (err) {
      throw new Error(firebaseErrorMsg(err.code));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, rol, logout, login, register, userData, userType }}>
      {children}
    </AuthContext.Provider>
  );
};