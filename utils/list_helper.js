const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  let count = 0;

  blogs.forEach((blog) => {
    count += blog.likes;
  });

  return count;
};

const favoriteBlog = (blogs) => {
  let mostLikes = 0;
  let favorite = {};

  // { title: "none", author: "none", likes: 12 };

  blogs.forEach((blog) => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes;
      favorite = blog;
      // favorite.title = blog.title;
      // favorite.author = blog.author;
      // favorite.likes = blog.likes;
    }
  });

  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
