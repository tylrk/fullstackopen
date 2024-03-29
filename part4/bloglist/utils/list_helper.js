const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
];

const initialUsers = [{ username: "tester", password: "secret" }];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "willremovethissoon",
    url: "willremovethissoon",
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const notes = await Blog.find({});
  return notes.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers,
};

// const Blog = require("../models/blog");
// const User = require("../models/user");

// const blogs = [
//   {
//     _id: "5a422a851b54a676234d17f7",
//     title: "React patterns",
//     author: "Michael Chan",
//     url: "https://reactpatterns.com/",
//     likes: 7,
//     __v: 0,
//   },
//   {
//     _id: "5a422aa71b54a676234d17f8",
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//     __v: 0,
//   },
//   {
//     _id: "5a422b3a1b54a676234d17f9",
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//     likes: 12,
//     __v: 0,
//   },
//   {
//     _id: "5a422b891b54a676234d17fa",
//     title: "First class tests",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//     likes: 10,
//     __v: 0,
//   },
//   {
//     _id: "5a422ba71b54a676234d17fb",
//     title: "TDD harms architecture",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//     likes: 0,
//     __v: 0,
//   },
//   {
//     _id: "5a422bc61b54a676234d17fc",
//     title: "Type wars",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//     likes: 2,
//     __v: 0,
//   },
// ];

// const dummy = (blogs) => {
//   return 1;
// };

// const totalLikes = (blogs) => {
//   const likes = blogs.map((blog) => blog.likes);
//   const sum = likes.reduce((sum, likes) => sum + likes, 0);
//   return blogs.length === 0 ? 0 : sum;
// };

// const favoriteBlog = (blogs) => {
//   const likes = blogs.map((blog) => blog.likes);
//   const max = Math.max(...likes);
//   return blogs.length === 0 ? null : blogs.find((blog) => blog.likes === max);
// };

// const mostBlogs = (blogs) => {
//   const count = blogs.reduce((countObj, blog) => {
//     const value = blog.author;
//     countObj[value] = (countObj[value] || 0) + 1;
//     return countObj;
//   }, {});

//   let maxCount = 0;
//   let mostCommonAuthor;

//   for (let author in count) {
//     if (count[author] > maxCount) {
//       maxCount = count[author];
//       mostCommonAuthor = author;
//     }
//   }

//   return {
//     author: mostCommonAuthor,
//     blogs: maxCount,
//   };
// };

// const mostLikes = (blogs) => {
//   const likesByAuthor = blogs.reduce((likes, blog) => {
//     likes[blog.author] = (likes[blog.author] || 0) + blog.likes;
//     return likes;
//   }, {});

//   const [author, likes] = Object.entries(likesByAuthor).reduce(
//     (accumulator, [currentAuthor, currentLikes]) =>
//       currentLikes > accumulator[1]
//         ? [currentAuthor, currentLikes]
//         : accumulator,
//     [null, 0]
//   );

//   return { author: author, likes: likes };
// };

// const blogsInDb = async () => {
//   const blogs = await Blog.find({});
//   return blogs.map((blog) => blog.toJSON());
// };

// const usersInDb = async () => {
//   const users = await User.find({});
//   return users.map((u) => u.toJSON());
// };

// module.exports = {
//   dummy,
//   totalLikes,
//   favoriteBlog,
//   mostBlogs,
//   mostLikes,
//   blogsInDb,
//   blogs,
//   usersInDb,
// };
