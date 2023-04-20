const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const sum = likes.reduce((sum, likes) => sum + likes, 0);
  return blogs.length === 0 ? 0 : sum;
};

module.exports = {
  dummy,
  totalLikes,
};
