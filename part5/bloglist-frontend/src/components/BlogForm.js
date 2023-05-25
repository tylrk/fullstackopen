const BlogForm = ({ addBlog, newBlog, handleInputChange }) => (
  <div>
    <form onSubmit={addBlog}>
      <label className="title">Title: </label>
      <input value={newBlog.title} name="title" onChange={handleInputChange} />
      <br />
      <div className="authorForm">
        <label className="author">Author: </label>
        <input
          value={newBlog.author}
          name="author"
          onChange={handleInputChange}
        />
        <br />
      </div>
      <label className="url">URL: </label>
      <input value={newBlog.url} name="url" onChange={handleInputChange} />
      <br />
      <button className="createButton" type="submit">
        Create
      </button>
    </form>
    <br />
  </div>
);

export default BlogForm;
