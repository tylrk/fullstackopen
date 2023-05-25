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
      <label>Title: </label>
      <input value={title} onChange={handleTitleChange} />
      <br />
      <label>Author: </label>
      <input value={author} onChange={handleAuthorChange} />
      <br />
      <label>URL: </label>
      <input value={url} onChange={handleUrlChange} />
      <br />
      <button type="submit">Create</button>
    </form>
    <br />
  </div>
);

export default BlogForm;
