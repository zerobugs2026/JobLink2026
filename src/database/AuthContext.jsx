import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { appfirebase, db } from "./firebaseconfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rol, setRol] = useState(null); // Estado para el rol
  const [userData, setUserData] = useState(null); // Datos adicionales desde Firestore

  useEffect(() => {
    const auth = getAuth(appfirebase);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoggedIn(!!user);
      
      // Comprobar el rol basado en el correo del usuario y obtener datos de Firestore
      if (user) {
        asignarRol(user.email);
        
        // Obtener datos del usuario desde Firestore
        (async () => {
          try {
            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
              const d = snap.data();
              setUserData(d); // Guardar datos en el estado
              localStorage.setItem('userData', JSON.stringify(d)); // Guardar en localStorage
              
              // Verificar eliminación programada (15 días)
              if (d.deletionRequestedAt) {
                const base = d.deletionRequestedAt.toDate ? d.deletionRequestedAt.toDate().getTime() : d.deletionRequestedAt;
                const fifteenDays = 15 * 24 * 60 * 60 * 1000;
                if (Date.now() - base >= fifteenDays) {
                  // Intentar eliminación automática
                  try { await deleteDoc(ref); } catch {}
                  try { await deleteUser(auth.currentUser); } catch (e) { console.warn("Delete user requires recent login", e); }
                  try { await signOut(auth); } catch {}
                }
              }
            }
          } catch (e) {
            console.warn("Error al obtener datos del usuario:", e);
          }
        })();
      } else {
        setRol(null); // Si el usuario se desloguea, restablecer el rol
        setUserData(null); // Limpiar datos del usuario
        localStorage.removeItem('userData'); // Limpiar localStorage
      }
    });

    return () => unsubscribe();
  }, []);

  // Asignar rol basado en el correo
  const asignarRol = (email) => {
    // Aquí asignamos el rol según el correo. Por ejemplo, si el correo es del administrador.
    if (email === "desarrolladoressa2000@gmail.com") {  // Cambia esto con el correo del admin
      setRol("admin");
    } else {
      setRol("usuario");
    }
  };

  const logout = async () => {
    const auth = getAuth(appfirebase);
    await signOut(auth);
    setIsLoggedIn(false);
    setRol(null);
    setUserData(null);
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, rol, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
