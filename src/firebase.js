import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	
};

const app = firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const auth = firebase.auth()

export { firestore , auth}
