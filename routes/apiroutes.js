const db = require("../models")

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
    
}