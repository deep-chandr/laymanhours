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
      <div className="App">
        <BrowserRouter>
          <Provider mainStore={MainStore}>
            <Index />
          </Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
