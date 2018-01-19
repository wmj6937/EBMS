var express = require('express');
var router = express.Router();
var addmodel = require("../model/addgoods");
//动态分页列表
router.post('/api/list', function(req, res, next) {
	var page_num = req.body.page_num || 5;
	page_num = parseInt(page_num);
	var now_page = req.body.now_page || 1;
	now_page = parseInt(now_page);
	var query = addmodel.find({flag:1}).skip((now_page - 1) * page_num).limit(page_num);
	addmodel.count({flag:1},function(err,count){
		var divi = Math.ceil(count / page_num);
		query.exec(function(err,docs){
			if(!err){
				var result = {
					data : docs,
					all : count,
					noews : now_page,
					divided : divi
				}
				res.json(result);
			}
		})
	})
});
//添加新商品
router.post('/api/addajax',function(req,res,next){
	var name = req.body.name;
	var price = req.body.price;
	var	select = req.body.select;
	var	code = req.body.code;
	var add = new addmodel();
	add.goods_name = name;
	add.goods_category = select;
	add.goods_price = price; 
	add.flag = 1;
	addmodel.count({},function(err,count){
		var num = count + 1;	
		if(!code){
			if(num < 10){
				code = "ECS00000" + num;
			}else if(num < 100){
				code = "ECS0000" + num;
			}
		}
		add.goods_code = code,
		add.goods_num = num,  
		add.save(function(err){
			if(!err){
				res.send("商品存储成功！");
			}
		})
	}); 
})
//删除功能
router.post('/api/delete',function(req,res,next){
	var keywords = req.body.keys;
	addmodel.update({"goods_num":keywords},{$set:{flag:0}},function(err,docs){
		if(!err){
			var result = {
					change_success : 100,
					data : docs
				}
			res.json(result);
		}
	})
})
//改
router.post('/api/change',function(req,res,next){
	var keywords = {"goods_num" : req.body.keywords};
	var word = req.body.key;
	var update = null;
	if(word == 3){
		update = {$set : {"goods_price" : req.body.text}};
	}else if(word == 2){
		update = {$set : {"goods_code" : req.body.text}};
	}else if(word == 1){
		update = {$set : {"goods_name" : req.body.text}};
	}
	addmodel.update(keywords,update,function(err,docs){
		if(!err){
			var result = {
					change_success : 100,
					data : docs
				}
			res.json(result);
		}
	})
})
module.exports = router;
