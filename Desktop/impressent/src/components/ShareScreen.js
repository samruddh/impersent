import React, { useEffect } from 'react';
import '../css/shareScreen.css';
import DataApi from '../utils/DataApi';
import Vector1 from '../images/whatsapp.svg';
import Vector2 from '../images/mail.svg';

function ShareScreen(props) {
  const { togglePop, shareUrl } = props;
  const { setShareUrl } = React.useContext(DataApi);
  useEffect(() => {
    return () => {};
  }, [shareUrl]);

  const copyHandler = () => {
    /* Get the text field */
    var copyText = document.getElementById('myInput');

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand('copy');

    /* Alert the copied text */
    alert('Copied the text: ' + copyText.value);
  };
  return (
    <div className='popup'>
      {/* for closing the popup */}
      <span className='close' onClick={() => togglePop()}>
        &times;
      </span>
      <div className='shareContent shareWebView'>
        <p className='shareVideoPara colorTag'>Share Video</p>
        <input
          type='text'
          id='myInput'
          className='shareInput  colorTag'
          readOnly
          value={shareUrl}
        />
        {/* <div class='tooltip'> */}
        <button className='shareShare' onClick={(e) => copyHandler()}>
          {/* <span className='tooltiptext' id='myTooltip'>
              Copy to clipboard
            </span> */}
          copy link
        </button>
        {/* </div> */}
        <p className='shareVia colorTag'>share link via</p>
        {/* For sharing the link through different form */}
        <div className='shareIcons'>
          {/* <a href='https://web.whatsapp.com/'>
            <img className='vector' src={Vector1} alt='' />
          </a> */}
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Show And Tell App &body=${shareUrl}`}
          >
            <img className='vector' src={Vector2} alt='' />
          </a>
          {/* <img className='vector' src={Vector3} alt='' /> */}
        </div>
      </div>
    </div>
  );
}

export default ShareScreen;
