import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Log into the Application</h2>
        <Notification message={errorMessage} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={({ target }) => setUsername(target.value)}
          setPassword={({ target }) => setPassword(target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p className="loggedIn">{`${user.name} is logged in`}</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
