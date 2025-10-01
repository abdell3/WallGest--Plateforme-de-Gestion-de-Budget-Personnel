const express = require("express");
const session = require("express-session");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const { execSync } = require("child_process");
const { sequelize } = require("./database/models");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3100;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET ,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set('layout', 'layouts/layout.ejs')

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
try {
  execSync("npx tailwindcss -i ./public/styles/input.css -o ./public/styles/output.css", { stdio: "inherit" });
} catch (e) {}

const authRoutes = require("./routes/auth");
const webRoutes = require('./routes/web');

app.use("/auth", authRoutes);
app.use('/', webRoutes);

sequelize
  .authenticate()
  .then(() => {
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log("✅ Database connected !");
    });
  })
  .catch((err) => {
    
  });


module.exports = app;