import React, { Component } from 'react';

import './App.css';

import ScheduleBoard from './components/ScheduleBoard.jsx';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ScheduleBoard />
        </header>
      </div>
    );
  }
}

export default App;
