import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Index from './components/index';
import { apiCallTest, getApiTestData } from './components/utils/apiCall';

class App extends Component {

  state = {
    response: ''
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Index />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
