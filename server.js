const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");



mongoose.connect("mongodb+srv://user:mrdan@cluster0.eud2x.mongodb.net/marketplace?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json());    

const PORT = process.env.PORT || 3000;
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);


app.listen(PORT, function () {
console.log('App running on port http://localhost://'  + PORT);
});