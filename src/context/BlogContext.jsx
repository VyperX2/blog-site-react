import { createContext, useState } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogId , setBlogId] = useState("")

	return (
		<BlogContext.Provider value={{ blogId: blogId , setBlogId }}>
			{children}
		</BlogContext.Provider>
	);
};

export default BlogContext;
