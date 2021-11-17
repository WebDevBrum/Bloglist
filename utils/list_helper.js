/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
const blog = require("../models/blog");

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

const mostBlogs = (bloglist) => {
  let blogCount = {};
  let blogMax = 0;
  let authorDetails = { author: null, blogs: null };

  bloglist.forEach((blog) => {
    blogCount[blog.author] = blog.author;

    if (blogCount[`${blog.author}count`]) {
      blogCount[`${blog.author}count`] += 1;
    } else {
      blogCount[`${blog.author}count`] = 1;
    }
  });

  const authors = Object.keys(blogCount);

  authors.forEach((entry) => {
    if (blogCount[`${entry}count`] > blogMax) {
      blogMax = blogCount[`${entry}count`];
      authorDetails.author = entry;
      authorDetails.blogs = blogCount[`${entry}count`];
    }
  });

  return authorDetails;
  // Now how would lodash help here??
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
