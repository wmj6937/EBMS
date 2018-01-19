//选项卡
$(".main ul li").click(function(){
	var ind = $(this).index();
	var jqdiv = $(".main>div");
	$(this).css({"background":"#fff","color":"#000"});
	$(this).siblings().css({"background":"none","color":"#787878"});
	jqdiv.eq(ind).css({"display":"block"});
	jqdiv.eq(ind).siblings("div").css({"display":"none"});
})
//提交ajax请求
$("#subm").click(function(){
	var name = $("#pround_name").val();
	var price = $("#pround_price").val();
	var select = $("#sel_class").val();
	var code = $("#pround_code").val();
	if(!name){
		alert("请输入商品名称");
	}else if(select == "请选择..."){
		alert("请选择商品分类");
	}else if(!price){
		alert("请输入商品价格");
		if(/^\d+$/.test(price)){
			if(!/^\d+(\.00)$/g.test(price)){
				price = price + ".00";
			}
		}else{
			alert("请输入数字！");
		}
	}else{
		add_ajax(name,price,select,code);
	}
})
function add_ajax(name,price,select,code){
	$.ajax({
		url : "/goods/api/addajax",
		type : "POST",
		data : {
			name : name,
			price : price,
			select : select,
			code : code
		},
		success : function(res){
			console.log(res);
			window.location = "success_jup.html";
		}
	})
}
//点击图标内容隐藏
var clImg = $(".currency p label img");
var hidB = $(".currency b");
clImg.click(function(){
	var num = clImg.index($(this));
	hidB.eq(num).toggleClass("hidB");
})
//添加分类
var addBtn = $(".currency p").eq(3);
addBtn.find("button").click(function(){
	addBtn.append($("#sel_class").clone());
})
//添加品牌
var btn4 = $(".currency p").eq(4).find("button");
var disEm4 = $(".currency p").eq(4).find("em");
var addSelec4 = $(".currency p").eq(4).find("select");
btn4.eq(0).click(function(){
	disEm4.css("display","inline-block");
})
btn4.eq(2).click(function(){
	disEm4.css("display","none");
})
btn4.eq(1).click(function(){
	if(disEm4.find("input").val()){
		addSelec4.append("<option selected='selected'>" + disEm4.find("input").val() + "</option>");
		disEm4.css("display","none");
	}else{
		alert("品牌名称不能为空！");
	}
	
})
//添加商品
var btn2 = $(".currency p").eq(2).find("button");
var disEm2 = $(".currency p").eq(2).find("em");
var addSelec2 = $(".currency p").eq(2).find("select");
btn2.eq(0).click(function(){
	disEm2.css("display","inline-block");
})
btn2.eq(2).click(function(){
	disEm2.css("display","none");
})
btn2.eq(1).click(function(){
	if(disEm2.find("input").val()){
		addSelec2.append("<option selected='selected'>" + disEm2.find("input").val() + "</option>");
		disEm2.css("display","none");
	}else{
		alert("品牌名称不能为空！");
	}
})
//取整
var btn8 = $(".currency p").eq(8).find("button");
var inpu8 = $(".currency p").eq(8).find("input");
btn8.click(function(){
	var parseNum = parseInt(inpu8.val());
	if(parseNum){
		inpu8.val(parseNum);
	}else{
		alert("请输入纯数字！");
	}
})





