const BlogForm = ({
  addBlog,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => (
  <div>
    <form onSubmit={addBlog}>
      <label className="title">Title: </label>
      <input value={title} onChange={handleTitleChange} />
      <br />
      <div className="authorForm"> 
      <label className="author">Author: </label>
      <input value={author} onChange={handleAuthorChange} />
      <br />
      </div>
      <label className="url">URL: </label>
      <input value={url} onChange={handleUrlChange} />
      <br />
      <button className="createButton" type="submit">Create</button>
    </form>
    <br />
  </div>
);

export default BlogForm;
