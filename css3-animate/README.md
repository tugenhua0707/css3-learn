## transitionend animationend 事件兼容问题
#### transitionend animationend 都是css3中动画，并且从字面上意思我们不难理解都是监听动画结束后的事件。
### 1. transitionend 事件执行次数。
它有一个属性 transition-property <br/>可以过渡多个属性值，比如宽度和高度，及旋转操作等，但是transitionend的触发条件是当某个属性值发生改变的时候就会触发，因此如果有多个属性的话，就会触发多次回调<br/>
事件，比如如下的宽度和高度，及旋转操作，它就会触发多次回调监听事件；<br/>
    <div class="movebox" id="J_movebox"></div>
    <div class="">
      <a href="javascript:void(0)" id="J_movingbtn">&nbsp;&nbsp;运动&nbsp;&nbsp; </a> 
    </div>
<pre>
  .movebox{
    width:50px;
    height:50px;
    position: relative;
    background:#f60;
    -webkit-transition-duration: 1s;
    -o-transition-duration: 1s;
    transition-duration: 1s;
    -webkit-transition-timing-function: linear;
    -o-transition-timing-function: linear;
    transition-timing-function: linear;
  }
</pre>
<pre>
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
  movebox.addEventListener(transitionEnd,function(){
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
</pre>
#### 上面是执行完成后通过transitionEnd监听的动画，可以看到执行了四次就弹出4次回调框，transitionend触发了四次，因为width,height,background-color,transform四个属性都被改变了！而在实际的运用中，我们往往只需要所有的动画结束后执行一次transitionend的事件来达做我们想要做的事情，这个时候就需要我们做一些处理，让transitionend事件在多个css属性改变的情况下执行一次
但是我们可以通过一个函数封装一下；只执行一次回调。
<pre>
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
  function transitionEndFn(){
    i++;
    alert("执行了"+transitionEnd+"事件"+i+"次");
  };
  handleTransitionEndEvent(movebox, transitionEndFn, "1s");
  /*
  movebox.addEventListener(transitionEnd,function(){
    i++;
    alert("第"+i+"次执行"+transitionEnd+"事件！")
  },false)
  */
  btn.onclick=function(){
    i=0;
    movebox.style.width="150px";
    movebox.style.height="150px";
    movebox.style.backgroundColor="#000";
    movebox.style[vendorPrefix+"Transform"]="translate(100px,100px) rotate(45deg)";
    movebox.style[vendorPrefix+"TransitionProperty"]="width,height,background-color,transform";
  }
</pre>
#### 如上代码就ok；

### 2. animationend事件执行次数
#### 不同于transitionend事件,animationend只会在动画完成后执行一次：
#### animationend的事件只有两种形式：animationend和WebkitAnimationEnd
    <div class="movebox2" id="J_movebox2"></div>
    <div class="">
      <a href="javascript:void(0)" id="J_movingbtn2">&nbsp;&nbsp;运动&nbsp;&nbsp; </a> 
    </div>
<pre>
  .movebox2 {
    width:100px;
    height:100px;
    border:1px solid #5d5d5d;
    background: #f60;
    overflow:hidden;
    margin:10px;
    -webkit-animation-duration:1s ;
    -o-animation-duration:1s ;
    animation-duration:1s ;
  }
  @keyframes mymove{
    0%{
      -webkit-transform: translate(0px,0px);
      -moz-transform: translate(0px,0px);
      -ms-transform: translate(0px,0px);
      transform: translate(0px,0px);
    }
    100%{
      -webkit-transform: translate(100px,100px);
      -moz-transform: translate(100px,100px);
      -ms-transform: translate(100px,100px);
      transform: translate(100px,100px);
    }
  }
  @-webkit-keyframes mymove{
    0%{
      -webkit-transform: translate(0px,0px);
      -moz-transform: translate(0px,0px);
      -ms-transform: translate(0px,0px);
      transform: translate(0px,0px);
    }
    100%{
      -webkit-transform: translate(100px,100px);
      -moz-transform: translate(100px,100px);
      -ms-transform: translate(100px,100px);
      transform: translate(100px,100px);
    }
  }
</pre>
<pre>
  // animateEnd 监听事件的次数
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
  movebox.addEventListener(animationEnd,function(){
    alert("执行了"+animationEnd+"事件！");
    movebox.style[vendorPrefix+"AnimationName"]="";
  },false)
  btn.onclick=function(){
    movebox.style[vendorPrefix+"AnimationName"]="mymove";
  }
</pre>

