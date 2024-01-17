const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");

//express app
const app = express();

//connect t mongodb
const dbURI =
  "mongodb+srv://milan:milan123@cluster0.kalass5.mongodb.net/nodejs?retryWrites=true&w=majority";
//connect mangoose
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//listen for request
// app.listen(3000);

//middleware $static files
app.use(express.static("public"));

//takes url included data
app.use(express.urlencoded({ extended: true }));

//creating 3rd party middleware
app.use(morgan("dev"));

// //mongoose and mango sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "blog1",
//     snippet: "about my blog1",
//     body: "more about my new blog",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("65a766e23735b0d85b5ddb90")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

//for home.html ,,,routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//for about.html
app.get("/about", (req, res) => {
  //send data in / page
  //   res.send("hello world");
  // res.sendFile("./htmlpage/firstabout.html", { root: __dirname });

  //new way of sending data after install ejs
  res.render("about", { title: "About" });
});

//blog routes
app.use(blogRoutes);

//404 error
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
