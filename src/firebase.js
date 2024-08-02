import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAbc8Cmqj4T3ZioJrCApAfntmYcslTh2TY",
  authDomain: "linkedin-clone-e4949.firebaseapp.com",
  projectId: "linkedin-clone-e4949",
  storageBucket: "linkedin-clone-e4949.appspot.com",
  messagingSenderId: "475136658654",
  appId: "1:475136658654:web:eb565c21069a086a4f864f"
};


const app = initializeApp(firebaseConfig); 
const auth =getAuth(app);
export {auth , app};
export default getFirestore();
