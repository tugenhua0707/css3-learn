;(function(){
  var movebox = document.getElementById("J_movebox"),
    btn = document.getElementById("J_movingbtn"),
    i=0,
    transition="transition",
    body = document.body || document.documentElement,
    style=body.style;
  var transitionEnd=(function(){
    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }
    for(var name in transEndEventNames){
      if(typeof style[name] === "string"){
        return transEndEventNames[name]
      }
    }
  })();
  // console.log(body.style)
  var vendorPrefix = (function(){
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
  // transitionend事件在多个css属性改变的情况下执行一次
  /*
  var handleTransitionEndEvent = function(elem, fn, duration) {
    var called = false;
    //在每次transitionEnd的事件后执行该函数
    var callback = function(){
      if(!called) {
        fn();
        called = true;
      }
    };
    elem.addEventListener(transitionEnd, function() {
      callback();
      //通过setTimeout来补救windowphone中不触发事件的问题
      setTimeout(callback,duration);
    })
  };
  */
  function transitionEndFn(){
    i++;
    alert("执行了"+transitionEnd+"事件"+i+"次");
  };
  // movebox && handleTransitionEndEvent(movebox, transitionEndFn, "1s");

  movebox && movebox.addEventListener(transitionEnd,function(){
    i++;
    alert("第"+i+"次执行"+transitionEnd+"事件！")
  },false)
  btn.onclick=function(){
    i=0;
    movebox.style.width="150px";
    movebox.style.height="150px";
    movebox.style.backgroundColor="#000";
    movebox.style[vendorPrefix+"Transform"]="translate(100px,100px) rotate(45deg)";
    movebox.style[vendorPrefix+"TransitionProperty"]="width,height,background-color,transform";
  }
})()