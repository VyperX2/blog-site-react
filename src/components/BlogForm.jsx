import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase";
import ImageIcon from "@mui/icons-material/Image";
import firebase from "firebase/compat/app";

const BlogForm = () => {
	const [blogTitle, setBlogTitle] = useState("");
	const [blogDesc, setBlogDesc] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageUrl, setImageUrl] = useState("");
	const blogRef = firestore.collection("blogs");

	const [user] = useAuthState(auth);

	const postBlog = async (e) => {
		const { photoURL, uid } = user;

		if (blogTitle && blogDesc) {
			blogRef.add({
				title: blogTitle,
				desc: blogDesc,
				image: selectedImage,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				uid: user.uid,
				createdBy: user.displayName,
        photoURL : user.photoURL
			});

			setBlogDesc("");
			setBlogTitle("");
			setSelectedImage(null);
			setImageUrl("");
		} else {
			alert("Enter both title and description to post!");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setSelectedImage(event.target.result);
			};
			reader.readAsDataURL(file);
		} else {
			setSelectedImage(null);
			setImageUrl("");
		}
	};

	return (
		<div className="sm:m-0 flex-1 mx-auto pb-6 ">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					postBlog();
				}}
				action=""
				className="flex flex-col gap-2"
			>
				<input
					value={blogTitle}
					onChange={(e) => setBlogTitle(e.target.value)}
					type="text"
					placeholder="title"
					className="outline-none border rounded-md px-4 shadow-md"
				/>

				<textarea
					value={blogDesc}
					onChange={(e) => setBlogDesc(e.target.value)}
					placeholder="description"
					className="outline-none border rounded-md px-4 shadow-md h-auto"
				/>
				<input
					onChange={(e) => handleImageChange(e)}
					accept="image/*"
					type="file"
					id="file"
					placeholder="title"
					className="outline-none border rounded-md px-4 shadow-md hidden"
				/>
				<label
					htmlFor="file"
					className="flex items-center justify-center cursor-pointer hover:bg-blue-600 bg-blue-500 text-white font-semibold text-center rounded-md"
				>
					<ImageIcon style={{ height: "20px" }} />
					Add image
				</label>
				{selectedImage && (
					<img
						src={selectedImage}
						alt=""
						className="w-full h-16 object-cover"
					/> // Display the selectedImage
				)}
				<button
					type="submit"
					className="hover:bg-blue-600 bg-blue-500 text-white font-semibold text-xl rounded-md"
				>
					Post
				</button>
			</form>
		</div>
	);
};

export default BlogForm;
