import React, { Component, Fragment as div, useEffect } from 'react';
import { Camera } from 'react-cam';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import DataApi from '../utils/DataApi';
import '../css/mobileCameraCapture.css';
class MobileCameraCapture extends Component {
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
        const element1 = document.getElementById('link');
        element1.click();
        if (this.props.capture) {
          this.props.setCapture(false);
        }
        console.log('array', this.state.images);
      }
      //  else if (input.files[0].type.indexOf('audio/') > -1) {
      //   let audio = document.getElementById('audio');
      //   audio.src = window.URL.createObjectURL(input.files[0]);
      // } else if (input.files[0].type.indexOf('video/') > -1) {
      //   let video = document.getElementById('video');
      //   video.src = window.URL.createObjectURL(input.files[0]);
      // }
    });
  }

  render() {
    return (
      <div className='mob_camera'>
        <form action='#' id='myform' encType='multipart/form-data'>
          <label htmlFor='capture' className='d-none'>
            Capture
          </label>

          <input type='file' id='capture' accept='image/*' className='d-none' capture multiple />
          {/* <input type='file' id='capture' accept='image/*,video/*,audio/*' capture multiple /> */}

          <br />
          <input type='submit' className='d-none' value='Process' />
        </form>
        <p className='d-none'>
          <img src='' id='img' alt='from phone' />
        </p>
        {/* <p>
          <audio src='' id='audio' controls></audio>
        </p>
        <p>
          <video src='' id='video' controls></video>
        </p> */}
        <Link to='/capturedView' className='d-none' id='link'></Link>
      </div>
    );
  }
}
export default MobileCameraCapture;
