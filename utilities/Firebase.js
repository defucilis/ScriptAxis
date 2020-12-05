import firebase from 'firebase'
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyDroa4d-CV89bNLvcKouo8AdU69dINrH70",
    authDomain: "scriptlibrary-8f879.firebaseapp.com",
    projectId: "scriptlibrary-8f879",
    storageBucket: "scriptlibrary-8f879.appspot.com",
    messagingSenderId: "962566191380",
    appId: "1:962566191380:web:eabd353717b987ff0a2a01",
    measurementId: "G-3SQ6ZYCZG8"
};

if(typeof window !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    if('measurementId' in firebaseConfig) firebase.analytics();
}

export default firebase;