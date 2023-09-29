import React from "react";
import { Avatar } from "@mui/material";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
	const [user] = useAuthState(auth);

	console.log(user);

	return (
		// WRAPPER DIV TO PRESERVE LAYOUT WITHOUT BREAKING THE * container * UTILITY CLASS
		<div className=" bg-blue-500">
			<nav className="  container py-3 w-screen text-white flex justify-between items-center">
				<h4 className=" text-2xl hidden sm:block" >Blog Site</h4>
				<div className=" flex items-center gap-3 ">
					<div className=" flex flex-col items-center">
						<Avatar
							src={user.photoURL}
							style={{ height: "30px", width: "30px" }}
						/>
						<h4 className=" text-sm">{user.displayName}</h4>
					</div>
					<div className=" ml-2">
						<button
							onClick={() => auth.signOut()}
							className=" border border-white rounded-md px-2 hover:text-blue-500 hover:border-blue-500 hover:bg-white transition-all"
						>
							Sign Out
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
