const db = require("../models");
const bcrypt = require("bcrypt");
const path = require("path");

module.exports = function (app) {
  app.get("/products/:id", function (req, res) {
    db.Product.find({ _id: req.params.id })
      .populate("reviews")
      .then(function (data) {
        res.json(data[0]);
      });
  });
  app.get("/products", function (req, res) {
    db.Product.find({}).then(function (data) {
      res.json(data);
    });
  });
  app.get("/getcart", function (req, res) {
    db.User.find({ _id: req.cookies["id"] })
      .populate("cart")
      .then(function (data) {
        res.json(data[0].cart);
      });
  });

  app.get("/productsByCategory/:category", function (req, res) {
    db.Product.find({ category: req.params.category }).then(function (data) {
      // console.log(req.params.category);
      res.json(data);
      // console.log(data);
    });
  });
  //sending {username: username, password: password}
  app.post("/login", function (req, res) {
    let foundUsername = false;
    db.User.find({}).then(function (data) {
      data.forEach(async (e) => {
        if (req.body.username == e.username) {
          foundUsername = true;
          try {
            const matchingPassword = await bcrypt.compare(
              req.body.password,
              e.password
            );
            if (matchingPassword) {
              res.cookie("id", e._id, { maxAge: 24 * 60 * 60 * 1000 });
              console.log("You are logged in as " + e.username);
              console.log(req.cookies);
              return res.end("Successfully logged in.");
            } else {
              return res.end("Invalid credentials.");
            }
          } catch (err) {
            console.log(err);
          }
        }
      });
      if (foundUsername == false) {
        res.end("Invalid credentials.");
      }
    });
  });

  app.get("/pages", function (req, res) {
    res.json([
      {
        name: "Home",
        path: "/",
      },
      {
        name: "Login",
        path: "/login",
      },
      {
        name: "Sign Up",
        path: "/register",
      },
      {
        name: "Shop All",
        path: "/shop",
      },
    ]);
  });
  app.post("/adduser", async function (req, res) {
    const regex =
      /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g;
    let user = req.body;
    user = user.username.replace(regex, "");

    user.password = await bcrypt.hash(user.password, 10);
    console.log(user.password);
    db.User.create(user);
    res.end();
  });
  app.get("/logout", function (req, res) {
    res.clearCookie("id");
    res.sendFile(path.join(__dirname, "../public/logout.html"));
  });
  app.post("/newreview", function (req, res) {
    const regex =
      /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g;
    let username;
    if (req.cookies["id"]) {
      db.User.find({ _id: req.cookies["id"] }).then(function (data) {
        username = data[0].username;
        let title = req.body.title;
        let body = req.body.body;
        title = title.replace(regex, "");
        body = body.replace(regex, "");
        const review = {
          title: title,
          body: body,
          star: req.body.star,
          username: username,
        };
        db.Review.create(review).then(function (data) {
          return db.Product.findOneAndUpdate(
            { _id: req.body.productid },
            { $push: { reviews: data._id } },
            { new: true }
          );
        });
      });
    } else {
      username = "Anonymous";
      let title = req.body.title;
      let body = req.body.body;
      title = title.replace(regex, "");
      body = body.replace(regex, "");
      const review = {
        title: title,
        body: body,
        star: req.body.star,
        username: username,
      };
      db.Review.create(review).then(function (data) {
        return db.Product.findOneAndUpdate(
          { _id: req.body.productid },
          { $push: { reviews: data._id } },
          { new: true }
        );
      });
    }
  });
  app.post("/addtocart", function (req, res) {
    //req.body = {productid: rrjgiserjkgnksjerg};
    db.User.findOneAndUpdate(
      { _id: req.cookies["id"] },
      { $push: { cart: req.body.productid } },
      { new: true }
    ).then(function (data) {
      res.end();
    });
  });
  app.post("/removefromcart", function (req, res) {
    //req.body = {productid: rrjgiserjkgnksjerg};
    db.User.findOne({ _id: req.cookies["id"] }).then(function (data) {
      //get user
    });
  });
};
