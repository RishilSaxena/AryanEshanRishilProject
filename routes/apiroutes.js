const db = require("../models")
const bcrypt = require('bcrypt')

module.exports = function(app){
    app.get("/products/:id", function(req, res){
        db.Product.find({_id: req.params.id}, function(data){
            res.json(data[0]);
        })
    })
    app.get("/products", function(req, res){
        db.Product.find({}).then(function(data){
            res.json(data);
        })
    })
    app.get("/getcart", function(req, res){
        db.User.find({_id: document.cookie}).populate("cart").then(function(data){
            res.json(data);
        })
    })

    app.get("/productsByCategory/:category", function(req, res){
        db.Product.find({category: req.params.category}).then(function(data){
            console.log(req.params.category);
            res.json(data);
            console.log(data);
        })
    })
    //sending {username: username, password: password}
    // app.post("/login", function(req, res){
    //     db.User.find({}).then(function(data){
    //         data.forEach(e => {
    //             if(req.body.username == e.username){
    //                 try{
    //                     if(await bcrypt.compare(req.body.password, e.password)){
    //                         document.cookie = `id=${e._id}; max-age=60*60*24` // = 86400
                             
    //                      } else{
    //                          res.send("Invalid credentials.")
    //                      }
    //                 } catch{
    //                     console.log("error")
    //                 }
                    
    //             } else{
    //                 res.send("User not found.")
    //             }
    //         })
    //     })
    // })

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
    
}