import React from 'react';

import { formatTime } from '../utils/formatTime.js';


class CurrentTime extends React.Component {
  constructor(props) {
    super(props);

    const time = new Date();

    this.state = {
      currentTime: time,
      formattedTime: formatTime(time),
      intervalId: null,
    };

    this.updateTime = this.updateTime.bind(this);
  }

  updateTime() {
    this.setState({
      formattedTime: formatTime(new Date()),
    });
  }

  componentDidMount() {
    // Keep track of the setInterval ID so we can clear it later
    const intervalId = setInterval(() => {
      const time = new Date();
      if (time.getMinutes() !== this.state.currentTime.getMinutes()) {
        this.updateTime();
      }
    }, 1000); // TODO - Maybe make this configurable (checking every second now)

    this.setState({
      intervalId: intervalId,
    });
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  render() {
    return (
      <div style={{ float: 'right', marginRight: '1em', }}>
        {this.state.formattedTime}
      </div>
    );
  }
}

export default CurrentTime;
