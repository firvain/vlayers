const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const app = express();
// create middleware to handle the serving the app
app.use("/", serveStatic(path.join(__dirname, "/dist")));
// Catch all routes and redirect to the index file
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});
const port = process.env.PORT || 80;
app.listen(port);
