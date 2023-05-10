// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvbrv_-BGD-V9g1OYIPInq_QMj2mz7954",
  authDomain: "wheather-d3e04.firebaseapp.com",
  databaseURL: "https://wheather-d3e04-default-rtdb.firebaseio.com",
  projectId: "wheather-d3e04",
  storageBucket: "wheather-d3e04.appspot.com",
  messagingSenderId: "408775119166",
  appId: "1:408775119166:web:ecbc4ac596b57ef49a5c6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app