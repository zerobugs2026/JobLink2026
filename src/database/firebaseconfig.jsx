import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVRvbejHzcfkZYswLcKJ-L0sAJFm6rOwg",
  authDomain: "jobling-94d55.firebaseapp.com",
  projectId: "jobling-94d55",
  storageBucket: "jobling-94d55.firebasestorage.app",
  messagingSenderId: "127639375491",
  appId: "1:127639375491:web:3016378fc49f3c6bb915b6",
};

// Inicializa Firebase
const appfirebase = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(appfirebase);

// Inicializa Authentication
const auth = getAuth(appfirebase);

const storage = getStorage(appfirebase); // ✅ Agregado

export { appfirebase, db, auth, storage }; // ✅ Exportado también
