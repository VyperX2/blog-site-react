import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAQr6nzysUfQpoy05MWW3urhcxvq0cn1ds",
	authDomain: "blog-site-react.firebaseapp.com",
	projectId: "blog-site-react",
	storageBucket: "blog-site-react.appspot.com",
	messagingSenderId: "690400282715",
	appId: "1:690400282715:web:fff31db911f98e2f42577e",
	measurementId: "G-543RQTC9JJ",
};

const app = firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const auth = firebase.auth()

export { firestore , auth}