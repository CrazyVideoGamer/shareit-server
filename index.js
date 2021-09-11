console.log("---------------------") // separater for nodemon dev

const express = require("express");
const app = express();

let subdomains = [];

app.use(express.json());

app.post("/", (req, res) => {
    subdomains.push(req.body);
    console.log("subdomain created");
    res.send("subdomain created");
})

app.get("/", (req, res) => {
  res.send("Please create a shared link at command line.")
});
  

app.get("*", (req, res, next) => {
  if (req.path.contains("favicon.ico"), () => {
    res.sendStatus(204);
  })
  console.log(req.subdomains);
})

app.listen(5000);