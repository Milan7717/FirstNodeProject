const http = require("http");
const fs = require("fs");
const _ = require("lodash");

// creating a server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // make a header content type
  res.setHeader("Content-Type", "text/html");

  // routin the pages
  let path = "./";
  switch (req.url) {
    case "/":
      path += "home.html";
      //adding status
      res.statusCode = 200;

      break;

    case "/about":
      path += "about.html";
      //adding status
      res.statusCode = 200;
      break;

    // redirecting to about me
    case "/about-us":
      //adding status
      res.statusCode = 301;

      res.setHeader("Location", "/about");
      break;

    default:
      path += "404.html";
      //adding status
      res.statusCode = 400;

      break;
  }

  // write something to sent to the browser
  // res.write('<p>hello world</p>');

  // send data to html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port 3000");
});
