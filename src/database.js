import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDRRi6BYu0JC0Z7fiT-u6DPGqTqyoE0P_o",
    authDomain: "verbe-conjugaison.firebaseapp.com",
    databaseURL: "https://verbe-conjugaison.firebaseio.com",
    projectId: "verbe-conjugaison",
    storageBucket: "verbe-conjugaison.appspot.com",
    messagingSenderId: "782636987744",
    appId: "1:782636987744:web:ea17a0c65ce788128c1a05",
    measurementId: "G-54W2E66SGG"
};
// console.log(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.database();

export { db };