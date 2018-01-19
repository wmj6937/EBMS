
var bgB = $(".one_menu li a b");
var num = bgB.length;
for(var i = 0; i < num;i ++){
	bgB.eq(i).css("background","url(img/menu0_" + (i + 1) + ".png) no-repeat");
}
var up = 0;
var con = 0;
$(".one_menu li").on("click",".clic",function(){
	var allli = $(".one_menu li");
	var pseli = $(this).parent("li");
	var inde = allli.index(pseli);
	pseli.toggleClass("toogli");
	pseli.siblings("li").removeClass("toogli");
	$(this).find("b").css("background","url(img/menu1_" + (inde + 1) + ".png) no-repeat");
	if(up != inde){
		bgB.eq(up).css("background","url(img/menu0_" + (up + 1) + ".png) no-repeat");
		con = 1;
	}else{
		con ++;
		$(this).find("b").css("background","url(img/menu" + con % 2 + "_" + (inde + 1) + ".png) no-repeat");
	}
	up = inde;
})
$("#center_box a").click(function(){
	if($(".one_menu").css("display") == "none"){
		width_change();
	}else{
		$(this).css("background","url(../img/arrow_left.gif) no-repeat");
		$(".one_menu").css("display","none");
		$("#left_box").css({"width":37,"background":"url(../img/show_icon.gif) no-repeat","overflow":"hidden"})
	}
	
})
//中间栏
$("#left_box").click(function(){
	width_change();
})
function width_change(){
	$(this).css("background","url(../img/arrow_right.gif) no-repeat");
	$(".one_menu").css("display","block");
	$("#left_box").css({"width":180,"background":"none","overflow-y":"auto"});
}


