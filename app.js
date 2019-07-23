const express = require("express");
const secuelize = require("./models").sequelize;
const app = express();
const port = 3000;
const Book = require("./models").Book;

app.set("view engine", "pug");
app.use("/static", express.static("public"));

//Routes

app.get("/", (req, res) => {
  res.redirect("/books");
});

app.get("/books", (req, res) => {
  Book.findAll().then(books => res.render("index", { books }));
});

app.get("/books/new", (req, res) => {
  res.render("new-book");
});

app.get("/books/:id", (req, res) => {
  Book.findByPk(req.params.id).then(book =>
    res.render("update-book", { book })
  );
});



secuelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`application running on port ${port}`);
  });
});
