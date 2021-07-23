const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: "Name is required."
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
})

const User = mongoose.model("User", UserSchema);
module.exports = User;