import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  deleteUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { appfirebase, db } from "./firebaseconfig";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

const firebaseErrorMsg = (code) => {
  switch (code) {
    case 'auth/user-not-found':
      return 'No existe una cuenta con ese correo. Por favor regístrate.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Credenciales inválidas. Verifica tu correo y contraseña.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Espera unos minutos e intenta de nuevo.';
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido desactivada. Contacta soporte.';
    case 'auth/network-request-failed':
      return 'Sin conexión a internet. Verifica tu red.';
    case 'auth/invalid-email':
      return 'El formato del correo electrónico es inválido.';
    case 'auth/email-already-in-use':
      return 'Este correo ya está registrado. Intenta iniciar sesión.';
    case 'auth/weak-password':
      return 'La contraseña es demasiado débil.';
    case 'auth/operation-not-allowed':
      return 'El registro con correo/contraseña no está habilitado.';
    default:
      return 'Error al procesar la solicitud. Intenta de nuevo.';
  }
};

const redirectForUserType = (userType) => {
  if (userType === 'universitario') return '/university-user';
  if (userType === 'empresa') return '/perfil-empresa';
  return '/home-user';
};

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [rol, setRol] = useState(null); // Estado para el rol
  const [userData, setUserData] = useState(null); // Datos adicionales desde Firestore
  const [userType, setUserType] = useState(null); // Estado para el tipo de usuario

  // Asignar rol basado en el correo
  const asignarRol = (email) => {
    if (email === "desarrolladoressa2000@gmail.com") {
      setRol("admin");
    } else {
      setRol("usuario");
    }
  };

  useEffect(() => {
    const auth = getAuth(appfirebase);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed. User:', user ? user.email : 'null');
      setUser(user);
      setIsLoggedIn(!!user);
      
      // Comprobar el rol basado en el correo del usuario y obtener datos de Firestore
      if (user) {
        console.log('Usuario autenticado. UID:', user.uid);
        asignarRol(user.email);
        
        // Obtener datos del usuario desde Firestore
        (async () => {
          try {
            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);
            console.log('Documento de usuario encontrado:', snap.exists());
            if (snap.exists()) {
              const d = snap.data();
              console.log('Datos del usuario cargados:', d);
              console.log('Tipo de usuario:', d.userType);
              setUserData(d); // Guardar datos en el estado
              setUserType(d.userType || null); // Guardar el tipo de usuario
              localStorage.setItem('userData', JSON.stringify(d)); // Guardar en localStorage
              
              // Verificar eliminación programada (15 días)
              if (d.deletionRequestedAt) {
                const base = d.deletionRequestedAt.toDate ? d.deletionRequestedAt.toDate().getTime() : d.deletionRequestedAt;
                const fifteenDays = 15 * 24 * 60 * 60 * 1000;
                if (Date.now() - base >= fifteenDays) {
                  // Intentar eliminación automática
                  try { await deleteDoc(ref); } catch (e) { console.warn("Error al eliminar documento del usuario", e); }
                  try { await deleteUser(auth.currentUser); } catch (e) { console.warn("Delete user requires recent login", e); }
                  try { await signOut(auth); } catch (e) { console.warn("Error al cerrar sesión tras eliminación", e); }
                }
              }
            } else {
              console.warn('No se encontró documento en Firestore para UID:', user.uid);
            }
          } catch (e) {
            console.warn("Error al obtener datos del usuario:", e);
          }
        })();
      } else {
        console.log('Usuario desautenticado');
        setRol(null); // Si el usuario se desloguea, restablecer el rol
        setUserData(null); // Limpiar datos del usuario
        setUserType(null); // Limpiar el tipo de usuario
        localStorage.removeItem('userData'); // Limpiar localStorage
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    const auth = getAuth(appfirebase);
    await signOut(auth);
    setIsLoggedIn(false);
    setRol(null);
    setUserData(null);
    setUserType(null);
    localStorage.removeItem('userData');
  };

  const login = async (email, password) => {
    const auth = getAuth(appfirebase);
    const normalizedEmail = email.trim().toLowerCase();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
      const firebaseUser = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

      if (userDoc.exists()) {
        const data = userDoc.data();
        localStorage.setItem('userData', JSON.stringify(data));
        return redirectForUserType(data.userType);
      }

      const basicData = {
        email: firebaseUser.email,
        userType: 'empleado',
        uid: firebaseUser.uid,
        createdAt: new Date(),
      };
      await setDoc(doc(db, 'users', firebaseUser.uid), basicData);
      localStorage.setItem('userData', JSON.stringify(basicData));
      return '/home-user';
    } catch (err) {
      throw new Error(firebaseErrorMsg(err.code));
    }
  };

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
    const auth = getAuth(appfirebase);
    const normalizedEmail = email.trim().toLowerCase();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      const firebaseUser = userCredential.user;

      const userData = {
        email: normalizedEmail,
        userType: role,
        createdAt: new Date(),
        uid: firebaseUser.uid,
      };

      if (role !== 'empresa') {
        userData.nombre1 = first_name;
        userData.nombre2 = middle_name || '';
        userData.apellido1 = last_name;
        userData.apellido2 = second_last_name || '';
        userData.celular = phone;
        userData.displayName = name || `${first_name} ${last_name}`;
      } else {
        userData.displayName = normalizedEmail.split('@')[0];
      }

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      localStorage.setItem('userData', JSON.stringify(userData));
      return redirectForUserType(role);
    } catch (err) {
      throw new Error(firebaseErrorMsg(err.code));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isAuthLoading, rol, logout, login, register, userData, userType }}>
      {children}
    </AuthContext.Provider>
  );
};
