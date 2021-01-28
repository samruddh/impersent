import React, { useEffect, useRef } from 'react';
import '../css/homePage.css';
import Rectangle9 from '../images/Rectangle 9.svg';
import Rectangle1 from '../images/Rectangle 1.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import DataApi from '../utils/DataApi';

function HomePage() {
  useEffect(() => {
    console.log(process.env);
    return () => {};
  }, []);
  return (
    <div className='whole_page'>
      <div className='top_content'>
        <p className='impressent_top'>impressent</p>
      </div>
      <div className='center_page'>
        <p className='welcome_to'>Welcome to</p>
        <p className='impressent_center'>impressent</p>
        <p className='select_slides_center'>Select Slides and Get Started</p>
        <Link to='/impressent/file' className='link_home'>
          <p className='proceed_center'>Proceed</p>
        </Link>
      </div>
      <div className='mobile_div'>
        <div className='mobile_home'>
          <h2>impre</h2>

          <p className='mob_title'>impressent</p>

          <h2>ssent</h2>
          <Link to='/impressent/filemob' className='link_home proceed_hide'>
            <h5 className='proceed_center'>Proceed</h5>
          </Link>
        </div>
        <footer className='mob_footer'>© Copyright 2020</footer>
      </div>

      <footer className='footer_copy'>© Copyright 2020</footer>
    </div>
  );
}

export default HomePage;
