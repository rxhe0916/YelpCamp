var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/cat_app");
var catSchema = new mongoose.Schema({
    name:String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the db
// var george = new Cat({
//     name: "George",
//     age:11,
//     temperament:"Groucgy"
// });

// george.save(function(err,cat){
//     if(err){
//         console.log("Something went wrong!")
//     } else {
//         console.log("we just saved a cat to the db:")
//         console.log(cat);
//     }
// });
Cat.create({
    name: "Snow white",
    age: 15,
    temperament: "Bland"
}, function(err,cat){
     if(err){
         console.log(err);
     } else {
         console.log(cat);
     }
});


//retrive all cats from db

Cat.find({},function(err,cats){
    if(err){
        console.log("oh no!")
        console.log(err);
    } else {
        console.log("all the cats");
        console.log(cats);
    }
});
