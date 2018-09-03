import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Index from './components/index';
import {Provider} from 'mobx-react';
import MainStore from './store/mainStore';

class App extends Component {

  state = {
    response: ''
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Provider mainStore={MainStore}>
            <Index />
          </Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
