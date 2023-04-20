const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const sum = likes.reduce((sum, likes) => sum + likes, 0);
  return blogs.length === 0 ? 0 : sum;
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const max = Math.max(...likes);
  return blogs.length === 0 ? null : blogs.find((blog) => blog.likes === max);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
