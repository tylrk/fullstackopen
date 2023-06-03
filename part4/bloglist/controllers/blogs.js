const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const { userExtractor } = require("../utils/middleware");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

router.post("/", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
    user: user._id,
  });

  const createdBlog = await blog.save();
  await createdBlog.populate("user", { username: 1, name: 1 });

  user.blogs = user.blogs.concat(createdBlog._id);
  await user.save();

  response.status(201).json(createdBlog);
});

router.put("/:id", async (request, response) => {
  const { title, url, author, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, url, author, likes },
    { new: true }
  ).populate("user", { username: 1, name: 1 });

  response.json(updatedBlog);
});

router.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  const user = request.user;

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString());

  await user.save();
  await blog.deleteOne();

  response.status(204).end();
});

module.exports = router;
