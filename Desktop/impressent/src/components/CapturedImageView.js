import React, { useState, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import DataApi from '../utils/DataApi';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Rectangle1 from '../images/Rectangle 1.svg';
import Rectangle9 from '../images/Rectangle 9.svg';
import Vector1 from '../images/Vector1.svg';
import Vector2 from '../images/Vector2.svg';
import Vector3 from '../images/Vector3.svg';
import Vector4 from '../images/Vector4.svg';
import Vector5 from '../images/Vector5.svg';
import VectorAdd from '../images/Vectoradd.svg';
import DeleteIcon from '@material-ui/icons/Delete';
import '../css/captureImageView.css';
import CaptureImage from './CaptureImage';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MobileCameraCapture from './MobileCameraCapture';
function CapturedImageView() {
  // let img;
  // Initializing value from create Context
  const { recordedChunks, images, setRecordedChunks, setImages } = React.useContext(DataApi);
  console.log('images', images);
  const [capture, setCapture] = useState(false);
  const handleCapture = () => {
    console.log('clicked');
    setCapture(true);
  };
  const deleteHandle = (e, value) => {
    console.log('delete');
    var array = [...images]; // make a separate copy of the array
    var index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
      setImages(array);
    }
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <div className='top_content_photo'>
        <p className='impressent_top_photo'>impressent</p>
      </div>
      <div className='photo_center'>
        <p className='record_video'>Record Video</p>
        <div className='vectors'>
          <img className='vector' src={Vector1} alt=''></img>
          <img className='vector' src={Vector4} alt=''></img>
          <img className='vector' src={Vector2} alt=''></img>
          <img className='vector' src={Vector5} alt=''></img>
          <img className='vector' src={Vector3} alt=''></img>
        </div>
      </div>
      {capture ? (
        <div className='camera_capture d-none'>
          <MobileCameraCapture className='d-none' capture={capture} setCapture={setCapture} />
        </div>
      ) : null}
      (
      <div className='image_wrapper'>
        <div className='image_capture'>
          {images.map((images, index) => (
            <div key={index} className='image_item_capture'>
              <img src={images} alt='' height='110' width='171' />
              <div className='image_item_btn'>
                <button className='btn_n' onClick={(e) => deleteHandle(e, images)}>
                  <DeleteOutlineIcon className='btn_icon' />
                </button>
              </div>
            </div>
          ))}
          <button className='capture_more' onClick={handleCapture}>
            <img className='vectoradd_cap' src={VectorAdd} alt=''></img>
            <p className='add_p'>Capture more</p>
          </button>
        </div>
      </div>
      )
      <div className='lower_photo'>
        <Link to='/video' className={capture ? 'd-none' : 'link'}>
          <p className='proceed_photo'>Proceed</p>
        </Link>
        <footer className={!capture ? 'footer_photo' : 'd-none'}>© Copyright 2020</footer>
      </div>
    </div>
  );
}

export default CapturedImageView;
