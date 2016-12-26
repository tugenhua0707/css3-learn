import Anim from '../../../../components/cssAnimation';
import React from 'react';
import ReactDOM from 'react-dom';

const style = `

.box {
  background:red;
  width:100px;
  height:100px;
}
.collapse-active {
  transition: height .3s ease-out;
}

`;

let show3 = true;

function toggle3() {
  const t = document.getElementById('t3');
  const b = document.getElementById('b3');
  b.disabled = true;
  t.style.display = '';
  let height;
  Anim(t, `collapse`, {
    start() {
      if (show3) {
        t.style.height = `${t.offsetHeight}px`;
      } else {
        height = t.offsetHeight;
        t.style.height = 0;
      }
    },
    active() {
      t.style.height = `${show3 ? height : 0}px`;
    },
    end() {
      t.style.display = show3 ? '' : 'none';
      b.disabled = false;
      t.style.height = '';
    },
  });
  show3 = !show3;
}

ReactDOM.render(<div>
  <style dangerouslySetInnerHTML={{ __html: style }}></style>
  <div className="box" id="t3">
  </div>
  <button onClick={toggle3} id="b3">收缩和展开</button>
</div>, document.getElementById('collapse'));
