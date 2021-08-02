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
    let user = req.body;
    db.User.find({}).then(function (data) {
      data.forEach(async (e) => {
        if (e.username == user.username) {
          return res.send("Username Already Taken");
        }
      });
    });
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
    console.log(req.body);
    db.User.findOneAndUpdate(
      { _id: req.cookies["id"] },
      { $pull: { cart: req.body.productid } },
      { new: true }
    ).then(function (data) {
      res.end();
    });
    //{$pull: {cart: {$in: [req.body.productid]}}}, {new: true}
  });
  app.post("/updateusername", function (req, res) {
    //req.body = {updatedUsername, password}
    db.User.findOne({ _id: req.cookies["id"] }).then(async function (data) {
      try {
        console.log(req.body.password);
        console.log(data.password);
        const passwordsMatch = await bcrypt.compare(
          req.body.password,
          data.password
        );
        if (passwordsMatch) {
          db.User.findOneAndUpdate(
            { _id: req.cookies["id"] },
            { username: req.body.updatedUsername }
          ).then(function (data) {
            res.send("Username changed successfully.");
          });
        } else {
          res.send("Incorrect password.");
        }
      } catch (err) {
        console.log(err);
      }
    });
  });
  app.post("/updatepassword", function (req, res) {
    // req.body = {newPassword, oldPassword}
    console.log(req.body);
    db.User.findOne({ _id: req.cookies["id"] }).then(async function (data) {
      const passwordsMatch = await bcrypt.compare(  
        req.body.oldPassword,
        data.password
      );
      console.log(passwordsMatch);
      if (passwordsMatch) {
        db.User.findOneAndUpdate(
          { _id: req.cookies["id"] },
          { password: await bcrypt.hash(req.body.newPassword, 10) }
        ).then(function (data) {
          res.send("Password changed successfully.");
        });
      } else {
        res.send("Incorrect password.");
      }
    });
  });
  app.post("/deleteaccount", function (req, res) {
    // req.body = {password}

    db.User.findOne({ _id: req.cookies["id"] }).then(async function (data) {
      const passwordsMatch = await bcrypt.compare(
        data.password,
        req.body.password
      );
      if (passwordsMatch) {
        db.User.findOneAndRemove({ _id: req.cookies["id"] }).then(function (
          data
        ) {
          res.clearCookie("id");
          res.send("Account deleted.");
        });
      } else {
        res.send("Incorrect password.");
      }
    });
  });
};
