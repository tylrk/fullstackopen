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

const mostBlogs = (blogs) => {
  const author = blogs.map((blog) => blog.author);
  const count = blogs.reduce((countObj, blog) => {
    const value = blog.author;
    countObj[value] = (countObj[value] || 0) + 1;
    return countObj;
  }, {});

  let maxCount = 0;
  let mostCommonAuthor;

  for (let author in count) {
    if (count[author] > maxCount) {
      maxCount = count[author];
      mostCommonAuthor = author;
    }
  }

  return {
    author: mostCommonAuthor,
    blogs: maxCount,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
