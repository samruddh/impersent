import React, { useEffect, useState } from 'react';
import DataApi from '../utils/DataApi';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Vector1 from '../images/whatsapp.svg';
import Vector2 from '../images/mail.svg';
import Vector3 from '../images/add.svg';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import DraftsIcon from '@material-ui/icons/Drafts';
import VectorPlay from '../images/Vector_play.svg';
import PauseIcon from '@material-ui/icons/Pause';
import '../css/shareMobile.css';
import { ShowChartRounded } from '@material-ui/icons';
function ShareMobile() {
  const { recordedChunks, shareUrl, setShareUrl } = React.useContext(DataApi);
  const [playButton, setPlayButton] = useState(true);

  // useEffect(() => {
  //   // For video Play time
  //   let video = document.getElementById('vid2');

  //   var i = setInterval(function () {
  //     console.log(video.currentTime);
  //     // var unit = `  `;
  //     var minutes = parseInt(video.currentTime / 60, 10);
  //     var seconds = video.currentTime % 60;
  //     seconds = Math.trunc(seconds);
  //     document.getElementById('duration').innerHTML = `${minutes} : ${seconds}`;
  //   }, 1000);

  //   return () => {
  //     clearInterval(i);
  //   };
  // }, [recordedChunks, shareUrl]);
  const playHandler = () => {
    console.log('clicked');
    // durationHandle();
    // time();
    let video = document.getElementById('vid2');
    if (video.paused == true) {
      console.log(video);
      // Play the video
      setPlayButton(false);
      video.play();
    } else {
      // Pause the video
      console.log(video);
      setPlayButton(true);

      video.pause();
    }
  };
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

  // to open the share view
  const addMoreHandler = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Show and Tell App',
          url: shareUrl,
        })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
      // fallback
    }
  };

  return (
    <div className='sharePage'>
      <div className='top_content_photo'>
        <Link to='/impressent' className='redirect_title'>
          <p className='impressent_top_file'>impressent</p>
        </Link>
      </div>
      <div className='container justify-content-center review_container share_container'>
        <div className='row row-md-6 row-sm-2 justify-content-center shareMobCenter'>
          <div className=' col col-md-6 col-sm-2 video_part video_mob'>
            <video id='vid2' src={recordedChunks} className='video_review'></video>
            <button className='play_btn' id='playBtn' onClick={(e) => playHandler()}>
              {playButton ? (
                <img className='vector' src={VectorPlay} alt='' />
              ) : (
                <PauseIcon style={{ fontSize: 50 }} className='pause_icon' />
              )}
            </button>
            <p id='duration durationShare'></p>
          </div>
          <div className='shareContent'>
            <p className='shareVideoPara'>Share Video</p>
            <input type='text' id='myInput' className='shareInput' readOnly value={shareUrl} />
            <button className='shareShare' onClick={(e) => copyHandler()}>
              copy link
            </button>
            <p className='shareVia'>share link via</p>
            <div className='shareIcons'>
              <a href={`whatsapp://send?text=${shareUrl}`} title='Share on whatsapp'>
                <img className='vector' src={Vector1} alt='' />
              </a>

              <a href={`mailto:?&subject=Show And Tell App&body=${shareUrl}`}>
                <img className='vector' src={Vector2} alt='' />
              </a>
              <button onClick={() => addMoreHandler()} className='addMore'>
                <img className='vector' src={Vector3} alt='' />
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className='footer_record footer_share'>© Copyright 2020</footer>
    </div>
  );
}

export default ShareMobile;
