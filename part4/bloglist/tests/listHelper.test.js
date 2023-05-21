const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

const {
  initialUsers,
  initialBlogs,
  blogsInDb,
  usersInDb,
} = require("../utils/list_helper");

let authHeader;

describe("blogs api", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    // create a test user and save the corresponding auth header
    const user = initialUsers[0];
    await api.post("/api/users").send(user);
    const response = await api.post("/api/login").send(user);
    authHeader = `Bearer ${response.body.token}`;
  });

  describe("when there are blogs saved", () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      await Blog.insertMany(initialBlogs);
    });

    test("blogs are returned as json", async () => {
      const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveLength(initialBlogs.length);
    });

    test("a blogs has field id", async () => {
      const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blog = response.body[0];

      expect(blog.id).toBeDefined();
    });

    test("a blog can be edited", async () => {
      const [blogBefore] = await blogsInDb();

      const modifiedBlog = { ...blogBefore, title: "Goto considered useful" };

      await api
        .put(`/api/blogs/${blogBefore.id}`)
        .send(modifiedBlog)
        .expect(200);

      const blogs = await blogsInDb();

      const titles = blogs.map((r) => r.title);

      expect(titles).toContain(modifiedBlog.title);
    });

    describe("a new blog", () => {
      test("can be added", async () => {
        const blog = {
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
        };

        await api
          .post("/api/blogs")
          .set("Authorization", authHeader)
          .send(blog)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        const blogs = await blogsInDb();

        expect(blogs).toHaveLength(initialBlogs.length + 1);

        const titles = blogs.map((r) => r.title);

        expect(titles).toContain(blog.title);
      });

      test("has likes initialized to 0 if initial value is not given", async () => {
        const blog = {
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        };

        const response = await api
          .post("/api/blogs")
          .set("Authorization", authHeader)
          .send(blog)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        expect(response.body.likes).toBe(0);
      });

      test("if title is missing, creation fails", async () => {
        const blog = {
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
        };

        const response = await api
          .post("/api/blogs")
          .set("Authorization", authHeader)
          .send(blog)
          .expect(400)
          .expect("Content-Type", /application\/json/);

        expect(response.body.error).toContain("`title` is required.");
      });

      test("if author is missing, creation fails", async () => {
        const blog = {
          title: "Go To Statement Considered Harmful",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        };

        const response = await api
          .post("/api/blogs")
          .set("Authorization", authHeader)
          .send(blog)
          .expect(400)
          .expect("Content-Type", /application\/json/);
      });
    });
  });

  describe("a blog", () => {
    let id;
    beforeEach(async () => {
      await Blog.deleteMany({});

      const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      };

      const response = await api
        .post("/api/blogs")
        .set("Authorization", authHeader)
        .send(blog);

      id = response.body.id;
    });

    test("can be deleted by the creator", async () => {
      const blogsBefore = await blogsInDb();

      await api
        .delete(`/api/blogs/${id}`)
        .set("Authorization", authHeader)
        .expect(204);

      const blogsAfter = await blogsInDb();

      expect(blogsAfter).toHaveLength(0);
    });

    test("can not be deleted without valid auth header", async () => {
      const blogsBefore = await blogsInDb();

      await api.delete(`/api/blogs/${id}`).expect(401);

      const blogsAfter = await blogsInDb();

      expect(blogsAfter).toHaveLength(1);
    });
  });

  describe("creation of a user", () => {
    test("succeeds with valid username and password", async () => {
      const user = {
        username: "mluukkai",
        password: "secret",
      };

      const response = await api
        .post("/api/users")
        .send(user)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const users = await usersInDb();

      expect(users).toHaveLength(initialUsers.length + 1);
      const usernames = users.map((u) => u.username);
      expect(usernames).toContain(user.username);
    });

    test("fails with a proper error if username is too short", async () => {
      const user = {
        username: "ml",
        password: "secret",
      };

      const response = await api.post("/api/users").send(user).expect(400);

      expect(response.body.error).toContain(
        "`username` (`ml`) is shorter than the minimum allowed length (3)"
      );
    });

    test("fails with a proper error if password is too short", async () => {
      const user = {
        username: "mluukka",
        password: "se",
      };

      const response = await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(response.body.error).toContain(
        "`password` is shorter than the minimum allowed length (3)"
      );
    });

    test("fails with a proper error if username not unique", async () => {
      const user = initialUsers[0];

      const response = await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(response.body.error).toContain(
        "expected `username` to be unique."
      );
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// const mongoose = require("mongoose");
// const supertest = require("supertest");
// const bcrypt = require("bcrypt");
// const app = require("../app");
// const api = supertest(app);
// const listHelper = require("../utils/list_helper");
// const Blog = require("../models/blog");
// const User = require("../models/user");

// beforeEach(async () => {
//   await Blog.deleteMany({});

//   const blogObjects = listHelper.blogs.map((blog) => new Blog(blog));
//   const promiseArray = blogObjects.map((blog) => blog.save());
//   await Promise.all(promiseArray);
// });

// test("dummy returns one", () => {
//   const blogs = [];

//   const result = listHelper.dummy(blogs);
//   expect(result).toBe(1);
// });

// describe("when there are blogs saved", () => {
//   test("blogs are returned as json", async () => {
//     console.log("entered test");
//     await api
//       .get("/api/blogs")
//       .expect(200)
//       .expect("Content-Type", /application\/json/);
//   });

//   test("all blogs are returned", async () => {
//     const response = await api.get("/api/blogs");
//     expect(response.body).toHaveLength(listHelper.blogs.length);
//   });

//   test("unique identifier property is named id", async () => {
//     const response = await api.get("/api/blogs");
//     const blogIds = response.body.every((blog) => blog.id !== undefined);
//     expect(blogIds).toBeDefined();
//   });
// });

// describe("add a new blog", () => {
//   test("a valid blog can be added", async () => {
//     const newBlog = {
//       title: "issa blog",
//       author: "tkhan",
//       url: "www.issablog.io",
//       likes: 420,
//     };

//     await api
//       .post("/api/blogs")
//       .send(newBlog)
//       .expect(201)
//       .expect("Content-Type", /application\/json/);

//     const blogsAtEnd = await listHelper.blogsInDb();
//     expect(blogsAtEnd).toHaveLength(listHelper.blogs.length + 1);

//     const contents = blogsAtEnd.map((blog) => blog.title);
//     expect(contents).toContain("issa blog");
//   });

//   test("fails with status code 400 if data invalid", async () => {
//     const newBlog = {
//       author: "tyler",
//     };

//     await api.post("/api/blogs").send(newBlog).expect(400);

//     const blogsAtEnd = await listHelper.blogsInDb();

//     expect(blogsAtEnd).toHaveLength(listHelper.blogs.length);
//   });
// });

// describe("missing properties", () => {
//   test("likes property missing, default to 0", async () => {
//     const newBlog = {
//       title: "issa blog",
//       author: "tkhan",
//       url: "www.issablog.io",
//     };

//     await api.post("/api/blogs").send(newBlog);

//     const blogsAtEnd = await listHelper.blogsInDb();
//     const newBlogInDb = blogsAtEnd.find((blog) => blog.title === "issa blog");
//     console.log(newBlogInDb);
//     expect(newBlogInDb.likes).toBe(0);
//   });

//   test("title or url missing, 400 response", async () => {
//     const newBlog = {
//       author: "tylr",
//       likes: 69,
//     };

//     await api.post("/api/blogs").send(newBlog).expect(400);
//   });
// });

// describe("deletion of a blog", () => {
//   test("succeeds with status code 204 if id is valid", async () => {
//     const blogsAtStart = await listHelper.blogsInDb();
//     const blogToDelete = blogsAtStart[0];

//     await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

//     const blogsAtEnd = await listHelper.blogsInDb();

//     expect(blogsAtEnd).toHaveLength(listHelper.blogs.length - 1);

//     const contents = blogsAtEnd.map((blog) => blog.title);
//     expect(contents).not.toContain(blogToDelete.title);
//   });
// });

// describe("update the likes of a saved note", () => {
//   test("succeeds with valid data", async () => {
//     const blogsAtStart = await listHelper.blogsInDb();
//     const blogToUpdate = blogsAtStart[0];

//     const updatedBlog = {
//       likes: 1117,
//     };

//     await api
//       .put(`/api/blogs/${blogToUpdate.id}`)
//       .send(updatedBlog)
//       .expect(200)
//       .expect("Content-Type", /application\/json/);

//     const blogsAtEnd = await listHelper.blogsInDb();
//     const updatedBlogInDb = blogsAtEnd.map((blog) => blog.likes);

//     expect(updatedBlogInDb).toContain(updatedBlog.likes);
//   });
// });

// describe("total likes", () => {
//   test("when list has only one blog, equals the likes of that", () => {
//     const listWithOneBlog = [
//       {
//         _id: "5a422aa71b54a676234d17f8",
//         title: "Go To Statement Considered Harmful",
//         author: "Edsger W. Dijkstra",
//         url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//         likes: 5,
//         __v: 0,
//       },
//     ];

//     const result = listHelper.totalLikes(listWithOneBlog);
//     expect(result).toBe(5);
//   });

//   test("of empty list is zero", () => {
//     const result = listHelper.totalLikes([]);
//     expect(result).toBe(0);
//   });

//   test("of a bigger list is calculated right", () => {
//     const result = listHelper.totalLikes(listHelper.blogs);
//     expect(result).toBe(36);
//   });
// });

// describe("max likes", () => {
//   test("find blog with max likes", () => {
//     const result = listHelper.favoriteBlog(listHelper.blogs);
//     expect(result).toEqual({
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0,
//     });
//   });

//   test("of empty list returns null", () => {
//     const result = listHelper.favoriteBlog([]);
//     expect(result).toEqual(null);
//   });
// });

// describe("most blogs", () => {
//   test("find author with the most blogs", () => {
//     const result = listHelper.mostBlogs(listHelper.blogs);
//     expect(result).toEqual({
//       author: "Robert C. Martin",
//       blogs: 3,
//     });
//   });
// });

// describe("most total likes", () => {
//   test("find author with the most blogs", () => {
//     const result = listHelper.mostLikes(listHelper.blogs);
//     expect(result).toEqual({
//       author: "Edsger W. Dijkstra",
//       likes: 17,
//     });
//   });
// });

// describe("when there is initially one user in db", () => {
//   beforeEach(async () => {
//     await User.deleteMany({});

//     const passwordHash = await bcrypt.hash("sekret", 10);
//     const user = new User({ username: "root", passwordHash });

//     await user.save();
//   });

//   test("creation succeeds with a fresh username", async () => {
//     const usersAtStart = await listHelper.usersInDb();

//     const newUser = {
//       username: "tylr",
//       name: "Tyler Khan",
//       password: "test",
//     };

//     await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(201)
//       .expect("Content-Type", /application\/json/);

//     const usersAtEnd = await listHelper.usersInDb();
//     expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

//     const usernames = usersAtEnd.map((u) => u.username);
//     expect(usernames).toContain(newUser.username);
//   });

//   test("adding an already existing username, results in status code 422", async () => {
//     await api
//       .post("/api/users")
//       .send({username: "root", name: "Tyler Khan", password: "test" })
//       .expect(422)
//       .expect("Content-Type", /application\/json/);
//   })
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });
