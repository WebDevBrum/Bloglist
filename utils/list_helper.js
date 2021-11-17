const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  let count = 0;

  blogs.forEach((blog) => {
    count += blog.likes;
  });

  return count;
};

module.exports = {
  dummy,
  totalLikes,
};
