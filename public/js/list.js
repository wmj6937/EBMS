//获取页面元素
var inpu = $(".page input");
var now = $(".page span").eq(2);
var allNum = $(".page span").eq(0);
var into = $(".page span").eq(1);
var sel = $(".page select");
var search = $(".search button");
var entrust_record = $(".record");
//页面加载完成调用ajax生成列表
fn(inpu.val(),now.html());
//分页效果
var clA = $(".page a");
//第一页
clA.eq(0).click(function(){
	fn(inpu.val(),1);
})
//上一页
clA.eq(1).click(function(){
	var pre = now.html();
	pre --;
	if(pre <= 1){
		pre = 1;
	}
	fn(inpu.val(),pre);
})
//下一页
clA.eq(2).click(function(){
	var pre = now.html();
	pre ++;
	if(pre >= into.html()){
		pre = into.html();
	}
	fn(inpu.val(),pre);
})
//末页
clA.eq(3).click(function(){
	fn(inpu.val(),into.html());
})
//下拉选项
sel.change(function(){
	fn(inpu.val(),sel.val());
})
//每页显示数量变化
inpu.change(function(){
	fn(inpu.val(),1);
})
search.click(function(){
	var search_val = $(".search input").val();
	fn(inpu.val(),1,search_val);
})
//列表ajax
function fn(pages,nows,keywords){
	$.ajax({
		url : "/goods/api/list",
		type : "post",
		data : {
			page_num : pages,   //每页显示数量
			now_page : nows,     //请求页码 
			keywords : keywords
		},
		success : function(res){
			$(".record ul").remove();
			//当总页数发生变化时,下拉选项重新构建
			if(into.html() != res.divided){
				sel.find("option").remove();
				var pages = res.divided;
				for(var z = 1;z <= pages;z ++){
					sel.append(`<option>${z}</option>`);
				}
			}
			now.html(res.noews);  //当前页码
			allNum.html(res.all); //总数据条数
			into.html(res.divided);//总页数
			sel.val(res.noews);  //下拉选项更新
			var query = res.data; //页面数据
			var len = query.length;
			if(len){
				//构建页面
				$(".no_record").css("display","none");
				$(".list ul").addClass("list_header");
				$.each(query,function(data){
					var num = query[data].goods_num;
					var code = query[data].goods_code;
					var name = query[data].goods_name;
					var price = query[data].goods_price;
					entrust_record.append(`<ul class="list_header">
						<li id="goods_num"><input type="checkbox" name="">${num}</li>
						<li>
							<input type="text" name="" value="${name}">
						</li>
						<li>
							<input type="text" name="" value="${code}" id="goods_code">
						</li>
						<li>
							<input type="text" name="" value="${price}">
						</li>
						<li class="off">
							<img src="/img/yes.gif">
						</li>
						<li  class="off">
							<img src="/img/no.gif">
						</li>
						<li  class="off">
							<img src="/img/no.gif">
						</li>
						<li  class="off">
							<img src="/img/no.gif">
						</li>
						<li>
							<input type="text" name="" value="100">
						</li>
						<li>
							<input type="text" name="" value="1">
						</li>
						<li>
							<input type="text" name="" value="0">
						</li>
						<li class="change">
							<img src="/img/icon_view.gif">
							<img src="/img/icon_edit.gif">
							<img src="/img/icon_copy.gif">
							<img src="/img/icon_trash.gif">
						</li>
					</ul>`);
				})
			}else{
				//没有数据页面
				$(".no_record").css("display","block");
				$(".list ul").removeClass("list_header");
			}
		}
	})
}
//图片编辑
entrust_record.on("click",".off img",function(){
	if($(this).attr("src") == "/img/no.gif"){
		$(this).attr("src","/img/yes.gif");
	}else{
		$(this).attr("src","/img/no.gif");
	}
})
//逻辑删除功能
entrust_record.on("click",".change img",function(){
	var indexs = $(this).index();
	var content = $(this).parents("li").siblings("#goods_num").text();
	if(indexs == 3){
		dele(content);
		fn(inpu.val(),now.html());
	}
})
function dele(keys){
	$.ajax({
		url : "/goods/api/delete",
		type : "post",
		data : {
			keys : keys
		},
		success : function(res){
			if(res.change_success == 100){
				console.log(res.data);
			}
		}
	})
}
//改(列表页)
entrust_record.on("change","input[type='text']",function(){
	var change_text = $(this).parents("li").siblings("#goods_num").text();
	var id = $(this).parents("li").index();	
	var text = $(this).val();
	gai(change_text,id,text);
})
function gai(objkeys,key,changeobjtext){
	$.ajax({
		url : "/goods/api/change",
		type : "post",
		data : {
			keywords : objkeys,
			key : key,
			text : changeobjtext
		},
		success : function(res){
			if(res.change_success == 90){
				console.log(res.data);
			}
		}
	})
}
//改(编辑页)
entrust_record.on("click",".change img",function(){
	var indexs = $(this).index();
	var editor_text = $(this).parents("li").siblings("#goods_num").text();
	if(indexs == 1){
		location.href = "the_editor.html?goods_name=" + editor_text; 
	}

})
//input宽度自适应
dem(entrust_record.find("input[type='text']"));
entrust_record.on("keyup","input[type='text']",function(){
	var wid = $(this).val().length * 13;
	$(this).css({'width':wid,"border":"1px solid #ccc"});
})
entrust_record.on("dblclick","input[type='text']",function(){
	var wid = $(this).val().length * 13;
	$(this).css({'width':wid,"border":"1px solid #ccc"});
})	
entrust_record.on("blur","input[type='text']",function(){
	var wid = $(this).val().length * 13;
	$(this).css({'width':wid,"border":"none"});
})			
function dem(demos){
	var len = demos.length;
	for(var i = 0;i < len;i ++){
		demos[i].style.width = demos[i].value.length * 13 + "px";
	}
}