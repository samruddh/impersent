import React, { useEffect, useState } from 'react';
import DataApi from '../utils/DataApi';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Vector1 from '../images/Vector1_rec.svg';
import Vector3 from '../images/vector3_rec.svg';
import Vector4 from '../images/Vector4.svg';
import Vector5 from '../images/Vector5.svg';
import Vector2 from '../images/Vector2.svg';
import VectorPlay from '../images/Vector_play.svg';
import PauseIcon from '@material-ui/icons/Pause';
// import 'node_modules/video-react/dist/video-react.css';
import { Player } from 'video-react';
import $, { data } from 'jquery';
import '../css/review.css';
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import Axios from 'axios';
import ShareScreen from './ShareScreen';
import workerClient from 'ffmpeg-webworker';

function Review(props) {
  const {
    recordedChunks,
    images,
    setRecordedChunks,
    setImages,
    imgArray,
    setImgArray,
    setImageName,
    imageName,
    imageSlideTime,
    setImageSlideTime,
    timeArray,
    setTimeArray,
    imageForRequest,
    setImageForRequest,
    imageNameForRequest,
    setImageNameForRequest,
    shareUrl,
    setShareUrl,
  } = React.useContext(DataApi);
  const [playButton, setPlayButton] = useState(true);
  const [newImageSlideTime, setNewImageSlideTime] = useState([]);
  const [updateImageSlideTime, setUpdateImageSlideTime] = useState(true);
  const [videoConverted, setVideoConverted] = useState(null);
  // const [shareUrl, setShareUrl] = useState('');
  const [mobileView, setMobileView] = useState(false);
  const [imageSend, setimageSend] = useState([]);
  const [videoName, setVideoName] = useState('recordedVideo');
  const [reRun, setReRun] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');

  // initialize form values
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
  });
  const inputRef = React.useRef(null);
  const [popup, setPopup] = useState(false);
  const [currentPathname, setCurrentPathname] = useState(null);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [ffmpegReady, setFfmpegReady] = useState(false);
  const [stdOutputText, setstdOutputText] = useState('');
  const [dataGot, setDataGot] = useState(null);
  useEffect(() => {
    // workerClient.on('onReady', () => setFfmpegReady(false));
    // workerClient.on('onStdout', (msg) => setstdOutputText(msg));
    // workerClient.on('onFileReceived', (msg) => setstdOutputText(msg));
    // workerClient.on('onDone', (data) => {
    //   setstdOutputText('Command Completed, check the console');
    //   console.log('converted data', data);
    //   setDataGot(data);
    // });
    // // Set the file for processing
    // // workerClient.inputFile = recordedChunks;
    // // Run a valid ffmpeg command
    // // var newVideo = workerClient.runCommand(
    // //   `ffmpeg -i ${recordedChunks} -vcodec h264 -acodec mp2 output.mp4`,
    // // );
    // workerClient.runCommand('-ss 00:00:05 -c copy -t 12 sliced-output.mp4');
    // setDataGot(newVideo);
    // console.log('newVideo', data);
    // const { history } = props;
    // history.listen((newLocation, action) => {
    //   if (action === 'PUSH') {
    //     if (newLocation.pathname !== currentPathname || newLocation.search !== currentSearch) {
    //       // Save new location
    //       setCurrentPathname = newLocation.pathname;
    //       setCurrentSearch = newLocation.search;

    //       // Clone location object and push it to history
    //       history.push({
    //         pathname: newLocation.pathname,
    //         search: newLocation.search,
    //       });
    //     }
    //   } else {
    //     // Send user back if they try to navigate back
    //     history.go(1);
    //   }
    // });

    // if (submitted) {
    //   history.pushState(null, null, location.href);
    //   window.onpopstate = function (event) {
    //     history.go(1);
    //   };
    console.log('Recorded chunks view', recordedChunks);
    console.log('Image Name,Image Array,timeArray', imageName, imgArray, timeArray);
    if (reRun) {
      var randomValue = Math.floor(Math.random() * (100000 + 1));
      // console.log('random Value', randomValue);
      var newValue = videoName + randomValue + '.mp4';
      setVideoName(newValue);
      setReRun(false);
    }
    // To remove that extra string value from the video file
    if (recordedChunks) {
      var videoFile = recordedChunks;
      console.log('video File', videoFile);
      videoFile = videoFile.replace('data:video/mp4;;base64,', '');
      console.log('converted video File', videoFile);
      setVideoConverted(videoFile);
    }

    // For video Play time
    let video = document.getElementById('vid2');

    var i = setInterval(function () {
      console.log(video.currentTime);
      // var unit = `  `;
      var minutes = parseInt(video.currentTime / 60, 10);
      var seconds = video.currentTime % 60;
      seconds = Math.trunc(seconds);
      document.getElementById('duration').innerHTML = `${minutes} : ${seconds}`;
    }, 1000);

    // To assign values into newImageSlideTime Array
    console.log('Image Array,Image Array ,timeArray', imgArray, imageName, timeArray);
    if (updateImageSlideTime) {
      //For Image
      var newImageObject = {};
      imageName.forEach((key, i) => (newImageObject[imageName[i]] = imgArray[i]));
      console.log('newImage Object', newImageObject);
      setImageForRequest((prevState) => prevState.concat(newImageObject));

      // For image name
      var result = {};
      imageName.forEach((key, i) => (result[imageName[i]] = imageName[i]));
      console.log(result);
      setImageNameForRequest((prevState) => prevState.concat(result));

      //For Image slide timer
      var newSlideTimer = {};
      imageName.forEach((key, i) => (newSlideTimer[imageName[i]] = timeArray[i]));
      setNewImageSlideTime((prevState) => prevState.concat(newSlideTimer));
      console.log('time after setting', newImageSlideTime);

      setUpdateImageSlideTime(false);
    }

    return () => {
      clearInterval(i);
    };
  }, [recordedChunks]);

  //Video Play handler
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

  //Submit handling and API call

  const onSubmit = (values, onSubmitProps) => {
    setSubmitted(true);
    console.log('clicked submit');
    console.log('recoreded', videoConverted);
    // console.log('video Name', videoName);

    console.log('images', imgArray);
    // console.log('image_slide_time', newImageSlideTime);
    // console.log('imageName', imageName);
    // console.log('video', recordedChunks);
    // console.log('video_name', 'Recorded Video');
    // console.log('title and descrription', values);

    // const showAndTellUrl = 'http://144.76.139.247/httest/sat/test/product/image_save.php';
    const showAndTellUrl = 'https://httest.in/sat/test/product/image_save.php';

    const postBody = {
      images: imageForRequest,
      image_name: imageNameForRequest,
      image_slide_time: newImageSlideTime,
      // video: videoConverted,
      video: videoConverted,
      video_name: videoName,
      audio: null,
      audio_name: null,
      title: values.title,
      description: values.description,
    };

    // console.log('Stringified', JSON.stringify(postBody));
    console.log('Post Request Body', postBody);
    // const requestMetadata = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // 'Access-Control-Allow-Origin': '*',
    //     mode: 'no-cors', // 'cors' by default
    //   },
    //   body: JSON.stringify(postBody),
    // };
    // // console.log(requestMetadata);
    // fetch(showAndTellUrl, requestMetadata)
    //   .then((response) => {
    //     console.log('response', response);
    //   })
    //   .catch((err) => {
    //     console.log('error', err);
    //   });
    Axios.post(showAndTellUrl, postBody)
      .then((response) => {
        console.log(response.data.URL);
        setShareUrl(response.data.URL);
        console.log(shareUrl);
        console.log('post body', postBody);
        onSubmitProps.setSubmitting(false);
        if (mobileView) {
          console.log('clicked', mobileView);
          const element1 = document.getElementById('sharemob');
          element1.click();
        } else {
          console.log('Not', mobileView);
          const element1 = document.getElementById('open');
          element1.click();
        }
      })
      .catch((err) => console.log(err));

    console.log('post body', postBody);
    // console.log(imageName);
    // console.log('imgArray', imgArray);
    // console.log('video', recordedChunks);
    // console.log(values);
  };

  // For validating the form
  const validationSchema = Yup.object({
    title: Yup.string().required('Required !'),
    description: Yup.string().required('Required !'),
  });

  // To open and close popup
  const togglePop = () => {
    console.log(popup);
    setPopup((prevState) => !prevState);
  };
  console.log('review', recordedChunks);
  return (
    <div className='review_page'>
      {console.log('page running')}
      <div className='top_content_photo'>
        <Link to='/impressent' className='redirect_title'>
          <p className='impressent_top_file'>impressent</p>
        </Link>
        {!submitted ? (
          <Link to='/impressent/video' className='link_back'>
            <p className='back_key'>Go back</p>
          </Link>
        ) : null}
      </div>

      {popup ? (
        <div className='popUpDiv'>
          <ShareScreen shareUrl={shareUrl} togglePop={togglePop} />
        </div>
      ) : null}
      <div className='container'>
        <div className='video_center'>
          <p className='record_video'>Save Video</p>
          <div className='vectors'>
            <img className='vector' src={Vector1} alt='' />
            <img className='vector' src={Vector4} alt='' />
            <img className='vector' src={Vector2} alt='' />
            <img className='vector' src={Vector5} alt='' />
            <img className='vector' src={Vector3} alt='' />
          </div>

          <div className='container justify-content-center review_container'>
            <div className='row row-md-6 row-sm-2 justify-content-center'>
              <div className=' col col-md-6 col-sm-2 video_part'>
                <video id='vid2' src={recordedChunks} className='video_review'></video>
                <button className='play_btn' id='playBtn' onClick={(e) => playHandler()}>
                  {playButton ? (
                    <img className='vector' src={VectorPlay} alt='' />
                  ) : (
                    <PauseIcon style={{ fontSize: 50 }} className='pause_icon' />
                  )}
                </button>
                <p id='duration'></p>
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {(formik) => {
                  return (
                    <div className='content_part col col-md-6 col-sm-6'>
                      <Form>
                        <Field
                          className='review_title'
                          placeholder='Title'
                          name='title'
                          // ref={inputRef}
                          innerRef={inputRef}
                          id='input1'
                          // value={title}
                          // onChange={(e) => changeHandler(e)}
                        ></Field>
                        <ErrorMessage name='title'>
                          {(errorMsg) => <div className='error_title'>{errorMsg}</div>}
                        </ErrorMessage>
                        <div className='descriptionMargin'>
                          <Field
                            as='textarea'
                            className='review_description'
                            placeholder='Description'
                            name='description'
                            // value={description}
                            // onChange={(e) => changeHandler(e)}
                          />
                          <ErrorMessage name='description' component={TextError} />
                        </div>
                        {formik.isSubmitting ? (
                          <div className='wait_message '>Please Wait ...</div>
                        ) : (
                          <div>
                            <button
                              className='review_share sharemargin'
                              type='submit'
                              disabled={formik.isSubmitting}
                            >
                              Save & Share
                            </button>
                            <div className='mobViewReview'>
                              <button
                                className='review_share_mob mobViewReview'
                                onClick={(e) => setMobileView(true)}
                                type='submit'
                                disabled={formik.isSubmitting}
                              >
                                Save & Share
                              </button>
                              <footer className='footer_review_mob'>© Copyright 2020</footer>
                            </div>
                          </div>
                        )}

                        <Link to='/impressent/sharemob' className='d-none' id='sharemob'></Link>
                      </Form>
                    </div>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => togglePop()} id='open' className='d-none'>
        Open
      </button>

      <button onClick={() => console.log('Data converted', dataGot)}>Video</button>
      <div className='footerReviewWeb'>
        <div className='footer_record_div d-flex justify-content-center d-flex align-items-center footer_review'>
          <footer className='footer_record'>© Copyright 2020</footer>
        </div>
      </div>
    </div>
  );
}

export default Review;
