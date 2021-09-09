let app = require("nodemon")({
  exec: [process.argv[0]],
  script: "templateApp/index.js",
  args: ["f"]
})