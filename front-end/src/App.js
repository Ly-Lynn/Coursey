import React from 'react';

import './App.css';
import MainPage from './screens/Home/homeScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppRoutes from './components/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster, toast } from 'react-hot-toast';
function App() {

    return (
      <>
      <Toaster/>
      <AppRoutes/>
      </>
    )
  }


export default App;
