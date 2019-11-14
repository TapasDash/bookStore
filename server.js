if (process.env.NODE_ENV !== "production") {
  //we will load these env variables only when the node environment is developement not production
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

//setting our view-engine to ejs
app.set("view engine", "ejs");
//setting from where our views would be coming from
app.set("views", __dirname + "/views");
//setting from where layout files would be coming from ..layout files are those files which conatins header,footer ect
app.set("layout", "layouts/layout");
//we will let our app use the ejs layouts
app.use(expressLayouts);
//we will let our app use the static files(html,css,vanillaJS) from our public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose.."));

//for root,we are hooking up the indexRouter
app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(process.env.PORT || 3000);
