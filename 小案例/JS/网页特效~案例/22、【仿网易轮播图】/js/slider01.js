window.onload = function(){
	// 获取元素
	function $(id){ return document.getElementById(id); }
	var js_slider = $("js_slider"); // 获取最大盒子
	var slider_main_block = $("slider_main_block"); // 图片的父级
	var imgs = slider_main_block.children; // 获得所有的图片组
	var slider_ctrl = $("slider_ctrl"); // 获得 控制的 父盒子

	// 操作元素
	//动态 生成小 span
	for(var i=0;i<imgs.length;i++){
		var span = document.createElement("span");
		span.innerHTML = imgs.length-i;   // 倒序方式插入。 添加 值(再缩进隐藏)，因索引号不便处理，通过其值处理。
		span.className= "slider-ctrl-con";
		slider_ctrl.insertBefore(span,slider_ctrl.children[1]);// 在父亲的倒数第二个盒子前面插入。
	}

	var spans = slider_ctrl.children; // 得到所有span
	spans[1].className = "slider-ctrl-con current"; // 设置默认选中样式
 
 	// 图片：第1张留下，其他右移1张图片距离(右移出大盒子)。
 	var scrollWidth = js_slider.clientWidth; // 大盒子宽度
 	for(var i=1;i<imgs.length;i++){
 		imgs[i].style.left = scrollWidth+ "px";
 	}

	//  遍历三个按钮
	// spans 是 8个按钮 它们都是span
	var iNow = 0; // 存放图片 张数
	for(var k in spans){// 遍历数组，k 是索引号。
		spans[k].onclick = function(){
			// 您点击了左侧按钮
			if(this.className == "slider-ctrl-prev"){
				// 当我们点击时候，当前这张图片 先慢慢走到右边，上一张一定要快速走到左侧（-310px）位置，然后慢慢走到 中间。
				animate(imgs[iNow],{left: scrollWidth});
				--iNow < 0 ? iNow= imgs.length-1 : iNow;
				imgs[iNow].style.left= -scrollWidth + "px";
				animate(imgs[iNow],{left: 0});
				setSquare();
			}
			// 您点击了右侧按钮
			else if(this.className == "slider-ctrl-next"){
				autoplay(); // 避免密码重复，直接调用。
			}
			// 您点击了底部的span
			else{ 
				// 首先要知道我们点击的是第几张图片---获得当前索引号。（因难以获得，通过span的值获得。）
				var that = this.innerHTML - 1;
				if(that > iNow){
					// 做法相当于 右侧按钮（播放右边的图片）
					animate(imgs[iNow],{left: -scrollWidth});// 当前这张慢慢走到 左侧
					imgs[that].style.left = scrollWidth + "px";// 点击那个索引号，快速走到右侧 310
					// animate(imgs[that],{left: 0});// 点击那个索引号，快速走到中间
				}
				else if(that < iNow){
					// 做法相当于 左侧按钮（播放左边的图片）
					animate(imgs[iNow],{left: scrollWidth});
					imgs[that].style.left = -scrollWidth + "px";
					// animate(imgs[that],{left: 0});
				}
				iNow = that;// 给当前的索引号,当做下次的 起点
				/*比如：已经播放到 第4张，我点击了 第2个 span，把2给iNow，播放下一张应该是第3张。*/
				animate(imgs[iNow],{left: 0});
				setSquare();				
			}
		}
	}

	// 函数： 控制 当前 播放span。
	function setSquare(){
		for(var i=1;i<spans.length-1;i++){ // span有8个，我们要索引号1~7的span。
			spans[i].className= "slider-ctrl-con";
		}
		spans[iNow+1].className= "slider-ctrl-con current";// 记住：+1 。当前索引号加 1是 点击 的span
	}

	// 设置定时器： 做法和右侧按钮一样，自动播放右侧图片
	var timer = null;
	timer = setInterval(autoplay,2000); // 开启定时器
	function autoplay(){
		animate(imgs[iNow],{left: -scrollWidth}); // 当前图片慢慢走到 -scrollWidth位置
		// 先++ 。 ++iNow  先++，后运算。
		++iNow > imgs.length-1 ? iNow = 0 : iNow;
		imgs[iNow].style.left = scrollWidth + "px";// 下一张  立马执行 迅速走到右侧scrollWidth位置
		animate(imgs[iNow],{left: 0}); // 下一张再慢慢走到 中间
		setSquare();
	}

	// 鼠标经过时，清除定时器
	js_slider.onmouseover = function(){
		clearInterval(timer);
	}
	js_slider.onmouseout = function(){
		clearInterval(timer);// 要执行定时器，先清除定时器。
		timer = setInterval(autoplay,2000);// 开启定时器
	}

}