var http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    res.setHeader("Content-Type", "text/html");
    // Create file path
    if (req.url == "/Create") {
      fs.appendFile("mynewfile1.txt", "Hello content!", (err) => {
        if (err) {
          res.statusCode = 500;
          res.statusMessage = "Error creating file";
          res.end(err.message);
        } else {
          fs.readFile("mynewfile1.txt", "utf8", (err, data) => {
            if (err) {
              res.statusCode = 500;
              res.statusMessage = "Error reading file";
              res.end(err.message);
            } else {
              res.write(data);
              res.end();
            }
          });
        }
      });
    }
    // Read file path
    else if (req.url == "/Read") {
      fs.readFile("mynewfile1.txt", "utf8", (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.statusMessage = "File not found";
          res.end(err.message);
        } else {
          res.write(data);
          console.log(data);
          res.end();
        }
      });
    }
    // Delete file path
    else if (req.url == "/Delete") {
      fs.unlink("mynewfile1.txt", (err) => {
        if (err) {
          res.statusCode = 404;
          res.statusMessage = "File not found";
          res.end(err.message);
        } else {
          res.write("File Deleted");
          res.end();
        }
      });
    } else {
      res.statusCode = 400;
      res.statusMessage = "Invalid request";
      res.write("Options are Create, Read, Delete");
      res.end();
    }
  })
  .listen(8080);
