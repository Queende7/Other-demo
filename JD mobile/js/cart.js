/**
 * Created by zhousg on 2015/12/13.
 */
window.onload = function(){
    /*弹出层*/
    var win = document.getElementsByClassName('jd_win')[0];
    /*弹出层的子盒子*/
    var winCon = win.getElementsByClassName('jd_win_box')[0];
    var delBtnTop; /*全局变量*/

    /*弹出框*/
    var deleteBtn = document.getElementsByClassName('deleteBox');
    for(var i = 0 ; i < deleteBtn.length ; i ++){
        deleteBtn[i].onclick = function(){
            // document.body.style.position = 'absolute';
            win.style.display = 'block';
            win.style.top = document.body.scrollTop+"px";
            // var top = document.body.scrollTop + (window.innerHeight - winCon.offsetHeight)/2;
            /*            winCon.style.webkitTransition = 'all 0.5s ease 0s';
             winCon.style.transition = 'all 0.5s ease 0s';
             winCon.style.opacity = 1;
             winCon.style.webkitTransform = 'translateY('+top+'px)';
             winCon.style.transform = 'translateY('+top+'px)';*/

            winCon.className = "jd_win_box bounceInDown";


            /*动画*/
            delBtnTop = this.getElementsByClassName('deleteBox_top')[0];
            delBtnTop.style.webkitTransition = 'all 0.5s ease 0s';
            delBtnTop.style.transition = 'all 0.5s ease 0s';
            delBtnTop.style.webkitTransform = 'translateY(-5px) translateX(-3px) rotate(-45deg)';
            delBtnTop.style.transform = 'translateY(-5px) translateX(-3px) rotate(-45deg)';
        };
    };

    winCon.getElementsByClassName('cancel')[0].onclick = function(){
        win.style.display = 'none';
        winCon.className = "jd_win_box";
        /*动画*/
        if(deleteBtn){
            delBtnTop.style.webkitTransition = 'all 0.5s ease 0s';
            delBtnTop.style.transition = 'all 0.5s ease 0s';
            delBtnTop.style.webkitTransform = 'translateY(0px) translateX(0px) rotate(0deg)';
            delBtnTop.style.transform = 'translateY(0px) translateX(0px) rotate(0deg)';
        }
        return false;
    };
    winCon.getElementsByClassName('submit')[0].onclick = function(){
        win.style.display = 'none';
        winCon.className = "jd_win_box";
        /*动画*/
        if(deleteBtn){
            delBtnTop.style.webkitTransition = 'all 0.5s ease 0s';
            delBtnTop.style.transition = 'all 0.5s ease 0s';
            delBtnTop.style.webkitTransform = 'translateY(0px) rotate(0deg)';
            delBtnTop.style.transform = 'translateY(0px) rotate(0deg)';
        }
        return false;
    };

    /*复选框*/
    var checkBtn = document.getElementsByClassName('jd_check_box');
    for(var j = 0 ; j < checkBtn.length; j++){
        checkBtn[j].onclick = function(){
            var hasChecked = this.getAttribute('checked');
            if(hasChecked !== null){
                this.removeAttribute('checked');
            }else{
                this.setAttribute('checked',' ');
            }
        }
    }
};
