const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required: "Username is required."
    },
    password:{
        type:String,
        required:"Username is required."
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
})

const User = mongoose.model("User", UserSchema);
module.exports = User;