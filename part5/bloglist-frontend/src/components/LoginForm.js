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
        value={username}
        id="username"
        onChange={setUsername}
      />
    </div>
    <div className="passForm">
      <label className="password">Password</label>
      <input
        type="password"
        value={password}
        id="password"
        onChange={setPassword}
      />
    </div>
    <button id="login-button" type="submit">Login</button>
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
