import firebase from "firebase";
import auth from 'firebase/auth';

 firebase.initializeApp(  {
    apiKey: "AIzaSyClkOdZliXB3Ki_fAdiKPN3dB3av5Cgpn0",
    authDomain: "tonda-datind.firebaseapp.com",
     databaseURL: "https://tonda-datind-default-rtdb.firebaseio.com",
    projectId: "tonda-datind",
    storageBucket: "tonda-datind.appspot.com",
    messagingSenderId: "183452349270",
    appId: "1:183452349270:web:c22810b6b37bac568f5cf7"
});

export default {
    firebase
}