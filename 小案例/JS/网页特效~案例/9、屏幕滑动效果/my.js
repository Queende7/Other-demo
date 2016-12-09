function $(id){ return document.getElementById(id); }
function show(obj){ obj.style.display= "block"; }
function hide(obj){ obj.style.display= "none"; }


// 封装自己的 scrollTop left
function scroll(){
	if(window.pageYOffset != null){  // 支持 ie9 + 最新浏览器。
		return {
			left: window.pageXOffset,    
			top: window.pageYOffset
		}
	}else if(document.compatMode == "CSS1Compat"){ // 支持火狐等浏览器，生命了 <DOCTYPE html>
		return {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop
		}
	}else{  // 兼容没有声明 DTD的文件
		return {
			left: document.body.scrollLeft,
			top: document.body.scrollTop
		}
	}
}