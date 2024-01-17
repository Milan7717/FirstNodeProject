//blog routes
const express = require("express");
const router = express.Router();
//import models
const Blog = require("../model/blog");

router.get("/blogs", (req, res) => {
  //sort by newest to oldest
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "all Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

//post request
router.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

router.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

router.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => console.log(err));
});

//for delete
router.delete("/blog/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
