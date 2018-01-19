var express = require('express');
var router = express.Router();
var model = require("../model/user");
var md5 = require("md5");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});
//登录页
router.get('/login',function(req,res,next){
	res.render("login");
})
router.post('/api/login',function(req,res,next){
	var name = req.body.name;
	var pwd = req.body.pwd;
	var relute = {
		code : 1,
		massage : "登录成功"
	}
	model.find({name:name},function(err,docs){
		if(docs.length == 1){
			if(docs[0].pwd == md5(pwd)){
				req.session.name = name;
				res.json(relute);	
			}else{
				relute = {
					code : 0,
					massage : "登录失败，请检查您的用户名和密码."
				}
				res.json(relute);
			}	
		}else{
			relute = {
				code : 0,
				massage : "用户名未注册！"
			}
			res.json(relute);
		}
	})
})
//管理页面
router.get('/index', function(req, res, next) {
	//判断如果session为null或者不存在用户的情况下，此页面不可见
	if(req.session == null || req.session.name == null){
		res.redirect('login');
		return;
	}
  	res.render('index', {});
});
//注册页面
router.get('/reglist',function(req,res,next){
	res.render("reglist");
})
router.post('/api/reglist', function(req, res, next) {
	var name = req.body.name;
	var pwd = req.body.pwd;
	var ruesult = {
		code : 1,
		massage : "注册成功"
	}
	model.find({name:name},function(err,docs){
		if(docs.length > 0){
			ruesult = {
				code : -100,
				massage : "用户名已被占用，请使用其他的用户名。"
			}
			res.json(ruesult);
			return;
		}
		var um = new model();
		um.name = name;
		um.pwd = md5(pwd);
		um.save(function(err){
			if(err){
				ruesult = {
					code : -110,
					massage : "注册失败"
				}
				res.json(ruesult);
			}
			res.json(ruesult);
		})
	})
});
module.exports = router;