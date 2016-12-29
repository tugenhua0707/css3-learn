## flex-grow 理解
<p>
  flex布局发生在父容器与子容器之间。父容器需要有flex的环境(display:flex)；子容器才能根据自身的属性来布局。用我们同事说的一句话是，
  你对某件事感兴趣，那么你一定需要和它发生关系，否则的话你们就没有关系。因此flex也是一样的，他们两的关系就是父容器与子容器之间布局的关系。
</p>
比如如下代码：
<p>
    <main>
      <div class="col">
        <h2>CSS, Or:</h2>
      </div>
      <div class="col2">
        <h2>How I Learned to Stop Worrying and Love the Flexbox.</h2>
      </div>
    </main>
</p>
<p>
  main 是父容器，给它定义固定宽度是800px，display: flex; 代码如下：
</p>
    main {
      display: flex;
      width: 800px;
    }
    .col {
      flex-grow: 2;
      background: red;
    }
    .col2 {
      flex-grow: 1;
      background: blue;
    }
<p>
  我们在浏览器可以看到，col容器的宽度是149.25， 而col2容器的宽度是650.75；他们两的宽度加起来正好是800px；那么他们是如何计算的呢？
  为什么会是这样的呢？如果不是看浏览器这样的话，我们可能会想当然的是 col容器被分成2分，也就是宽度是 800px的2/3, col2容器宽度是800px的1/3；
  其实这样的上面的理解有误，但是理解之前也说一个剩余空间，什么叫剩余空间呢？剩余空间 = 容器的宽度 - 子元素本身的宽度 就是剩余空间；
  接着使用剩余空间 再去取比例的宽度；因此子元素的宽度 = 子元素本身宽度 + 剩余空间宽度 * flex-grow/(flex-grow-all) 
  我们可以先把上面的子元素 col 和 col2的 flex-grow 代码先注释掉；使用js来获取元素的本身宽度如下：
</p>
    console.log(document.getElementsByClassName('col')[0].offsetWidth); 
<h3>上面打印出来宽度是 91</h3>
    console.log(document.getElementsByClassName('col2')[0].offsetWidth);
<h3>col2的宽度打印出来是621</h3>
<h3>
 因此 剩余空间 = 800 - 91 - 621 = 88px
</h3>
<p>
  由于col的 flex-grow 占了2等分，因此剩余空间 = 88 * 2/3 = 58.66666, 因此总宽度等于 = 91 + 58.6666 = 149.666 多一点，和浏览器显示
  的149.25 差不多这个样子；
</p>
<p>
  col2的 flex-grow 占了1等分， 因此剩余空间 = 88 * 1/3 = 29.3333 多一点，因此总宽度等于 = 621 + 29.3333 = 650.333多一点，
  和浏览器的宽度 650.75 很接近的。
</p>
<p>我们下面再来看一份代码数据</p>
    <ul class="flex">
      <li>a</li>
      <li>b</li>
      <li>c</li>
    </ul>
<p>css代码如下：</p>
    .flex{display:flex;width:600px;list-style:none;}
    .flex li:nth-child(1){width:200px; background: #555;}
    .flex li:nth-child(2){flex-grow:1;width:50px; background: green;}
    .flex li:nth-child(3){flex-grow:3;width:50px; background: #333;}
<p>
  在浏览器的表现为 第一个li子元素的宽度为 200px， 第二个li的子元素的宽度为125px，第三个li的子元素的宽度为275px；浏览器的表现我们也可以
  不难理解，因为第一个li设置了宽度，因此为固定200px；而flex-grow 没有设置，默认情况下为0，代表没有，而第二个li和第三个li分别宽度为
  50px，因此 剩余空间 = 600 - 200 - 50 - 50 = 300； 因此 flex-grow属性进行划分剩余空间 
  因此第一个li的剩余空间的宽度 = 300 * 1/4 = 75, 第二个li的剩余空间等于 = 300 * 3/4 = 225; 因此第二个子元素li的总宽度为
  50 + 75 = 125， 第三个子元素li的总宽度为 = 50 + 225 = 275； 
</p>
<p>
  总结：当父容器设置 display: flex的时候，子元素也设置了 flex-grow的时候就会对剩余空间进行划分，当子元素设置了宽度的话，那么剩余空间
  等于 = 父容器的宽度 - 子元素的所有宽度  然后使用剩余空间的等比例来划分对应的宽度，最后加上各自的宽度就是对应的子元素的宽度了，当然
  如果子元素 没有设置 flex-grow的时候，那么默认剩余空间为0了；
</p>
#### 浏览器支持程度如下：
<img src='https://github.com/tugenhua0707/css3-learn/tree/master/flex/flex-grow.png' />

## 理解 flex-shrink
<h3>含义是：设置或检索弹性盒的收缩比率, 更准确的说 根据弹性盒子元素所设置的收缩因子作为比率来收缩空间。</h3>
<p>上面的文字含义我也没有理解清楚，下面通过一个demo来理解一下，代码如下：</p>
    <ul class="flex">
      <li>a</li>
      <li>b</li>
      <li>c</li>
    </ul>
<p>css代码如下：</p>
    .flex{display:flex;width:400px;margin:0;padding:0;list-style:none;}
    .flex li{width:200px;}
    .flex li:nth-child(3){flex-shrink:3;}
<p>
  flex-shrink的默认值为1，如果没有定义该属性的话，将会自动按照默认值为1在所有因子相加之后来计算比率进行空间收缩。
  上面的代码，父容器设置宽度为400px；display: flex; 子元素li都设置为200px；那么li的总宽度为 200 * 3 = 600px; 
  而容器的宽度只有400px，因此宽度超过了200px；因此这200px需要被三个子元素承担点，才能使总宽度等于400px；
  第一个和第二个都么有设置 flex-shrink，因此默认都为1，而第三个子元素显示的设置 flex-shrink为3， 因此就可以理解被分成5等分。
  每一份的宽度为 200px / 5 = 40px; 因此 第一个和第二个子元素 分别收缩40px，第三个子元素需要收缩120px = 40px * 3;
  因此第一个li的宽度和第二个li的宽度都等于 = 200px - 40px = 160px; 而第三个li子元素的宽度为 200px - 120px = 80px;
  因此 第一个li的宽度为 160px，第二个宽度为 160px；第三个子元素li的宽度为 80px； 
</p>
<p>浏览器支持程度如下：</p>
<img src='https://github.com/tugenhua0707/css3-learn/tree/master/flex/flex-shrink.png' />

## 理解 flex-basis
<p>这个属性的作用是width的替代品，如果子容器设置了 flex-basis或者width的话，那么在分配空间之前，他们会先跟容器预约这么多空间，
然后剩下的才是剩余空间，然后父容器再把剩余空间分配给设置了 flex-grow的容器，如果同时设置了 flex-basis和width的话，那么width的
属性会被覆盖，也就是说 flex-basis的优先级高于 width的优先级，那么还有一点需要注意的是：如果flex-basis和width其中有一个是auto，
那么另外一个非auto的属性优先级会更高。</p>
    <ul class="flex">
      <li class='col'>a</li>
      <li class='col2'>b</li>
      <li class='col3'>c</li>
    </ul>
    .flex {display: flex; width: 600px; list-style: none;}
    .flex li { flex-basis: 300px; width:200px;}
    .flex li:nth-child(1) {background: red;}
    .flex li:nth-child(2) {background: blue;}
    .flex li:nth-child(3) {flex-shrink: 3; background: #ccc}
#### 浏览器支持程度如下：
<img src='https://github.com/tugenhua0707/css3-learn/tree/master/flex/flex-basis.png' />
