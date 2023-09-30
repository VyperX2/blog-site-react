import React, { useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import BlogContext from "../context/BlogContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { Watch } from "react-loader-spinner";
import { useAuthState } from "react-firebase-hooks/auth";
import {  motion } from "framer-motion";
import CommentSection from "./CommentSection";

const SelectedBlog = () => {
	const blogRef = firestore.collection("blogs");
	const { blogId, setBlogId } = useContext(BlogContext);
	const [blogDocs] = useCollection(blogRef);
	const [blog, setBlog] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [user] = useAuthState(auth);
	const currentBlogRef = blogRef.doc(blogId);



	useEffect(() => {
		if (blogId) {
			const specificBlogRef = blogRef.doc(blogId);

			specificBlogRef
				.get()
				.then((doc) => {
					if (doc.exists) {
						setBlog(doc.data());
						setIsLoading(false);
					} else {
						console.log("Document not found");
					}
				})
				.catch((error) => {
					console.error("Error fetching document:", error);
				});
		}
	}, [blogId]);

	// console.log(blog);
	return (
		<>
			{!isLoading ? (
				<motion.div className=" container section flex-col">
					<motion.div
						animate={{ opacity: 1, translateX: 0, translateY: 0 }}
						initial={{ opacity: 0, translateX: -50, translateY: -50 }}
						transition={{ ease: "easeOut", duration: 0.3 }}
						className="flex justify-between"
					>
						<motion.button
							onClick={() => {
								setBlogId("");
							}}
							className=" bg-blue-500 text-white rounded-md px-2 py-1 border border-blue-500 hover:bg-white hover:text-blue-500 transition-all mb-2"
						>
							Back to home
						</motion.button>
						<button
							onClick={() => {
								if (user.uid === blog.uid) {
									currentBlogRef.delete();
									setBlogId("");
								} else {
									alert("You do not have the permission to delete this blog");
								}
							}}
							className=" bg-red-500 text-white rounded-md px-2 py-1 border border-red-500 hover:bg-white 
            hover:text-red-500 transition-all mb-2"
						>
							Delete Blog
						</button>
					</motion.div>
					<motion.img
						animate={{ opacity: 1, translateX: 0, translateY: 0 }}
						initial={{ opacity: 0, translateX: -50, translateY: -50 }}
						transition={{ ease: "easeOut", delay: 0.75, duration: 0.3 }}
						src={blog.image}
						className=" w-screen h-40 object-cover rounded-md shadow-md"
					/>
					<motion.div
						animate={{ opacity: 1, translateX: 0, translateY: 0 }}
						initial={{ opacity: 0, translateX: -50, translateY: -50 }}
						transition={{ ease: "easeOut", delay: 1, duration: 0.3 }}
						className="flex justify-between items-center mb-6 mt-2"
					>
						<h2 className="text-4xl font-bold">{blog.title}</h2>
						<h4 className=" text-gray-500">Blog by : {blog.createdBy}</h4>
					</motion.div>
					<motion.p
						className="pb-8"
						animate={{ opacity: 1, translateX: 0, translateY: 0 }}
						initial={{ opacity: 0, translateX: -50, translateY: -50 }}
						transition={{ ease: "easeOut", delay: 1.25, duration: 0.3 }}
					>
						{blog.desc}
					</motion.p>
          <CommentSection />
				</motion.div>
			) : (
				<div className="flex justify-center items-center w-screen h-screen">
					<Watch
						height="250"
						width="250"
						radius="48"
						color="#3B82F6"
						ariaLabel="watch-loading"
						wrapperStyle={{}}
						wrapperClassName=""
						visible={true}
					/>
				</div>
			)}
		</>
	);
};

export default SelectedBlog;
