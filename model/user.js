var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var user = new Schema({
	name : String,
	pwd : String,
	create_date : {type : Date,default : Date.now}
});
var model = mongoose.model("houtai",user);
module.exports = model;
