import React from 'react';

import './App.css';
import MainPage from './screens/Home/homeScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppRoutes from './components/routes';

function App() {
    return <AppRoutes />;
  }
  

export default App;
