// import React from 'react';
// import DataApi from '../utils/DataApi';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Vector1 from '../images/Vector1_rec.svg';
// import Vector2 from '../images/Vector2_rec.svg';
// import Vector3 from '../images/Vector3.svg';
// import Vector4 from '../images/Vector4.svg';
// import Vector5 from '../images/Vector5.svg';
// import '../css/recordVideoMobile.css';
// function RecordVideoMobile() {
//   React.useEffect(() => {
//     const controls = document.querySelector('.controls');
//     const cameraOptions = document.querySelector('.video-options>select');
//     const video = document.querySelector('video');
//     const canvas = document.querySelector('canvas');
//     const screenshotImage = document.querySelector('img');
//     const buttons = [...controls.querySelectorAll('button')];
//     let streamStarted = false;

//     const [play, pause, screenshot] = buttons;

//     const constraints = {
//       video: {
//         width: {
//           min: 1280,
//           ideal: 1920,
//           max: 2560,
//         },
//         height: {
//           min: 720,
//           ideal: 1080,
//           max: 1440,
//         },
//       },
//     };

//     cameraOptions.onchange = () => {
//       const updatedConstraints = {
//         ...constraints,
//         deviceId: {
//           exact: cameraOptions.value,
//         },
//       };

//       startStream(updatedConstraints);
//     };

//     play.onclick = () => {
//       if (streamStarted) {
//         video.play();
//         play.classList.add('d-none');
//         pause.classList.remove('d-none');
//         return;
//       }
//       if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
//         const updatedConstraints = {
//           ...constraints,
//           deviceId: {
//             exact: cameraOptions.value,
//           },
//         };
//         startStream(updatedConstraints);
//       }
//     };

//     const pauseStream = () => {
//       video.pause();
//       play.classList.remove('d-none');
//       pause.classList.add('d-none');
//     };

//     const doScreenshot = () => {
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       canvas.getContext('2d').drawImage(video, 0, 0);
//       screenshotImage.src = canvas.toDataURL('image/webp');
//       screenshotImage.classList.remove('d-none');
//     };

//     pause.onclick = pauseStream;
//     screenshot.onclick = doScreenshot;

//     const startStream = async (constraints) => {
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       handleStream(stream);
//     };

//     const handleStream = (stream) => {
//       video.srcObject = stream;
//       play.classList.add('d-none');
//       pause.classList.remove('d-none');
//       screenshot.classList.remove('d-none');
//     };

//     const getCameraSelection = async () => {
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       const videoDevices = devices.filter((device) => device.kind === 'videoinput');
//       const options = videoDevices.map((videoDevice) => {
//         return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
//       });
//       cameraOptions.innerHTML = options.join('');
//     };
//     getCameraSelection();
//     return () => {};
//   }, []);
//   return (
//     <div className='mob_record'>
//       <div className='top_content_photo'>
//         <p className='impressent_top_photo'>impressent</p>
//       </div>
//       <div className='container'>
//         <div className='video_center'>
//           <p className='record_video'>Record Video</p>
//           <div className='vectors'>
//             <img className='vector' src={Vector1} alt='' />
//             <img className='vector' src={Vector4} alt='' />
//             <img className='vector' src={Vector2} alt='' />
//             <img className='vector' src={Vector5} alt='' />
//             <img className='vector' src={Vector3} alt='' />
//           </div>
//         </div>
//       </div>

//       <div className='display-cover'>
//         <video autoplay></video>
//         <canvas className='d-none'></canvas>

//         <div className='video-options'>
//           <select name='' id='' class='custom-select'>
//             <option value=''>Select camera</option>
//           </select>
//         </div>

//         <img className='screenshot-image d-none' alt='' />

//         <div className='controls'>
//           <button className='btn btn-danger play' title='Play'>
//             <i data-feather='play-circle'> play</i>
//           </button>
//           <button className='btn btn-info pause d-none' title='Pause'>
//             <i data-feather='pause'> pause</i>
//           </button>
//           <button className='btn btn-outline-success screenshot d-none' title='ScreenShot'>
//             <i data-feather='image'>scrren shot</i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RecordVideoMobile;

import React, { Component, Fragment as div, useEffect } from 'react';
import { Camera } from 'react-cam';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import DataApi from '../utils/DataApi';
import '../css/mobileCameraCapture.css';
class RecordVideoMobile extends Component {
  static contextType = DataApi;
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }
  componentDidMount() {
    console.log('mounted');
    console.log('listen');
    // this.props.setCapture(false);
    let form = document.getElementById('myform');
    console.log('form', form);
    let input = document.getElementById('capture');
    input.click();
    console.log('input', input);
    input.addEventListener('change', (ev) => {
      console.dir(input.files[0]);
      if (input.files[0].type.indexOf('image/') > -1) {
        let img = document.getElementById('img');
        img.src = window.URL.createObjectURL(input.files[0]);
        console.log(form);
        console.log(input.files[0]);
        // this.setState((prevState, props) => ({counter: prevState.counter = props.step})
        this.setState((prevState) => ({ images: prevState.images.concat(img.src) }));
        this.context.setImages((prevState) => prevState.concat(this.state.images));
        // const element1 = document.getElementById('link');
        // element1.click();
        if (this.props.capture) {
          this.props.setCapture(false);
        }
        console.log('array', this.state.images);
      } else if (input.files[0].type.indexOf('audio/') > -1) {
        let audio = document.getElementById('audio');
        audio.src = window.URL.createObjectURL(input.files[0]);
      } else if (input.files[0].type.indexOf('video/') > -1) {
        let video = document.getElementById('video');
        video.src = window.URL.createObjectURL(input.files[0]);
      }
    });
  }

  render() {
    return (
      <div className='mob_camera'>
        <form action='#' id='myform' encType='multipart/form-data'>
          <label htmlFor='capture' className='d-none'>
            Capture
          </label>

          {/* <input type='file' id='capture' accept='image/*' capture multiple /> */}
          <input type='file' id='capture' accept='video/*,audio/*' capture multiple />

          <br />
          <input type='submit' value='Process' />
        </form>
        <p className='d-none'>
          <img src='' id='img' alt='from phone' />
        </p>
        <p>
          <audio src='' id='audio' controls></audio>
        </p>
        <p>
          <video src='' id='video' controls></video>
        </p>
        {/* <Link to='/capturedView' id='link'></Link> */}
      </div>
    );
  }
}
export default RecordVideoMobile;
