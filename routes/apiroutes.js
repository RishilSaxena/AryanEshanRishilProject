const db = require("../models")
const bcrypt = require('bcrypt')
const path = require("path");

module.exports = function(app){
    app.get("/products/:id", function(req, res){

        db.Product.find({_id: req.params.id}).populate("reviews").then(function(data){

            res.json(data[0]);
        })
    })
    app.get("/products", function(req, res){
        db.Product.find({}).then(function(data){
            res.json(data);
        })
    })
    app.get("/getcart", function(req, res){
        db.User.find({_id: req.cookies.id}).populate("cart").then(function(data){
            res.json(data[0].cart);
        })
    })

    app.get("/productsByCategory/:category", function(req, res){
        db.Product.find({category: req.params.category}).then(function(data){
            // console.log(req.params.category);
            res.json(data);
            // console.log(data);
        })
    })
    //sending {username: username, password: password}
    app.post("/login", function(req, res){
        db.User.find({}).then(function(data){
            data.forEach(async e => {
                if(req.body.username == e.username){
                    try{
                        const matchingPassword = await bcrypt.compare(req.body.password, e.password)
                        if(matchingPassword){
                            res.cookie("id", e._id, {maxAge: 24*60*60});
                            console.log("You are logged in as " + e.username);
                            console.log(req.cookies)
                            res.send("Successfully logged in.")

                         } else{
                             res.send("Invalid credentials.")
                             console.log("Invalid credentials");
                         }
                    } catch(err){
                        console.log(err);
                    }
                    
                } 
            })
        })
    })

    app.get("/pages", function(req, res){
        res.json([{
            name: "Home",
            path: "./index.html"
        },
        {
            name:"Login",
            path: "./login.html"
        }])
    })
    app.post("/adduser", async function(req, res){
        const user = req.body;

        user.password = await bcrypt.hash(user.password, 10);
        console.log(user.password)
        db.User.create(user);
        res.end();
    })
    app.get("/logout", function(req, res){
        res.clearCookie("id");
        res.sendFile(path.join(__dirname, "../public/logout.html"))
    })
    app.post("/newreview", function(req, res){
        let username;
        if(req.cookies.id){
            username = req.cookies.id
        } else{
            username = "Anonymous"
        }
        const review = {title: req.body.title, body: req.body.body, star: req.body.star, username: username}
        db.Review.create(review).then(function(data){
            return db.Product.findOneAndUpdate({_id: req.body.productid}, {$push:{ notes: data._id}}, {new: true})
        });

    })

}