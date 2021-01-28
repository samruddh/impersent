import React from 'react';
import HomePage from '../components/HomePage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PhotosSelect from '../components/PhotosSelect';
import FileManager from '../components/FileManager';
import RecordVideo from '../components/RecordVideo';
import Review from '../components/Review';
function Routes() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/file' component={FileManager} />
        <Route path='/photo' component={PhotosSelect} />
        {/* <Route path='/video' component={RecordVideo} /> */}
        <Route path='/review' component={Review} />
      </Switch>
    </div>
  );
}

export default Routes;
