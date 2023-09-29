import React, { useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	useCollection,
	useCollectionData,
} from "react-firebase-hooks/firestore";
import BlogForm from "./BlogForm";
import BlogPreview from "./BlogPreview";
import { Watch } from "react-loader-spinner";
import BlogContext from "../context/BlogContext";
import SelectedBlog from "./SelectedBlog";

const Main = () => {
	const blogRef = firestore.collection("blogs");
	const [blogs] = useCollectionData(blogRef);
	const [loading, setLoading] = useState(true);
	const { blogId, setBlogId } = useContext(BlogContext);
	const [blogDocs] = useCollection(blogRef);

	useEffect(() => {
		if (blogs && loading) {
			setLoading(false);
		}
	}, [blogs, loading]);

	// blogDocs?.docs.map((doc) => console.log(doc.id));

	return (
		<>
			{loading ? (
				<h2 className="flex justify-center items-center h-screen w-screen text-4xl font-bold">
					{" "}
					<Watch
						height="250"
						width="250"
						radius="48"
						color="#3B82F6"
						ariaLabel="watch-loading"
						wrapperStyle={{}}
						wrapperClassName=""
						visible={true}
					/>{" "}
				</h2>
			) : !blogId ? (
				<div className="section container px-0 flex sm:flex-row sm:gap-8 w-screen flex-col justify-center sm:justify-start  py-4 overflow-x-hidden">
					<BlogForm />
					<div className="flex-[3] flex-shrink-[3] basis-0 grid grid-cols-1  lg:grid-cols-2 2xl:grid-cols-3 gap-6 place-items-center md:place-items-start  ">
						{blogs?.map((blog, index) => (
							<BlogPreview
                photoUrl={blog.photoURL}
                createdBy={blog.createdBy}
								key={index}
								title={blog.title}
								desc={blog.desc}
								img={blog.image}
								timestamp={blog.createdAt}
								index={index}
							/>
						))}
					</div>
				</div>
			) : (
				<SelectedBlog />
			)}
		</>
	);
};

export default Main;
