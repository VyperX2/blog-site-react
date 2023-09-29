import React from "react";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase";
import Home from "./components/Home"
import SignIn from "./components/SignIn";
import { BlogProvider } from "./context/BlogContext";


const App = () => {
  const [user] = useAuthState(auth)

	return (
		<BlogProvider>
			{user && <Navbar />}

      {!user ? <SignIn /> : <Home />}
		</BlogProvider>
	);
};

export default App;
