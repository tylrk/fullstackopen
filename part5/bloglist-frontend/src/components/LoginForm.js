const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => (
  <div>
    <p>Log into Application</p>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={setUsername}
        />
      </div>
      <div>
        passsword
        <input
          type="password"
          value={password}
          name="Password"
          onChange={setPassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
);

export default LoginForm;
