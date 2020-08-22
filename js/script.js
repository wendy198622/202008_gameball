/**
 * Game init
 */
var _slotMachine;
jQuery(window).load(function() { 
	var img_height = $('.gift1').children()[0].height
	_slotMachine = new SlotMachine($('.game_content .s-l ul'), {
		disH:img_height,
		callback: function() {
			// console.log("Game End");
			setTimeout(game_show, 1000);
		}
	});
	$(".game_btn").mousedown(function() {
		if(!$("body").hasClass("runing")){
			$(".btn_img").attr('src', 'assets/game_btn_start.png?200319')
		}
	});
	$(".game_btn").mouseup(function() {
		if(!$("body").hasClass("runing")){
			$(".btn_img").attr('src', 'assets/game_btn.png')
		}
	});
})


$(function () {
	let result = do_lottery();
	$(".game_btn").click(function() {
		if(!$("body").hasClass("runing")){
			result = do_lottery();
			if(result){
				_slotMachine.start(vector_vgg.key)
				$("body").addClass("runing")
			}
		}
	})
});

function game_show(){
	$("body").removeClass("runing");
	show_result();
}

