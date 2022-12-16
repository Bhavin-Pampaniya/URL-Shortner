const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ShortUrl = require("./models/shortUrl");

require("./db/conn")

app.set("view engine","hbs");
app.use(express.urlencoded({extended:false}))

app.post("/shortUrls",async (req,res)=>{
    await ShortUrl.create({full : req.body.fullUrl});
    res.redirect("/");

})

app.get("/",async (req,res)=>{
    const shortUrls = await ShortUrl.find()
    res.render("index",{shortUrls : shortUrls});
}) 

app.get("/:shorturl",async (req,res)=>{
    const shortUrl = await ShortUrl.findOne({short:req.params.shorturl});
    if(shortUrl == null) return res.status(404);

    shortUrl.clicks++;
    await shortUrl.save();
    res.redirect(shortUrl.full);
})
 


app.listen(port,()=>{
    console.log(`listening at ${port}`);
})