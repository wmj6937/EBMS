var src = window.location.search;
var num = src.split("=")[1];
the_editor(num);
function the_editor(num){
	$.ajax({
		url : '/goods/api/the_editor',
		type : 'get',
		data : {
			num : num
		},
		success : function(res){
			var information = res.data[0];
			$("#pround_name").val(information.goods_name);
			$("#pround_code").val(information.goods_code);
			$("#sel_class").val(information.goods_category);
			$("#pround_price").val(information.goods_price);
		}
	})
}
$("#subm").click(function(){
	var goods_name = $("#pround_name").val();
	var goods_dose = $("#pround_code").val();
	var goods_category = $("#sel_class").val();
	var goods_price = $("#pround_price").val();
	if(/^\d+$/.test(goods_price)){
		if(!/^\d+(\.00)$/g.test(goods_price)){
			goods_price = goods_price + ".00";
		}
	}else{
		alert("请输入数字！");
	}
	save(num,goods_name,goods_dose,goods_category,goods_price);
})
function save(num,goods_name,goods_dose,goods_category,goods_price){
	$.ajax({
		url : '/goods/api/save',
		type : "post",
		data : {
			num : num,
			goods_name : goods_name,
			goods_dose : goods_dose,
			goods_category : goods_category,
			goods_price :goods_price
		},
		success : function(res){
			if(res.save_success == 70){
				location.href = "success_jup.html";
				console.log(res.data);
			}
		}
	})
}
