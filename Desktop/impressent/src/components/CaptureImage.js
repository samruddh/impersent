import React from 'react';
import DataApi from '../utils/DataApi';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import '../css/captureImageView.css';
function CaptureImage(props) {
  const { recordedChunks, images, setRecordedChunks, setImages } = React.useContext(DataApi);
  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    setImages((prevState) => prevState.concat(dataUri));
    console.log(images);
  };
  return (
    <div>
      <Camera
        className='camera_capture_img'
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      />

      {props.capture ? (
        <div className='done_btn_div'>
          <button className='done_btn' onClick={() => props.setCapture(false)}>
            Done
          </button>
        </div>
      ) : (
        <Link to='/capturedView' className='link capture_procced'>
          <p className='proceed_photo'>Proceed</p>
        </Link>
      )}
    </div>
  );
}

export default CaptureImage;
