let argv = process.argv.slice(2);
if (argv.length < 1) {
  console.error("Please give the file or folder to share.");
} else {

const express = require("express");
const serveIndex = require("serve-index");

const app = express();

app.get("/" , (req, res) => {
  res.json(argv);
})

app.listen(3000, (e) => {
  if (e) {
    console.error("unable to start server");
  } else {
    console.log("listening on port 3000");
  }
})

}