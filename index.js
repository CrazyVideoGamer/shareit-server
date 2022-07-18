console.log("---------------------") // separater for nodemon dev

const express = require("express");

const httpProxy = require("http-proxy");
const HttpProxyRules = require('http-proxy-rules');

let proxy = httpProxy.createProxyServer();

const app = express();

let routes = {};

app.use(express.json());

app.post("/", (req, res) => {
  if (req.body.route in routes) {
    console.log("collision");
    res.send("collision")
  } else {
    routes[req.body.route] = req.body.info;
    console.log(routes);
    console.log("route created");
    res.send("route created");
  }
})

app.get("/", (req, res) => {
  res.send("Please create a shared link in the terminal.")
})

app.get("/robots.txt", (req, res) => {
  res.sendFile(__dirname + "/robots.txt");
})

app.get(["/:route", "/:route/*"], (req, res) => {
  // TODO: use ngrok instead of addr

  console.log(req.params, req.url);
  if (req.params.route in routes) {
    route = routes[req.params.route];
    let fLocation = `http://${route.addr}:${route.port}/${req.params.route}`

    proxyRuleURL = `.*/${req.params.route}`

    let proxyRules = new HttpProxyRules({
      rules: {
        [proxyRuleURL]: fLocation
      },
      default: fLocation
    })

    let target = proxyRules.match(req);

    console.log(req.url);

    proxy.web(req, res, {target: target});

  } else {
    console.log(`not a route ${JSON.stringify(routes)}`);
  }
});

app.listen(3000, e => {
  if (e) {
    console.log(e);
  }
});