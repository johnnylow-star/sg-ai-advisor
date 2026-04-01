import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATdVjeNaBbvGrddpoG8ukjhlqYLZuooMQ",
  authDomain: "sg-ai-advisor.firebaseapp.com",
  projectId: "sg-ai-advisor",
  storageBucket: "sg-ai-advisor.firebasestorage.app",
  messagingSenderId: "491621578919",
  appId: "1:491621578919:web:7e9cbea81b72a978758382",
  measurementId: "G-WN46981CP0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);