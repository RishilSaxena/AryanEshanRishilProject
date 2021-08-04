const path = require("path");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/shop/:id", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/shop.html"));
  });
  app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });
  app.get("/productpage/:id", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/productpage.html"));
  });
  app.get("/aboutus", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/aboutus.html"));
  });
  app.get("/cart", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/cart.html"));
  });
  app.get("/account", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/account.html"));
  });
  app.get("/checkout", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/checkout.html"));
  });
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/404.html"));
  });
};
