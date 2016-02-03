var $minutes = $('#minutes'); //时间:分
var $second = $('#second'); //时间:秒
var $product = $('#product'); //gif动画：product.gif
var $gameArea = $('#gameArea');
var perNameArr = ["杠杠","佟梦实","邵明明","袁雨萱","CC","邢飞","左溢","赵顺然","史文祥","葛洧吟","程星源","高旻睿","万国鹏","张予曦"];

var $head = $('#head');
var isL = true; //是否头部向左
var score = 0; //点击分数
var timeBol = true; //计时是否开始
$('#gameArea').on('touchstart', function(){
    if (event.touches.length == 1) {
        headShakeFn($head);
    }
});

// 音乐播放/停止
var musicBol = true;
$('#music').on('touchstart', function(){
	if(musicBol){
		$(this).css({
			'background':'url(img/game/music_02.png) 0 0 no-repeat',
			'background-size': '100% 100%'
		});
		$(this).find('audio')[0].pause();
	}else{
		$(this).css({
			'background':'url(img/game/music_01.png) 0 0 no-repeat',
			'background-size': '100% 100%'
		});
		$(this).find('audio')[0].play();
	}
	musicBol = !musicBol;

    event.preventDefault();
});

// 根据choice.html页面选择的人物sessionStorage来更换图片
function changePersonFn(swiperIndex){
    $gameArea.find('img:nth-of-type(1)').attr("src","img/game/peo"+swiperIndex+"_head.png");
    $gameArea.find('img:nth-of-type(2)').attr("src","img/game/peo"+swiperIndex+"_body.png");
}


$biao3 = $('#biao3');
$biao1 = $('#biao1');
$biao2 = $('#biao2');
// 根据时间替换图片
function changePicFn(t) {
	//游戏结束
	if(t <= 0){
		$('#index_logo').hide();
		$('#gameArea').hide();
		$('#time').hide();

		gameoverFn();
		$('#gameOver').show();
        //对应人名显示泡泡提示信息
        $('#gameOver #gameBubble span').html(perNameArr[swiperIndex]+"的水润星值为");

	}

    //5秒更换图片
    if (t < 6) {
        $biao1.attr('src', 'img/game/tip3_3.png').css({
            'width': '22%',
            'top': '8%',
            'right': '0',
            'left': '',
            'margin': ''
        });

        $biao2.attr('src', 'img/game/tip3_1.png').css({
            'width': '95%'
        });
        $biao3.attr('src', 'img/game/tip3_2.png').css({
            'width': '34%',
            'right': '72%',
            'top': '52%'
        });
        return false;
    }

    //10秒更换图片
    if (t < 10) {
        $biao1.attr('src', 'img/game/tip2_3.png').css({
            'width': '60%',
            'top': '50%',
            'right': '0',
            'left': '0',
            'margin': '0 auto'
        });

        $biao2.attr('src', 'img/game/tip2_1.png');
        $biao3.attr('src', 'img/game/tip2_2.png').css({
            'width': '40%',
            'right': '68%',
            'top': '63%'
        });
        return false;
    }

    //15秒更换图片
    if (t < 15) {
        $biao1.attr('src', 'img/game/tip1_3.png').css({
            'width': '22%',
            'top': '0'
        });
        $biao2.attr('src', 'img/game/tip1_1.png').css({
            'width': '83%',
            'left': '-27%',
            'top': '0%'
        });
        $biao3.attr('src', 'img/game/tip1_2.png').css({
            'width': '25%',
            'right': '78%',
            'top': '55%'
        });
    }
}
// 阻止图片默认点击方法事件
$biao1.on('touchstart',function(){
    event.preventDefault();
});
$biao2.on('touchstart',function(){
    event.preventDefault();
});
$biao3.on('touchstart',function(){
    event.preventDefault();
});

// "补完水，抽豪礼"按钮点击
$('#gameBtn').on('touchstart', function(){
    $('#gameOver').hide();
    $('#award').show();
});

// "发奖细则"
$('#awardBottom div:nth-of-type(3)').on('touchstart', function(){
    $("#award").hide();
    $("#awardRule").show();
});
// "发奖细则"取消按钮
$('#awardRule p').on('touchstart', function(){
    $(this).parent().hide();
    $("#award").show();
});
// "提交"按钮
$('#awardBottom div:nth-of-type(2)').on('touchstart', function(){
    var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
    if(!reg.test($('#awardBottom div input').val())){
        alert("输入手机号码有误！");
    }else{
        alert('提交成功！');
    }
})


//头部摇晃
function headShakeFn($ele) {
    $('#hand').remove();
    $product.css("-webkit-animation", 'none').attr('src', 'img/game/product.gif');
    if (isL)
        $ele.attr('class', 'headAntL');
    else
        $ele.attr('class', 'headAntR');
    isL = !isL;
    score++;
    // console.log(score);
    if (timeBol) {
        gameTime();
        timeBol = false;
    }
}

//游戏时间
function gameTime() {
    var t = 20;//游戏时间设置
    var timer = setInterval(function() {
        t -= 0.02;
        if (t <= 0) {
            t = 0;
            $minutes.html("0");
            $second.html("00");
            clearInterval(timer);
        } else {
            $minutes.html(parseInt(t));
            $second.html(t.toFixed(2).toString().split('.')[1]); //保留两位数并截取小数点后两位
        }

        changePicFn(t);
    }, 20);
}


// 游戏结束:1.添加分数，2.替换图片
function gameoverFn(){
	$gameScore = $('#gameScore');
	var scoreArr = score.toString().split('');
	$gameScore.html("");
	for(var i = 0; i < scoreArr.length; i++){
		$gameScore.append("<img src='img/game/"+scoreArr[i]+".png'>");
	}

	var mark = 1;
	if(score > 20){
		mark = 3;
	}else if(score > 10){
		mark = 2;
	}else{
		return false;
	}
	$('#gameTxt img:nth-of-type(1)').attr("src","img/game/rt_"+mark+"1.png");
	$('#gameTxt img:nth-of-type(2)').attr("src","img/game/rt_"+mark+"2.png");
	$('#gameDoll img').attr("src","img/game/r_"+mark+".png").css("width","26%");

}