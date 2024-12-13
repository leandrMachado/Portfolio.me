require("dotenv").config();
const express = require("express");
const app = express();

app.use(require("body-parser").json());
app.use(
  require("cors")({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/articles", require("./router/articles.router"));
require('./router/files.router')(app);

app.use((req, res, next) => {
  const err = {};
  err.status = 404;
  err.message = "Page not found";
  next(err);
});

app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  
  if (err.status === 404) res.status(404).json(message);
});

module.exports = app;
