import React from 'react';


class CurrentTime extends React.Component {
  constructor(props) {
    super(props);

    const time = new Date();

    this.state = {
      currentTime: time,
      formattedTime: this._formatTime(time),
      intervalId: null,
    };

    this.updateTime = this.updateTime.bind(this);
  }

  _formatTime(time) {
    return time.toLocaleString(
      'en-US',
      {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          // Since we're always concerned with Boston we know the timezone
          timeZone: 'America/New_York',
      }
    );
  }

  updateTime() {
    this.setState({
      formattedTime: this._formatTime(new Date()),
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
      <div>
        <p>Current Time</p>
        {this.state.formattedTime}
      </div>
    );
  }
}

export default CurrentTime;
