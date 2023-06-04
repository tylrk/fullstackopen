import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <label className="username">Username</label>
      <input
        type="text"
        value={username}
        name="Username"
        onChange={setUsername}
      />
    </div>
    <div className="passForm">
      <label className="password">Password</label>
      <input
        type="password"
        value={password}
        name="Password"
        onChange={setPassword}
      />
    </div>
    <button type="submit">Login</button>
  </form>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
