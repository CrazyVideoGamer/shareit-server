console.log("---------------------") // separater for nodemon dev

let argv = process.argv.slice(2);
if (argv.length < 1) {
  console.error("Please give the file or folder to share.");
} else if (argv.length > 1) {
  console.error("Too much arguments. Please provide only one argument.")
} else if (argv.includes("--help") || argv.includes("-h")) {
  console.log(`shareIt - an easy way to transfer files/folders to different devices

Usage: shareIt ./path/to/file/or/folder

Arguments:
  -h or --help    Display help message and exit
`)
} else {

const f = argv[0];
const fs = require("fs");

try {
  if (fs.existsSync(f)) {

    const express = require("express");
    const serveIndex = require("serve-index");

    const app = express();

    app.use("/", express.static(f), serveIndex(f));

    app.listen(3000, (e) => {
      if (e) {
        console.error("Unable to start server. Port 3000 may already be used");
      } else {
        const namor = require("namor");
        const subdomain = namor.generate({ words: 3, saltLength: 5 })

        const ip = require("ip");
        const addr = ip.address();
        console.log(addr);

        console.log("Creating url...")

        const axios = require("axios").default;
        axios.post("http://localhost:5000", {
            subdomain: subdomain,
            url: `http://${addr}:3000/`
          })
          .then(res => {
            if (res.data === "subdomain created") {
              console.log(`Shared! Go to https://${subdomain}.repl.co`);
            }
          })
          .catch(e => {
            console.log("Error. Unable to create url.")
            console.error(e);
          })
      }
    })
  } else {
    console.error(`File/folder ${f} does not exist.`)
  }
} catch(e) {
  console.error("An error occurred.");
}

}