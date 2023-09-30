import React, { useContext, useState } from "react";
import BlogContext from "../context/BlogContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const CommentSection = () => {
	const [comment, setComment] = useState("");
	const { blogId } = useContext(BlogContext);
	const blogRef = firestore.collection("blogs");
	const [user] = useAuthState(auth);
	const specificBlogRef = blogRef.doc(blogId);
	const [blogComments, setBlogComments] = useCollectionData(
		specificBlogRef.collection("comments")
	);

	const postComment = (e) => {
		e.preventDefault();
		specificBlogRef.collection("comments").add({
			comment: comment,
			user: user.displayName,
			img: user.photoURL,
		});
		setComment("  ");
	};

	return (
		<div className="flex flex-col pb-8  ">
			<form action="" onSubmit={postComment}>
				<div className=" px-4 border-b flex justify-between">
					<input
						className=" w-full outline-none"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						type="text"
						placeholder="Add a comment"
					/>
					<button
						type="submit"
						className=" bg-blue-500 text-white rounded-3xl mb-1 px-2 py-1"
					>
						Comment
					</button>
				</div>
			</form>

			{/* map over comments */}

			<div>
				{blogComments?.map((comment) => (
					<div className="flex flex-col py-4">
						<div className="flex items-center text-sm font-semibold">
							<img src={comment.img} alt="" className=" h-8 w-8 rounded-full" />
              <p className=" px-2">{comment.user}</p>
						</div>
						<p className=" ml-10">{comment.comment}</p>
            <div className=" ml-10 mt-2 flex gap-6">
              <ThumbUpOffAltIcon style={{color: "gray"}} />
              <ThumbDownOffAltIcon style={{color:"gray"}} />
            </div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CommentSection;
