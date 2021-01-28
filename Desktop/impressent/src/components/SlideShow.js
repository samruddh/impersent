import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import DataApi from '../utils/DataApi';
import '../css/slideShow.css';
import Arrow1 from '../images/Arrow 1.svg';
import Arrow2 from '../images/Arrow 2.svg';
import Arrow3 from '../images/Arrow 3.svg';
import Arrow4 from '../images/Arrow 4.svg';

const SlideShow = (props) => {
  const [arrayReached, setArrayReached] = useState(false);
  const [slidesReached, setSlidesReached] = useState(2);
  // Accesing states from React create context
  const {
    recordedChunks,
    images,
    setRecordedChunks,
    setImages,
    imageName,
    setImageName,
  } = React.useContext(DataApi);

  //Accessing states from props provided by Record video
  const {
    timeWhenVideoStarted,
    settimeWhenVideoStarted,
    timeArray,
    setTimeArray,
    imageRef,
    slideRef,
    imgArray,
    setImgArray,
    slideChange,
    setSlideArrayCheck,
    pauseImg,
    imageNumber,
    setImageNumber,
    slideImageHandler,
    buttonText,
  } = props;

  // properties for video
  const properties = {
    // duration: 5000,
    autoplay: false,
    // transitionDuration: 500,
    arrows: false,
    infinite: true,
    easing: 'ease',
    onChange: (previous, next) => {
      slideImageHandler(previous, next);
      // pauseHandler(previous, next);
    },
    canSwipe: buttonText === 'pause' ? true : false,
    indicators: (i) => <div className='indicator'>{i + 1}</div>,
  };

  useEffect(() => {
    //If images[0] is available store it in image name (for storing the first slide)
    // if (images[0]) {
    //   var imageFile = images[0].data_url;
    //   console.log('Image File', imageFile);
    //   imageFile = imageFile.replace('data:image/png;base64,', '');

    //   setImgArray((prevState) => prevState.concat(imageFile));
    //   // setImageName((prevState) => prevState.concat(images[0].file.name));
    // }
    return () => {};
  }, [pauseImg]);

  const pauseHandler = (previous, next) => {
    if (pauseImg) {
      setImgArray((prevState) => prevState.concat(images[next].data_url));
    }
  };

  return (
    <div className='slide_show'>
      <div className='slide-container'>
        <Slide ref={slideRef} {...properties}>
          {/* Displaying the slides */}
          {images.map((image, index) => (
            <div className='each-slide' key={index}>
              <img
                id='img_value'
                className='lazy'
                src={image.data_url}
                width='220px'
                height='180px'
                alt='sample'
              />
            </div>
          ))}
        </Slide>
        {/* Buttons to change the slides */}
        {buttonText === 'pause' ? (
          <div>
            <button
              onClick={(e) => slideRef.current.goBack()}
              type='button'
              id='myBtn'
              className='back_button'
            >
              <img src={Arrow2} alt='' className='arrow arrow_web' />
              <img src={Arrow3} alt='' className='arrow arrow_mob' />
            </button>
            <button
              onClick={(e) => slideRef.current.goNext()}
              type='button'
              id='myBtn'
              className='next_button'
            >
              <img src={Arrow1} alt='' className='arrow arrow_web' />
              <img src={Arrow4} alt='' className='arrow arrow_mob' />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default SlideShow;
