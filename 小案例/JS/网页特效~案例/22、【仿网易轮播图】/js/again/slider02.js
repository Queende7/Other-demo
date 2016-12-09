window.onload = function(){
	// 获取元素
	function $(id){ return document.getElementById(id); }
	var js_slider = $("js_slider");
	var slider_main_block = $("slider_main_block");
	var imgs = slider_main_block.children;
	var slider_ctrl = $("slider_ctrl");

	// 操作对象
	// 1、动态生成 span
	for(var i=0;i<imgs.length;i++){
		var span = document.createElement("span");
		span.innerHTML = imgs.length - i;
		span.className = "slider-ctrl-con";
;		slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
	}
	var spans = slider_ctrl.children;
	spans[1].className = "slider-ctrl-con current";

	// 2、图片初始位置： 第1张留下 ，其他移到大盒子的右侧。
	var scrollWidth = js_slider.clientWidth;
	for(var i=1;i<imgs.length;i++){
		imgs[i].style.left = scrollWidth + "px";
	}

	// 3、控制 3个小按钮 （spans 中有8个span ，要的是 1~6）
	var iNow = 0; // 存放图片的张数
	for(var k in spans){ // k是spans数组的索引号。
		spans[k].onclick = function(){
			if(this.className == "slider-ctrl-prev"){// 点击了左侧按钮
				animate(imgs[iNow],{left: -scrollWidth});// a、先把当前图片 慢慢移到左边。
				--iNow < 0 ? iNow = imgs.length - 1 : iNow;
				imgs[iNow].style.left = -scrollWidth + "px";//b、下一张 快速变到大盒子的 左侧。
				animate(imgs[iNow],{left: 0});//c、下一张 慢慢从大盒子右侧，移动中间。
				setSquare();
			}else if(this.className == "slider-ctrl-next"){// 点击了右侧按钮
				autoPlay();
			}else{// 点击了底部按钮
				var that = this.innerHTML - 1;//获取点击的 “索引号”，通过其值获得。
				if(that > iNow){// 若点击的span 在当前span 的右侧：则图片应从 右往左 滑动。
					animate(imgs[iNow],{left: -scrollWidth});// 当前图片慢慢走到 大盒子左侧。
					imgs[that].style.left = scrollWidth + "px";// 索引号对应的图片，快速走到大盒子右侧准备滑动。
					// animate(imgs[that],{left: 0});// 索引号对应的图片，慢慢走到大盒子 中间。
				}else if(that < iNow){// 若点击的span 在当前span 的左侧：则图片应从 左往右 滑动。
					animate(imgs[iNow],{left: scrollWidth});// 当前图片慢慢走到 大盒子右侧。
					imgs[that].style.left = -scrollWidth + "px";// 索引号对应的图片，快速走到大盒子左侧准备滑动。
					// animate(imgs[that],{left: 0});// 索引号对应的图片，慢慢走到大盒子 中间。
				}
				iNow = that; // 把点击后的索引号，当做新的“起点”。
				animate(imgs[iNow],{left: 0});
				setSquare();
			}	
		}
	}

	// 获取当前点击span的样式(span有8个，要遍历 1~6)
	function setSquare(){ 
		for(var i=1;i<spans.length-1;i++){// 清除所有
			spans[i].className = "slider-ctrl-con";
		}
		// 留下自己
		spans[iNow+1].className= "slider-ctrl-con current";
	}
	
	// 设置定时器
	var timer = null;
	timer = setInterval(autoPlay,1500);// 开启定时器---和 点击右侧按钮方法相同。
	function autoPlay(){
		animate(imgs[iNow],{left: -scrollWidth});// a、先把当前图片 慢慢移到右边。
		++iNow > imgs.length - 1 ? iNow = 0 : iNow;
		imgs[iNow].style.left = scrollWidth + "px";//b、下一张 快速变到大盒子的 右侧。
		animate(imgs[iNow],{left: 0});//c、下一张 慢慢从大盒子右侧，移动中间。
		setSquare();
	}

	// 清除定时器
	js_slider.onmouseover = function(){
		clearInterval(timer);
	}
	js_slider.onmouseout = function(){
		clearInterval(timer); // 开启定时器前，都清除一次定时器，防止多次叠加定时器。
		timer = setInterval(autoPlay,1500);
	}

}