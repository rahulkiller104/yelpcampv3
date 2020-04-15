   
var mongoose=require("mongoose");
var commentschema=new mongoose.Schema({
	text:String,
author:String
});

var campgroundschema=new mongoose.Schema({
	name:String,
image:String,
description:String,
comments:[commentschema]

});
module.exports=mongoose.model("campground",campgroundschema);