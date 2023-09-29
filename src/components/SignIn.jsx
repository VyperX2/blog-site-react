import React from "react";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";

const SignIn = () => {
	function signIn() {
		const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
	}

	return (
		<div className="  flex justify-center items-center h-screen w-screen bg-gray-100">
			<div className=" shadow-md bg-white h-[65%] w-[50%] rounded-md flex flex-col items-center justify-center">
				<button onClick={signIn} className=" bg-blue-600 text-white px-4 py-2 rounded-md">
					Sign In With Google 
				</button>
			</div>
		</div>
	);
};

export default SignIn;
