import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Toggle from "./components/Toggle";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    if (!blogObject.title || !blogObject.author) {
      setMessage("Please enter the Title and Author");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setMessage(
        `A new blog - ${returnedBlog.title} by ${returnedBlog.author} has been added!`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("An error occurred while adding the blog");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const addLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const likedBlog = { ...blog, likes: blog.likes + 1 };

    try {
      const returnedBlog = await blogService.update(id, likedBlog);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      setMessage(`You liked ${returnedBlog.title}!`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("An error occurred. Like was not registered");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);

    if (window.confirm(`Delete blog, ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        setMessage(`You deleted ${blog.title} by ${blog.author}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (exception) {
        setMessage("Unauthorized user. Blog was not deleted");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong Username or Password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const blogFormRef = useRef();

  if (!user) {
    return (
      <div>
        <h1>Log into the Application</h1>
        <Notification message={message} />
        <Toggle buttonLabel="Login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={({ target }) => setUsername(target.value)}
            setPassword={({ target }) => setPassword(target.value)}
          />
        </Toggle>
      </div>
    );
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      <p className="loggedIn">
        {`${user.name} is logged in `}
        <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>Create New Blog</h2>
      <Toggle buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggle>
      <br />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            like={addLikes}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
};

export default App;
