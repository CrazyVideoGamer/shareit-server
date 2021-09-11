let app = require("nodemon")({
  exec: [process.argv[0]],
  script: "server/index.js",
  args: ["server"]
})