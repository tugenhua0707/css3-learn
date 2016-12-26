
import React from 'react';
import ReactDOM from 'react-dom';
import Anim from '../../../../components/cssAnimation';

const style = `
  .box {
  	background: red;
  	width: 100px;
  	height: 100px;
  }
`;

let show = true;

function toggle() {
  const t = document.getElementById('t');
  const b = document.getElementById('b');
  b.disabled = true;
  t.style.visibility = '';
  t.style.opacity = show ? 1 : 0;
  Anim.setTransition(t, 'opacity 2s ease-in');
  Anim.style(t, (show ? {
  	opacity: 0
  } : {
  	opacity: 1
  }),
  	() => {
  	  t.style.visibility = show ? '' : 'hidden';
  	  b.disabled = false;
  	  Anim.setTransition(t, '');
  	});
  show = !show;
}

ReactDOM.render(<div>
  <style dangerouslySetInnerHTML = {{ __html: style }}></style>
  <div className='box' id='t'></div>
  <button onClick={toggle} id='b'>toggle</button>
</div>, document.getElementById('style-id'));