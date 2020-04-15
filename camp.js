var express   =require("express");
var app       =express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var campground=require("./models/campground");
var seedDB= require("./seed")

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("views"));
app.set("view engine","ejs");


seedDB();





app.get("/",function(req,res){
	res.render("landing");
});


app.get("/campground",function(req,res){
	campground.find({},function(err,campgrounds)
	{
		if(err)
		{
			console.log(err);
		}else
	
	{
res.render("campground",{campground:campgrounds});
}
});
});





app.post("/campground",function(req,res){
	//get data from from
	var name =req.body.name;
	var image=req.body.image;
	var description=req.body.description;

	var newcampground={name: name,image: image, description: description}
	//create new app ground
campground.create(newcampground,function(err,newlycreated)
{
if(err)
{
	console.log(err);
}else
{
res.redirect("/campground"); 
}

});
	
	
});

	app.get("/campground/new",function(req,res){
	//get data from from 
	res.render("new");   
	
});
	app.get("/campground/:id",function(req,res) 
	{

		campground.findById(req.params.id, function(err,campgrounds)
		{
			if(err) 
			{
				console.log(err);
			}else
			{
				res.render("show", {campground: campgrounds});
			}

		});
		
	});

app.listen(3000,function(){
	console.log("server is started");
});