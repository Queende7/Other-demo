function animate(obj,json,fn){ // 给谁  json  回调函数
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		// 开始遍历 json
		var flag = true; // 用来判断是否停止定时器。 一定要写在遍历外面。
		for(var attr in json){ // attr 属性 。 json[attr] 属性值。
			// 动画原理 ： 本身样式 + 步长 。
			// 获取当前样式  的值：
			var current =0;
			if(attr == "opacity"){ // 若原来样式中 存在opacity
				current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
			}else{
				current = parseInt(getStyle(obj,attr)); //数值		
			}

			// 获取步长：(目标位置（属性值） - 本身现在位置)/10
			var step = (json[attr] - current) / 10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			// 判断透明度
			if(attr == "opacity"){//判断用户是否输入opacity。
				if("opacity" in obj.style){// 判断用户是否支持opacity。
					obj.style.opacity= (current + step) /100;
				}else{// ie678 不支持。兼容： obj.style.filter= alpha(opacity = 30);
					obj.style.filter = "alpha(opacity ="+(current+step)+")";
				}
			}else if(attr == "zIndex"){
				obj.style.zIndex = json[attr];
			}
			else{ // 其他样式
				obj.style[attr]= current + step +"px";					
			}

			// 判断：只有有一个不满足条件，就不应该停止定时器。一定要写在遍历 里面。
			if(current != json[attr]){
				flag = false;
			}
		}

		if(flag){ // 用于判断定时器的条件是否满足，所有都到达目标位置，即可清除定时器。
			clearInterval(obj.timer);
			// alert("ok");
			if(fn){// 当定时器停止了，动画结束了，如果有回调函数，即应该执行回调函数。
				fn(); 
			}
		}
	},5);
}

// 获得当前样式的函数：
function getStyle(obj,attr){  // 获得的样式  
	if(obj.currentStyle){ // ie 和 opera
		return obj.currentStyle[attr];
	}else{
		return window.getComputedStyle(obj,null)[attr]; // w3c 标准浏览器
	}
}
