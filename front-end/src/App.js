import React from 'react';

import './App.css';
import MainPage from './screens/Home/homeScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const App = () => {

  return (
    <>
      <MainPage/>
    </>
  );
};

export default App;
