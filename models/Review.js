const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title:{
        type:String,
        required:"Title is required."
    },
    body:{
        type:String,
        required:"Body is required."
    }
})

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;