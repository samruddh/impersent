import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Location from './components/pages/Location';
import Count from './components/pages/Count';
import Search from './components/pages/Search';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/location' component={Location} />
          <Route path='/count' component={Count} />
          <Route path='/search' component={Search} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
