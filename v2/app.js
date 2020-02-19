var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//Schemasetup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String 
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//     name : "labubu 泡芙",
//     image: "data:image/jpeg;base64,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",
//     description: "Labubu desert series"
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("newly created campground: ");
//         console.log(campground);
//     }
// });



app.get("/", function(req,res){
    res.render("landing");
});

// var campgrounds = [
//     {name : "fxl", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQb8bX06xETPh9S_ED2v5dQPCyUq5rQzWbZw1fd13LAowWx6quBzsB57Z6ywWvbsuWMg663hA_t0YHLvy7uHBkfKcgAzNk7l5YQT0NPrApTEs5icQ9Q_5h4&usqp=CAc"},
//     {name : "Hrx", image: "data:image/webp;base64,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"},
//     {name : "Molly", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQsb4xCfHQDESQPy7mO851yc9m9oS-xpwMoEbXW3BbSzs_nvcZ21K-Pwbm_VUJHhIzq8I8aMkwxylm3P8LKManuNwkE4NXlIqzOwtSuMCawU2zVZ-rm5i1H&usqp=CAc"}
// ]
//index route: show all campground
app.get("/campgrounds", function(req, res){
    // get all campground from db
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index",{campgrounds:allCampgrounds});
        }
    }); 
});

//Create - add new campground to data base
app.post("/campgrounds", function(req, res){
    //get data from gorm and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // creat a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            // redirect back to campground page
            res.redirect("/campgrounds");
        }
    });
});

//New -show form to create new campground
app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

//Show - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000,function(){
    console.log("The YelpCamp Server Has Started!")
});