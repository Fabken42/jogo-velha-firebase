import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCOQ-0eRh3TV7_ZhiRKstygDnYFqh-AOyI",
  authDomain: "jogo-velha-multiplayer.firebaseapp.com",
  projectId: "jogo-velha-multiplayer",
  storageBucket: "jogo-velha-multiplayer.appspot.com",
  messagingSenderId: "412451590542",
  appId: "1:412451590542:web:2f333125ae7f57be3214df",
  measurementId: "G-5XV3ZZJDY3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
