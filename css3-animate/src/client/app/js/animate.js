import React from 'react';
import ReactDOM from 'react-dom';
import Anim from '../../../../components/cssAnimation';

const style = `
  .box {
  	background: red;
  	width: 100px;
  	height: 100px;
  }
  .fade-enter {
  	opacity: 0;
  	animation-duration: 0.3s;
  	animation-fill-mode: both;
  	animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  	animation-play-state: paused;
  }
  .fade-leave {
  	animation-duration: 0.3s;
  	animation-fill-mode: both;
  	animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  	animation-play-state: paused;
  }
  .fade-enter.fade-enter-active {
  	animation-name: rcDialogFadeIn;
  	animation-play-state: running;
  }
  .fade-leave.fade-leave-active {
  	animation-name: rcDialogFadeOut;
  	animation-play-state: running;
  }

  @keyframes rcDialogFadeIn {
  	0% {
  	  opacity: 0;
  	}
  	100% {
  	  opacity: 1;
  	}
  }
  @keyframes rcDialogFadeOut {
  	0% {
  	  opacity: 1;
  	}
  	100% {
  	  opacity: 0;
  	}
  }
`;

let show2 = true;

function toggle2() {
  const t = document.getElementById('t2');
  const b = document.getElementById('b2');
  b.disabled = true;
  t.style.visibility = '';
  Anim(t, `fade-${show2 ? 'leave' : 'enter'}`, () => {
  	console.log('被隐藏了');
  });
  show2 = !show2;
}

ReactDOM.render(<div>
  <style dangerouslySetInnerHTML = {{ __html: style }}></style>
  <div className='box' id='t2'></div>
  <button onClick={toggle2} id='b2'>点击隐藏</button>
</div>, document.getElementById('animate-id'));
