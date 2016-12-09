function $(id){ return document.getElementById(id); }

// 封装自己的scrollTop 、left。函数
function scroll(){
	if(window.pageYOffset != null){
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	}else if(document.compatMode == "CSS1Compat"){
		return {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop
		}
	}else{
		return {
			left: document.body.scrollLeft,
			top: document.body.scrollTop
		}
	}
}