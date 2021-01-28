import React from 'react';
import ImageUploading from 'react-images-uploading';
import DataApi from '../utils/DataApi';
import Rectangle9 from '../images/Rectangle 9.svg';
import VectorAdd from '../images/Vectoradd.svg';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/fileManagerMobile.css';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Vector1 from '../images/Vector_select.svg';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import $ from 'jquery';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import CaptureImage from './CaptureImage';
import MobileCameraCapture from './MobileCameraCapture';
class FileManagerMobile extends React.Component {
  static contextType = DataApi;

  constructor() {
    super();
    this.state = {
      show: false,
      clicked: false,
      capture: false,
    };
  }
  render() {
    this.onClick = () => {
      console.log('clicked');
      this.setState({ clicked: true });
    };
    this.onCloseHandle = () => {
      console.log('clicked');
      this.setState({ clicked: false });
    };
    const onChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      this.context.setImages(imageList);
      this.setState({ show: false });

      // <Redirect to='photo' />;
      // To redirect to next page
      const element1 = document.getElementById('link');
      element1.click();
    };
    this.captureHandle = () => {
      this.setState({
        capture: true,
      });
    };
    this.handleTakePhoto = (dataUri) => {
      // Do stuff with the photo...
      console.log('takePhoto');
    };
    return (
      <div className='file_layout'>
        <div className='top_content_file'>
          <Link to='/impressent' className='redirect_title'>
            <p className='impressent_top_file_mob'>impressent</p>
          </Link>
          <Link to='/impressent' className='link_back'>
            <p className='back_key'>Go back</p>
          </Link>
        </div>
        <div className='icon_body'>
          <div className='no_data_div'>
            <p className='no_data'>No data available</p>
          </div>
        </div>
        <ImageUploading
          multiple
          value={this.context.images}
          onChange={onChange}
          // maxNumber={maxNumber}
          dataURLKey='data_url'
          className='mt-5'
          id='FilesSelector'
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
            <div className='icons_row'>
              {/* {this.state.clicked ? ( */}
              {/* <div className='show_click'> */}
              {/* <div className='camera'>
                      <p>Capture Now</p>
                      <button onClick={this.captureHandle} className='select_btn'>
                        <div className='camera_div'>
                          <CameraAltIcon style={{ fontSize: '20px' }} className='camera_icon' />
                        </div>
                      </button>
                    </div> */}
              {/* <div className='camera'>
                      <p className='select_p'>Select Images</p>

                      <button
                        className='camera-div select_btn'
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        id='myCheck'
                      > 
                        <div className='vector_icon'>
                          <img className='vector_image' src={Vector1} alt=''></img>
                        </div>
                      </button>
                    </div>

                    <div className='close_div'>
                      <button onClick={this.onCloseHandle}>
                        <ClearIcon style={{ fontSize: 30 }} className='close_icon' />
                      </button>
                    </div>
                  </div>
                ) : ( */}
              <div className='add_div'>
                {/* <button onClick={this.onClick} className='add_icon_div'> */}
                <button
                  className='add_icon_div'
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  id='myCheck'
                >
                  <AddIcon style={{ fontSize: 50 }} className='add_icon' />
                </button>
              </div>
              )
            </div>
          )}
        </ImageUploading>
        <footer className='mob_footer mob_file'>© Copyright 2020</footer>

        <Link to='/impressent/photo' className='d-none' id='link'></Link>
      </div>
    );
  }
}

export default FileManagerMobile;
