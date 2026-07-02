import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVRvbejHzcfkZYswLcKJ-L0sAJFm6rOwg",
  authDomain: "jobling-94d55.firebaseapp.com",
  databaseURL: "https://jobling-94d55-default-rtdb.firebaseio.com",
  projectId: "jobling-94d55",
  storageBucket: "jobling-94d55.firebasestorage.app",
  messagingSenderId: "127639375491",
  appId: "1:127639375491:web:3016378fc49f3c6bb915b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

export { app, db, auth, storage };
