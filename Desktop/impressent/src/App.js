// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';

import Routes from './Router/Routes';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import DataApi from './utils/DataApi';
import './css/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import HomePage from './components/HomePage';
import FileManager from './components/FileManager';
import PhotosSelect from './components/PhotosSelect';
import Review from './components/Review';
import FileManagerMobile from './components/FileManagerMobile';
import CapturedImageView from './components/CapturedImageView';
import MobileCameraCapture from './components/MobileCameraCapture';
import RecordVideo from './components/RecordVideo';
import RecordVideoMobile from './components/RecordVideoMobile';
import SlideShow from './components/SlideShow';
import ShareScreen from './components/ShareScreen';
import ShareMobile from './components/ShareMobile';
function App(props) {
  // Creating common States
  const [recordedChunks, setRecordedChunks] = React.useState(null);
  const [imgArray, setImgArray] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [imageName, setImageName] = useState([]);
  const [timeArray, setTimeArray] = useState([]);
  // const [timeArray, setTimeArray] = useState(['00:00:00']);

  // states are for storing the post request Data
  const [imageForRequest, setImageForRequest] = useState([]);
  const [imageSlideTime, setImageSlideTime] = useState([]);
  const [imageNameForRequest, setImageNameForRequest] = useState([]);
  const [shareUrl, setShareUrl] = useState('');
  const currentPathname = null;
  const currentSearch = null;
  // useEffect(() => {
  //   const { history } = props;

  //   history.listen((newLocation, action) => {
  //     if (action === 'PUSH') {
  //       if (newLocation.pathname !== currentPathname || newLocation.search !== currentSearch) {
  //         // Save new location
  //         currentPathname = newLocation.pathname;
  //         currentSearch = newLocation.search;

  //         // Clone location object and push it to history
  //         history.push({
  //           pathname: newLocation.pathname,
  //           search: newLocation.search,
  //         });
  //       }
  //     } else {
  //       // Send user back if they try to navigate back
  //       history.go(1);
  //     }
  //   });
  //   return () => {};
  // }, []);
  return (
    <div>
      <Router>
        {/* Data to be used by all the components using React.createContext */}
        <DataApi.Provider
          value={{
            recordedChunks,
            images,
            setRecordedChunks,
            setImages,
            imgArray,
            setImgArray,
            imageName,
            setImageName,
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
          }}
        >
          <Switch>
            {/* All Routes */}
            <Route exact path='/' render={() => <Redirect to='/impressent' />} />
            <Route path='/impressent' exact component={HomePage} />
            <Route path='/impressent/file' component={FileManager} />
            <Route path='/impressent/filemob' component={FileManagerMobile} />
            <Route path='/impressent/photo' component={PhotosSelect} />
            <Route path='/impressent/video' component={RecordVideo} />
            <Route path='/impressent/review' component={Review} />
            <Route path='/impressent/capturedview' component={CapturedImageView} />
            <Route path='/impressent/mobcapture' component={MobileCameraCapture} />
            <Route path='/videomob' component={RecordVideoMobile} />
            <Route path='/impressent/slide' component={SlideShow} />
            <Route path='/impressent/share' component={ShareScreen} />
            <Route path='/impressent/sharemob' component={ShareMobile} />
          </Switch>
        </DataApi.Provider>
      </Router>
    </div>
  );
}

export default App;

// set HTTPS=true&&npm start
//  "start": "set HTTPS=true&&react-scripts start",
// "start": "react-scripts start",
//  "start": "set PORT=8000 && react-scripts start"
// C:\MYPROJECT> SET PORT=8000
// $ export PORT=8000
//  "start": "set HTTPS=true&&SSL_CRT_FILE=certssh.pem&&SSL_KEY_FILE=keyssh.pem&&react-scripts start",
// REACT_APP_HTTPS=true
