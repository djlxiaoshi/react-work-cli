import React, { Component } from 'react';
import './App.css';

import Main from './pages/Main/Main';

class App extends Component {
    constructor (props) {
        super(props);
    }
  render() {
    return (
        <React.Fragment>
            <Main/>
        </React.Fragment>
    );
  }
}

export default App;
