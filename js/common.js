
// 首页loading的加载
$load = $('#load');
$span = $load.find('span');//加载进度数
$p = $load.find('p');//蒙版背景

var loadArr = ['loading.jpg','load_font.png'];

//加载一开始的两张图片
function loadFirstFn(fn){
	var loadI = 0;
	for(var i = 0; i < loadArr.length; i++){
		var img = new Image();
		img.src = "img/"+loadArr[i];
		img.onload = function(){
			loadI++;
			if(loadI == loadArr.length){
				loadFn(imgArr,fn);
			}
		};
	}
}


// 加载其他如片
function loadFn(arr, Fn){
	var index = 0;
	for(var i = 0; i < arr.length; i++){
		var img = new Image();
		img.src = "img/"+arr[i];
		console.log('src:'+img.src);
		img.onload = function(){
			++index;
			var pre = parseInt(index/arr.length*100);
			$span.html(pre+"%");
			console.log("pre:"+pre+",index:"+index+",arr.length:"+arr.length);
			$p.css("backgroundPosition","0 "+(-150-pre*190/100)+"px");
			if(index == arr.length){
				Fn&&Fn();
			}
		};
	}
}