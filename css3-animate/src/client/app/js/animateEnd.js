// animateEnd 监听事件的次数
;(function(){
  var movebox = document.getElementById("J_movebox2"),
    btn=document.getElementById("J_movingbtn2"),
    transition = "transition",
    body = document.body || document.documentElement,
    style  =body.style;
  var vendorPrefix=(function(){
      var i=0, vendor=["Moz", "Webkit", "Khtml", "O", "ms"];
      transition=transition.charAt(0).toUpperCase() + transition.substr(1);   
      while (i < vendor.length) {
        if (typeof style[vendor[i] + transition] === "string") {
          return vendor[i];
        }
        i++;
      }
      return false;
  })();
  var animationEnd=(function(){
    if(vendorPrefix=="Webkit"){
      return "webkitAnimationEnd";
    }else{
      return "animationend";
    }
  }());
  movebox && movebox.addEventListener(animationEnd,function(){
    alert("执行了"+animationEnd+"事件！");
    movebox.style[vendorPrefix+"AnimationName"]="";
  },false)
  btn.onclick=function(){
    movebox.style[vendorPrefix+"AnimationName"]="mymove";
  }
})()