const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

//here "Author" is the name of model i.e the table name in the database
module.exports = mongoose.model("Author", authorSchema);
