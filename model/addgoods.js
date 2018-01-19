var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var goods = new Schema({
	goods_name : String,  //商品名
	goods_category : String,   //商品分类
	goods_price : String,    //商品价格
	goods_num : String,     //商品编号
	goods_code : String,    //商品货号
	flag : Number,
	create_date : {type : Date,default : Date.now}
});
var goods_model = mongoose.model("addgoods",goods);
module.exports = goods_model;