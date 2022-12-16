const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/urlShortner")
    .then(()=>{
        console.log("connection successfull");
    }).catch(err => console.log(err))