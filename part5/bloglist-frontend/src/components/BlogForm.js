import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });

    setNewBlog({ title: "", author: "", url: "", likes: 0 });
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <label className="title">Title: </label>
        <input
          value={newBlog.title}
          placeholder="Enter Title"
          id="title"
          onChange={(event) =>
            setNewBlog({ ...newBlog, title: event.target.value })
          }
        />
        <br />
        <div className="authorForm">
          <label className="author">Author: </label>
          <input
            value={newBlog.author}
            placeholder="Enter Author"
            id="author"
            onChange={(event) =>
              setNewBlog({ ...newBlog, author: event.target.value })
            }
          />
          <br />
        </div>
        <label className="url">URL: </label>
        <input
          value={newBlog.url}
          placeholder="Enter URL"
          id="url"
          onChange={(event) =>
            setNewBlog({ ...newBlog, url: event.target.value })
          }
        />
        <br />
        <button id="create" className="createButton" type="submit">
          Create
        </button>
      </form>
      <br />
    </div>
  );
};

export default BlogForm;
