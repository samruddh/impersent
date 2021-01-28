import React, { useEffect, useState } from 'react';
import DataApi from '../utils/DataApi';
import { Link } from 'react-router-dom';
import Vector1 from '../images/Vector1_rec.svg';
import Vector2 from '../images/Vector2_rec.svg';
import Vector3 from '../images/Vector3.svg';
import Vector4 from '../images/Vector4.svg';
import Vector5 from '../images/Vector5.svg';
import '../css/recordVideo.css';
import SlideShow from './SlideShow';


import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
function RecordVideo() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [message, setMessage] = useState('Click Start to transcode');
  const ffmpeg = createFFmpeg({
    log: true,
  });

  const [buttonText, setbuttonText] = React.useState('record');
  const [slidesReached, setSlidesReached] = useState(2);
  const [imageNumberSet, setImageNumberSet] = useState(2);
  const {
    recordedChunks,
    images,
    setRecordedChunks,
    setImages,
    imgArray,
    setImgArray,
    timeArray,
    setTimeArray,
    imageName,

    setImageName,
  } = React.useContext(DataApi);
  const [errorMessage, setErrorMessage] = useState('');

  const [videoStarted, setVideoStarted] = useState(false);
  const [timeWhenVideoStarted, settimeWhenVideoStarted] = useState(null);
  const [pauseImg, setPauseImg] = useState(false);
  const [intervalWhilePaused, setIntervalWhilePaused] = useState([]);
  const [slideArrayCheck, setSlideArrayCheck] = useState(null);
  const [paused, setPaused] = useState(false);
  const slideRef = React.useRef();
  const imageRef = React.useRef();
  const [resumed, setResumed] = useState(false);
  const [imageNumber, setImageNumber] = useState(1);
  const [startingTime, setStartingTime] = useState(null);
  const [pausedAndResumed, setPausedAndResumed] = useState(false);
  const [stopInterval, setStopInterval] = useState(0);
  const [previousSlideEndTime, setPreviousSlideEndTime] = useState(0);
  const [videoFileGet, setvideoFileGet] = useState(null);

  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');
    ffmpeg.FS('writeFile', 'test.avi', await fetchFile('/flame.avi'));
    await ffmpeg.run('-i', 'test.avi', 'test.mp4');
    setMessage('Complete transcoding');
    const data = ffmpeg.FS('readFile', 'test.mp4');
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  };
 

  //Button Handlers
  const record_btnHandle = () => {
    // Assigning timeWhenVideoStarted while clicking the record button
    settimeWhenVideoStarted(new Date().getTime());
    setStartingTime(new Date().getTime());
    setbuttonText('pause');
  };

  const pauseBtnHandle = () => {
    // We are setting paused to true for checking it was paused or not
    // And to add the intervals while pause and after resume when first slide change happen
    // and assign it in timearray
    setPaused(true);
    // setting button text to proceed for changing the buttons from pause to
    // proceed or resume
    setbuttonText('procced');

    // If the user paused the recording
    var currentTime = new Date().getTime();
    var interval = currentTime - timeWhenVideoStarted;
    setIntervalWhilePaused((prevState) => prevState.concat(interval));
  };
  const resumeHandle = () => {
    // Assigning timeWhenVideoStarted while clicking the resume button
    settimeWhenVideoStarted(new Date().getTime());
    setbuttonText('pause');
    setPausedAndResumed(true);
  };

  // To concat images with name into the image array
  const slideImageHandler = (previous, next) => {
    if (buttonText === 'pause') {
      console.log('Next value', next);
      var slideTime = slidesReached;
      slideTime = slideTime + 1;
      setSlidesReached(slideTime);
      console.log('slides Reached', slidesReached);
      
      // To storing the image

      var imageFile = images[next].data_url;
      console.log('Image File', imageFile);
      imageFile = imageFile.replace('data:image/png;base64,', '');
      imageFile = imageFile.replace('data:image/jpeg;base64,', '');

      setImgArray((prevState) => prevState.concat(imageFile));
      console.log('Image Array', imgArray);

      // To storing the image name
      var randomValue = Math.floor(Math.random() * (10000 + 1));

      // setImageName((prevState) => prevState.concat(images[next].file.name));
      var imageNameSet = `image${randomValue}${imageNumberSet}`;
      setImageName((prevState) => prevState.concat(imageNameSet));
      setImageNumberSet((prevState) => prevState + 1);

      console.log('Image Names', imageName);
      
      var currentTime = new Date().getTime();
      var interval = currentTime - timeWhenVideoStarted;

      // If it is paused then resumed add the paused time and next slide change time together
      if (paused) {
        var currentTime = new Date().getTime();
        setPreviousSlideEndTime(currentTime);
        var interval = currentTime - timeWhenVideoStarted;

        console.log('Interval while Paused', intervalWhilePaused);
        console.log('interval length', intervalWhilePaused.length);
        // intervalWhilePaused.map((interval, i) => {
        interval = interval + intervalWhilePaused[0];
        if (intervalWhilePaused.length == 2) {
          interval = interval + intervalWhilePaused[1];
        }
        if (intervalWhilePaused.length == 3) {
          interval = interval + intervalWhilePaused[2];
        }
        if (intervalWhilePaused.length == 4) {
          interval = interval + intervalWhilePaused[3];
        }
        if (intervalWhilePaused.length == 5) {
          interval = interval + intervalWhilePaused[4];
        }
        if (intervalWhilePaused.length == 6) {
          interval = interval + intervalWhilePaused[5];
        }
        if (intervalWhilePaused.length == 7) {
          interval = interval + intervalWhilePaused[6];
        }
        if (intervalWhilePaused.length == 8) {
          interval = interval + intervalWhilePaused[7];
        }
        // });
        setStopInterval(interval);
        console.log('intervalWhilePaused,interval', intervalWhilePaused, interval);
        // var newTime = intervalWhilePaused + interval;
        // converting time into '00:00:00' format
        function msToTime(duration) {
          var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

          hours = hours < 10 ? '0' + hours : hours;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          return hours + ':' + minutes + ':' + seconds;
        }
        var nextTime = msToTime(interval);
        console.log('Time Array in paused', timeArray);
        setTimeArray((prevState) => prevState.concat(nextTime));
        // setPaused(false);
      } else {
        // For every other slide changes
        // converting time in minutes and seconds
        function msToTime(duration) {
          var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

          hours = hours < 10 ? '0' + hours : hours;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          return hours + ':' + minutes + ':' + seconds;
        }
        var newTime = msToTime(interval);
        console.log('Time', interval, newTime);
        setTimeArray((prevState) => prevState.concat(newTime));
        console.log('Time Array', timeArray);
      }

      // Assigning current time as video started time
      // settimeWhenVideoStarted(currentTime);
      console.log('difference', interval);
      console.log('TimeArray', timeArray);
      // setImgArray((prevState) => prevState.concat(slideArrayCheck));
    }
  };

  //slide Change Handler
  const slideChange = (value) => {};

  useEffect(() => {
   
    setImageName([]);
    setImgArray([]);
    setImageNumber(2);
    setTimeArray([]);

    // we are assigning the first image into the image array
    if (images[0]) {
      var imageFile = images[0].data_url;
      console.log('Image File', imageFile);
      imageFile = imageFile.replace('data:image/png;base64,', '');
      imageFile = imageFile.replace('data:image/jpeg;base64,', '');

      setImgArray((prevState) => prevState.concat(imageFile));
      var randomValue = Math.floor(Math.random() * (10000 + 1));

      // setImageName((prevState) => prevState.concat(images[next].file.name));
      var imageNameSet = `image${randomValue}1`;
      setImageName((prevState) => prevState.concat(imageNameSet));
    }

    let constraintObj = {
      // facingMode: {
      //   exact: 'environment',

      // },
      facingMode: 'user',
      audio: true,
      video: {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
      },
    };
    // width: 1280, height: 720  -- preference only
    // facingMode: {exact: "user"}
    // facingMode: "environment"

    // handle older browsers that might implement getUserMedia in some way
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
      navigator.mediaDevices.getUserMedia = function (constraintObj) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
      };
    } else {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          devices.forEach((device) => {
            console.log(device.kind.toUpperCase(), device.label);
            //, device.deviceId
          });
        })
        .catch((err) => {
          console.log(err.name, err.message);
          let error = `Error Name : ${err.name} , Error Message : ${err.message}`;
          setErrorMessage(error);
        });
    }

    // To access the camera and mic
    navigator.mediaDevices
      .getUserMedia(constraintObj)
      .then(function (mediaStreamObj) {
        //connect the media stream to the first video element
        let video = document.querySelector('video');
        if ('srcObject' in video) {
          video.srcObject = mediaStreamObj;
          setVideoStarted(true);
          // console.log('started');
        } else {
          //old version
          video.src = window.URL.createObjectURL(mediaStreamObj);
          setVideoStarted(true);
          // console.log('started');
        }

        video.onloadedmetadata = function (ev) {
          //show in the video element what is being captured by the webcam
          video.play();
        };

        //add listeners for saving video/audio
        let start = document.getElementById('btnstart');
        let stop = document.getElementById('btnstop');
        let pause = document.getElementById('btnpause');
        let resume = document.getElementById('btnresume');
        // let vidSave = document.getElementById('vid2');
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];

        start.addEventListener('click', (ev) => {
          console.log(mediaRecorder.state);
          mediaRecorder.start();
        });
        stop.addEventListener('click', (ev) => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
        });

        pause.addEventListener('click', (ev) => {
          console.log('paused click');
          mediaRecorder.pause();
          // if (MediaRecorder.state === 'recording') {
          //   mediaRecorder.pause();
          //   // recording paused
          // }
          console.log(mediaRecorder.state);
        });
        resume.addEventListener('click', (ev) => {
          console.log('resume click');
          mediaRecorder.resume();
          // if (MediaRecorder.state === 'paused') {
          //   mediaRecorder.resume();
          // }
          // resume recording
          console.log(mediaRecorder.state);
        });

        mediaRecorder.ondataavailable = function (ev) {
          // on data available we are pushing that datas into the chunks
          chunks.push(ev.data);
        };
        mediaRecorder.onstop = (chunks) => {
          var blob = new Blob(chunks, { type: 'video/mp4;' });
          console.log('chunks', chunks);
          chunks = [];
          
          // To convert the blob into base 64 string using file Reader and storing it into the
          // recorded chunks
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = function () {
            var base64data = reader.result;
            console.log(base64data);
            setRecordedChunks(base64data);
          };

          mediaStreamObj.getTracks().forEach(function (track) {
            track.stop();
          });
        };
      })
      .catch(function (err) {
        // console.log(err.name, err.message);
        let error = `Error Name : ${err.name}, Error Message : ${err.message}`;
        setErrorMessage(error);
      });

    return () => {};
  }, []);
  const recordStopHandle = () => {
    // var currentTime = new Date().getTime();
    // var interval = currentTime - timeWhenVideoStarted;
    console.log('interval,intervalWhilePaused', interval, intervalWhilePaused);
    // If it is paused then resumed add the paused time and next slide change time together
    if (pausedAndResumed) {
      var currentTime = new Date().getTime();
      console.log('stop interval', stopInterval);
      var interval = currentTime - previousSlideEndTime;
      console.log(
        'check values,interval,stopInterval,timeArray.length',
        interval,
        stopInterval,
        timeArray.length,
      );
      // var number = timeArray.length;
      interval = interval + stopInterval;

      console.log('interval while paused[0]', intervalWhilePaused.length, interval);
      
      console.log('intervalWhilePaused', intervalWhilePaused);

      // var newTime = intervalWhilePaused + interval;
      // converting time into '00:00:00' format
      function msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return hours + ':' + minutes + ':' + seconds;
      }
      console.log('intervalWhilePaused in seconds', msToTime(intervalWhilePaused));
      var nextTime = msToTime(interval);
      console.log('Time Array in paused,next time', timeArray, nextTime);
      setTimeArray((prevState) => prevState.concat(nextTime));
      // setPaused(false);
    } else {
      console.log('This is running');
      // For every other slide changes
      var currentTime = new Date().getTime();
      var interval = currentTime - startingTime;
      // converting time in minutes and seconds
      function msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return hours + ':' + minutes + ':' + seconds;
      }
      var newTime = msToTime(interval);
      console.log('Time', interval, newTime);
      setTimeArray((prevState) => prevState.concat(newTime));
      console.log('Time Array', timeArray);
    }
    // Assigning current time as video started time
    // settimeWhenVideoStarted(currentTime);
    console.log('difference', interval);
    console.log('TimeArray', timeArray);
    const element1 = document.getElementById('link');
    console.log('clicked');
    element1.click();
  };
  return (
    <div className='video_page'>
      <div className='top_content_photo'>
        <Link to='/impressent' className='redirect_title'>
          <p className='impressent_top_file'>impressent</p>
        </Link>
        <Link to='/impressent/photo' className='link_back'>
          <p className='back_key'>Go back</p>
        </Link>
      </div>
      <div className='container'>
        <div className='video_center'>
          <p className='record_video'>Record Video</p>
          <div className='vectors'>
            <img className='vector' src={Vector1} alt='' />
            <img className='vector' src={Vector4} alt='' />
            <img className='vector' src={Vector2} alt='' />
            <img className='vector' src={Vector5} alt='' />
            <img className='vector' src={Vector3} alt='' />
          </div>

          <div className='video_div'>
            <div>
              {!errorMessage ? (
                <video muted className='video_webcam'></video>
              ) : (
                <p className='error_msg'>{errorMessage}</p>
              )}
            </div>
            <div className='slides_div mx-auto'>
              {/* passing the props to slideshow component */}
              <SlideShow
                images={images}
                buttonText={buttonText}
                timeWhenVideoStarted={timeWhenVideoStarted}
                settimeWhenVideoStarted={settimeWhenVideoStarted}
                timeArray={timeArray}
                setTimeArray={setTimeArray}
                slideRef={slideRef}
                imageRef={imageRef}
                imgArray={imgArray}
                setImgArray={setImgArray}
                slideChange={slideChange}
                slideArrayCheck={slideArrayCheck}
                setSlideArrayCheck={setSlideArrayCheck}
                pauseImg={pauseImg}
                imageNumber={imageNumber}
                setImageNumber={setImageNumber}
                slideImageHandler={slideImageHandler}
                buttonText={buttonText}
              />
            </div>
          </div>
          <div className='video_lower'>
            <div className={videoStarted ? 'video_button_div' : 'd-none'}>
              <div className='btn_div'>
                <button
                  id='btnstart'
                  className={buttonText === 'record' ? 'record_btn' : 'd-none'}
                  onClick={(e) => record_btnHandle()}
                >
                  Record
                </button>
              </div>
              {!errorMessage ? (
                <div className='btn_div'>
                  <button
                    id='btnpause'
                    className={buttonText === 'pause' ? 'record_btn' : 'd-none'}
                    onClick={(e) => pauseBtnHandle()}
                  >
                    Pause
                  </button>
                </div>
              ) : null}
            </div>
            <div className={buttonText === 'procced' ? 'resumeProcced' : 'd-none'}>
              <div className='btn_div'>
                <button
                  id='btnresume'
                  className='record_btn res_procced'
                  onClick={(e) => resumeHandle()}
                >
                  Resume
                </button>
              </div>
              <div className='btn_div'>
                <button
                  id='btnstop'
                  className='record_btn res_procced proceed_bg link record_btn proceed_margin'
                  onClick={(e) => recordStopHandle()}
                >
                  Proceed
                </button>
              </div>
              <Link to='/impressent/review' id='link' className='d-none'></Link>
            </div>

            {/* <button
          onClick={() =>
            console.log(
              'time,Image array,intervalWhilePaused',
              timeArray,
              imgArray,
              intervalWhilePaused,
            )
          }
        >
          Time Array
        </button> */}

            {/* <button onClick={() => console.log(` Interval Array  Image Array `, imgArray, timeArray)}>
          Show Img array and interval arr
        </button>
        {imgArray.map((image, index) => (
          <div key={index}>
            <img src={image} alt='' height='95' width='171' />
          </div>
        ))} */}
            {/* <button onClick={() => console.log(imgArray)}>Show Imagearray</button> */}
            <div className={errorMessage ? 'margin_footer' : null}>
              <div className='footer_record_div d-flex justify-content-center d-flex align-items-center'>
                <footer className='footer_record'>© Copyright 2020</footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordVideo;

// npm install react-webcam
