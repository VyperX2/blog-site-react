import React, { useContext } from "react";
import { auth, firestore } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "@mui/material";
import BlogContext from "../context/BlogContext";
import { motion } from "framer-motion";
import { useCollection } from "react-firebase-hooks/firestore";

const BlogPreview = ({ title, desc, img, timestamp, index , createdBy , photoUrl }) => {


	const [user] = useAuthState(auth);
	const { photoURL, displayName } = user;
	const date = timestamp?.toDate().toDateString();
	const [blogDocs] = useCollection(firestore.collection("blogs"));
	const { blogId, setBlogId } = useContext(BlogContext);

	// !blogDocs.docs[index].id

	return (
		<motion.div
			animate={{ opacity: 1 ,   translateY: 0}}
			initial={{ opacity: 0,   translateY: -30 }}
			transition={{ ease:"easeOut" , duration:0.3 , delay: index * 0.1 }}
			onClick={() => setBlogId(blogDocs.docs[index].id)}
			className="flex flex-col w-80 border rounded-md overflow-hidden h-64 shadow-md hover:scale-110 transition-all cursor-pointer "
		>
			<img src={img} alt="blog_image" className=" w-full h-24 object-cover" />
			<div className=" mx-2 mt-1 flex items-center justify-between">
				<div className="flex items-center">
					{photoUrl ? (
						<img src={photoUrl} alt="" className=" h-8 w-8 rounded-full" />
					) : (
						<div className="h-8 w-8 rounded-full bg-green-800 text-white flex justify-center items-center">
							{displayName[0].toUpperCase()}
						</div>
					)}
					<h4 className=" ml-2 text-sm text-gray-600 tracking-tighter">
						{createdBy}
					</h4>
				</div>
				<h4 className=" text-sm text-gray-500 tracking-tighter">{date}</h4>
			</div>
			<h4 className=" text-xl font-semibold px-2 pt-2">{title}</h4>
			<h4 className=" px-2 text-gray-600 text-sm">
				{desc.substring(0, 150)} ...
			</h4>
		</motion.div>
	);
};

export default BlogPreview;
