const express = require("express");
const session = require("express-session");
const path = require("path");
const { sequelize } = require("./database/models");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3100;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home", { title: "Accueil" });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected !");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

module.exports = app;
