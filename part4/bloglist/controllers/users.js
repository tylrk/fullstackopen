const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1 });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username) {
    return response.status(422).json({ error: "Username missing" });
  } else if (username.length < 3) {
    return response
      .status(422)
      .json({ error: "Username must be 3 or more characters" });
  } else if (!password) {
    return response.status(422).json({ error: "Password missing" });
  } else if (password.length < 3) {
    return response
      .status(422)
      .json({ error: "Password must be 3 or more characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
