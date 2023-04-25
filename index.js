const express = require("express");
const port = 8000;
const path = require("path");
const sassMiddleware = require("node-sass-middleware");
const expressLayout = require("express-ejs-layouts");
const app = express();
app.use(expressLayout);
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(express.static("./assets"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layouts extractStyles", true);
app.set("layouts extractScripts", true);

app.use("/", require("./routes"));
app.listen(port, (error) => {
  if (error) {
    console.log(`Error in connecting to PORT :>> ${port} `);
  }
  console.log(`Successfully connected to PORT :>> ${port} `);
});
