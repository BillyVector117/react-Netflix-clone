import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCYkWZPVgfJhu9elbzg-5lfWdLgMaHT6e4",
    authDomain: "react-netflix-application.firebaseapp.com",
    projectId: "react-netflix-application",
    storageBucket: "react-netflix-application.appspot.com",
    messagingSenderId: "229685907712",
    appId: "1:229685907712:web:cdf42e4fe238d9495863e5"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
export default storage;
