const db = require("../models")
const bcrypt = require('bcrypt')

module.exports = function(app){
    app.get("/products/:id", function(req, res){
        db.Product.find({_id: req.params.id}, function(data){
            res.json(data[0]);
        })
    })
    app.get("/cart/:id", function(req, res){
        db.User.find({_id: req.params.id}).populate("cart").then(function(data){
            res.json(data);
        })
    })
    app.get("/products/:category", function(req, res){
        db.Product.find({category: req.params.category}, function(data){
            res.json(data);
        })
    })
    //we will add the pages manually
    app.get("/pages", function(req, res) {
        db.page.find({}).then(function(data) {
            res.json(data);
            //data will have a page title and a page path
        })
    })
    //sending {username: username, password: password}
    app.post("/login", function(req, res){
        db.User.find({}).then(function(data){
            data.forEach(e => {
                if(req.body.username == e.username){
                    if(await bcrypt.compare(req.body.password, e.password)){
                       document.cookie = `id=${e._id}; max-age=60*60*24` // = 86400
                        
                    } else{
                        res.send("Invalid credentials.")
                    }
                } else{
                    res.send("User not found.")
                }
            })
        })
    })
    
}