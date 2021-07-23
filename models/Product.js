const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:{
        type:String,
        required: "Name is required",

    },
    imagelink:{
        type:String,
        required: "Link is required"
    },
    category:{
        type:String,
        required:"Category is required."
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;