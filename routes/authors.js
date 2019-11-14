const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//all authors route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    //here Author is our schema..and find({}) will find all the authors..and empty JavaScript object here menas we want to find allthe authors w/o any conditions
    const authors = await Author.find({ searchOptions });
    //here we are passing all the authors that we fetched from above
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch (error) {
    //if error redirect to home page
    res.redirect("/");
  }
});

//new author route
router.get("/new", (req, res) => {
  //author variable will be sent to ejs file
  res.render("authors/new", { author: new Author() });
});

//create author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`);
  } catch (error) {
    //here we are not only rendering the new page but also passing some variables as parameters
    res.render("authors/new", {
      author: author,
      errorMessage: "got error in creating Author"
    });
  }
});
module.exports = router;
