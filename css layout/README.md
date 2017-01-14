## 左侧固定宽度，右侧自适应 
### 子元素1使用float，子元素2使用margin-left
    <div class='container'>
      <div class='box-left'>左侧固定宽度</div>
      <div class='box-right'>右侧自适应</div>
    </div>
    * {margin: 0; padding: 0;}
    .container {
      width: 100%;
      margin-top: 10px;
      overflow: hidden;
    }
    .box-left {
      float: left;
      width: 100px;
      height: 200px;
      background: red;
      margin: 0 15px;
    }
    .box-right {
      height: 200px;
      margin-left: 100px;
      background: blue;
    }

### 子元素1使用absolute(绝对定位)，子元素2使用margin-left，如下：
    <div class='container'>
      <div class='box-left'>左侧固定宽度</div>
      <div class='box-right'>右侧自适应</div>
    </div>
    * {margin: 0; padding: 0;}
    .container {
      position: relative;
      width: 100%;
      margin-top: 10px;
      overflow: hidden;
    }
    .box-left {
      position: absolute;
      top: 0;
      left: 15px;
      width: 100px;
      height: 200px;
      background: red;
    }
    .box-right {
      height: 200px;
      margin-left: 100px;
      background: blue;
    }

