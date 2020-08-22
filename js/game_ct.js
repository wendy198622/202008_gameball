/**
 * 主題版本
 * @version 2.0.6
 */

function Vgg() {
	this.key = 0
}

const vector_vgg = new Vgg()

// 初始化
$(function () {
	set_content();
	$('.vgg-copy-code').click(vgg_copy_code_handler);
	$('.vgg-retry').click(vgg_retry_handler);
	$('.vgg-pop-close').click(vgg_pop_close_handler);
	$("[class^='vgg-share']").click(vgg_sns_share_btn_handler);
	check_overdue();
	check_over_limit();
})


/**
 * Cookie 到期日，次日00:00:00
 */
var currentDate    = new Date();
var expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);

function set_count() {
	var _count = get_count();
	_count++;
	$.cookie("count_" + vgg.pathname, _count, {
		expires: expirationDate
	});
}

function get_count() {
	var _count = $.cookie("count_" + vgg.pathname);
	if (!_count) {
		$.cookie("count_" + vgg.pathname, 0, {
			expires: expirationDate
		});
	}
	return _count;
}

function time_check() {
	var NOWYEAR = moment().format('YYYY');
	var NOWMONTH = moment().format('MM');
	var NOWDATE = moment().format('DD');
	var NOWHOUR = moment().format('HH');
	var NOWMIN = moment().format('mm');
	var AAA = moment([NOWYEAR, NOWMONTH, NOWDATE, NOWHOUR, NOWMIN]);
	var NOW = moment();
	var BBB = moment(vgg.end_date); //遊戲截止_年,月,日,時,分
	//var FINALCOUNT = AAA.diff(BBB, 'minutes');
	var FINALCOUNT = parseInt(NOW - BBB);
	if (FINALCOUNT > 0) {
		return true;
	} else {
		return false;
	}
}

function count_check() {
	var _count = get_count();
	var remaining = vgg.total_of_day - _count;
	if (remaining > 0) {
		return remaining;
	} else {
		return 0;
	}
}


function get_random() {
	return Math.floor((Math.random() * 100) + 1);
}

/**
 * 抽出得獎結果
 * 需在顯示結果前執行
 * 
 * 檢查遊戲是否逾期，若逾期主動跳出活動結束視窗，並回傳 false
 * 檢查遊戲限玩的次數，若超出限玩次數主動跳出明日請早視窗，並回傳 false
 * 
 * 抽出獎項，及設定得獎結果內容，並回傳結果物件
 * 
 * @since 1.01.0
 * 
 * @retrun bool|object
 */
function do_lottery() {
	var num = get_random();
	var key = vgg.lottery[num];
	vector_vgg.key = key;
	var result = vgg.result = vgg.gifts[key];
	check_overdue();
	check_over_limit();
	set_content();
	if(!vgg.disable){
		return result;
	}else{
		return false;
	}
}


/**
 * 顯示結果，開啟獎項視窗
 * 
 * @since 1.01.0
 * 
 * @retrun void
 */
function show_result() {
	if(!vgg.disable){
		var result = vgg.result;
		$('.vgg-promo-title').text(result.title);
		$('.vgg-promo-code').text(result.code);
		$('.vgg-promo-link').attr('href', result.link);
		// 顯示視窗
		$('.vgg-pop-'+result.type).fadeIn(300);
		set_count();
	}
}

/**
 * 設定動態內容
 * @since 1.01.0
 */
function set_content(){
	set_sns_link();
	$(".vgg-end-link").attr('href',vgg.end_link);
	$(".vgg-msg-overdue").html('每日限玩' + vgg.total_of_day + '次<br/>下次請早喔');
}



/**
 * 設定社群連結
 * 
 * @since 1.01.0
 */
function set_sns_link(){
	var url = window.location.href;
	var share_fb = 'http://www.facebook.com/sharer.php';
	$('.vgg-share-fb').data('url', share_fb + '?u=' + url);
	var share_line = 'http://line.naver.jp/R/msg/text/';
	$('.vgg-share-line').data('url', share_line + '?' + url);
}

/**
 * 檢查是否逾期
 * 
 * @since 1.01.0
 * 
 * @retrun bool
 */
function check_overdue(){
	if(time_check()){
		$('.vgg-pop-overdue').fadeIn(300);
		vgg.disable = true;
	}
	return vgg.disable;
}

/**
 * 檢查玩的次數
 * 
 * @since 1.01.0
 * 
 * @retrun bool
 */
function check_over_limit(){
	var remaining = count_check();
	if (remaining > 0) {
		$(".vgg-msg-counter").html("還剩" + (remaining -1) + "次機會");
	} else {
		$(".vgg-msg-counter").html('每日限玩' + vgg.total_of_day + '次<br/>下次請早喔');
		$(".vgg-pop-over-limit").fadeIn(300);
		vgg.disable = true;
	}
	return vgg.disable;
}

/**
 * 複製序號按鈕處裡
 * @param e event
 */
function vgg_copy_code_handler(e) {
	e.preventDefault();
	var name = $(this).attr('name');
	var el = document.getElementById(name);
	var range = document.createRange();
	range.selectNodeContents(el);
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
	document.execCommand('copy');
	//alert("已複製序號");
	$(".copyouter").fadeIn(300).delay(800).fadeOut(300);
	window.getSelection().removeAllRanges();
	return false;
}

/**
 * 再玩一次按鈕處理
 * 
 * @since 1.01.0
 * 
 * @param e event
 * @retrun bool
 */
function vgg_retry_handler(e){
	e.preventDefault();
	location.reload();
}

/**
 * 視窗關閉按鈕處理
 * 
 * @since 1.01.0
 * 
 * @param e event
 * @retrun bool
 */
function vgg_pop_close_handler(e){
	e.preventDefault();
	$(this).closest('div[class^="vgg-pop-"]').fadeOut(300);
}

/**
 * 社群分享按鈕處裡
 * 
 * @since 2.0.5
 */
function vgg_sns_share_btn_handler(e){
	var url = $(this).data('url');
	if(url){
		window.open(url, '_blank');
	}
}
