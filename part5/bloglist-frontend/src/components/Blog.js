import { useState } from "react";

const Blog = ({ blog, like, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}{" "}
      <button onClick={toggleVisibility}>{visible ? "Hide" : "View"}</button>
      {visible && (
        <div className="details">
          <a
            href={`http://${blog.url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {blog.url}
          </a>
          <br />
          <span>Likes {blog.likes} </span>
          <button onClick={() => like(blog.id)}>Like</button>
          <br />
          <span>{blog.user.name}</span>
          <br />
          <button onClick={() => deleteBlog(blog.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
