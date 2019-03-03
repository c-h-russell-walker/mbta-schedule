import React, { Component } from 'react';

import './App.css';

import ScheduleBoard from './components/ScheduleBoard.jsx';


class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <ScheduleBoard />
        </header>
        <div>
          <p>Source code found <a rel="noopener noreferrer" target="_blank" href="https://github.com/c-h-russell-walker/mbta-schedule">here</a>.</p>
        </div>
      </div>
    );
  }
}

export default App;
