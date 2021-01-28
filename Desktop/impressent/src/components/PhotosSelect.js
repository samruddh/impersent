import React, { useEffect, useRef } from 'react';
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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import '../css/photoSelect.css';

function PhotosSelect() {
  const { recordedChunks, images, setRecordedChunks, setImages } = React.useContext(DataApi);
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList);
    console.log(addUpdateIndex);
    // console.log(imageList[addUpdateIndex].data_url);
    setImages(imageList);
  };
  const options = {
    Webcam: true,
  };
  // const open = () => {
  //   // console.log('open',element)
  // };
  return (
    <div className='photo_layout'>
      <div className='top_content_photo'>
        <Link to='/impressent' className='redirect_title'>
          <p className='impressent_top_file'>impressent</p>
        </Link>
        <Link to='/impressent/file' className='link_back'>
          <p className='back_key photo_back'>Go back</p>
        </Link>
        <Link to='/impressent/filemob' className='mob_back'>
          <p className='back_key back_photo'>Go back</p>
        </Link>
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
      <div className='group_47'>
        {/* For getting the image from the user */}
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          // maxNumber={maxNumber}
          dataURLKey='data_url'
          className='mt-5'
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className='upload__image_wrapper'>
              {/* <div className={imageList.length > 5 ? 'image_grid_max' : 'image-grid'}> */}
              <div className={imageList.length > 5 ? 'image_grid_max' : 'image-grid'}>
                {/* Display the image from the slides array */}
                {imageList.map((image, index) => (
                  <div key={index} className='image_item button_container'>
                    {/* {console.log(image)}
                     {console.log('image array of 0', images[0].data_url)} */}
                    <img src={image.data_url} className='photoSelectImage' alt='' />
                    <div className='image-item__btn-wrapper'>
                      {/* Delete handler */}
                      <button onClick={() => onImageRemove(index)} className='btn_n'>
                        <DeleteOutlineIcon className='btn_icon' />
                      </button>
                    </div>
                  </div>
                ))}
                <div>
                  {/* Button for ading the slides */}
                  <button
                    className='addmore_btn'
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    id='myCheck'
                  >
                    <img className='vectoradd' src={VectorAdd} alt=''></img>
                    <p className='add_p'> Add more</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </ImageUploading>
      </div>
      <div className={images.length >= 1 ? 'lower_photo' : 'lower_photo_remove_flex'}>
        <Link to='/impressent/video' className={images.length >= 1 ? 'link' : 'd-none'}>
          <p className='proceed_photo'>Proceed</p>
        </Link>
        {/* <footer className='footer_photo'> */}
      </div>
      <footer className='footer_photo copyRight'>© Copyright 2020</footer>
    </div>
  );
}

export default PhotosSelect;
