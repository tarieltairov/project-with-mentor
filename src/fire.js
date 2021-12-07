import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXL7fTmwapkbyOMZ9grbYLS7uNA1b9bII",
  authDomain: "jarim-sosisony.firebaseapp.com",
  projectId: "jarim-sosisony",
  storageBucket: "jarim-sosisony.appspot.com",
  messagingSenderId: "1041011407060",
  appId: "1:1041011407060:web:2cd6258139bcc56dc16341"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
