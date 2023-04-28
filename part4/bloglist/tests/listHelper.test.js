const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const listHelper = require("../utils/list_helper");
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = listHelper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  console.log("entered test");
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(listHelper.blogs.length);
});

test("unique identifier property is named id", async () => {
  const response = await api.get("/api/blogs");
  const blogIds = response.body.every((blog) => blog.id !== undefined);
  expect(blogIds).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "issa blog",
    author: "tkhan",
    url: "www.issablog.io",
    likes: 420,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await listHelper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(listHelper.blogs.length + 1);

  const contents = blogsAtEnd.map((blog) => blog.title);
  expect(contents).toContain("issa blog");
});

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listHelper.blogs);
    expect(result).toBe(36);
  });
});

describe("max likes", () => {
  test("find blog with max likes", () => {
    const result = listHelper.favoriteBlog(listHelper.blogs);
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });

  test("of empty list returns null", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual(null);
  });
});

describe("most blogs", () => {
  test("find author with the most blogs", () => {
    const result = listHelper.mostBlogs(listHelper.blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most total likes", () => {
  test("find author with the most blogs", () => {
    const result = listHelper.mostLikes(listHelper.blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
