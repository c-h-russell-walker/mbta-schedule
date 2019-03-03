import React from 'react';


class DayOfWeek extends React.Component {
  constructor(props) {
    super(props);

    const time = new Date();

    this.state = {
      currentDate: time.getDate(),
      dayOfWeek: this._formatDayOfWeek(time),
      intervalId: null,
    };

    this.updateDay = this.updateDay.bind(this);
  }

  _formatDayOfWeek(time) {
    return time.toLocaleString(
      'en-US',
      {
        // Since we're always concerned with Boston we know the timezone
        timeZone: 'America/New_York',
        weekday: 'long',
      }
    );
  }

  updateDay() {
    this.setState({
      dayOfWeek: this._formatDayOfWeek(new Date()),
    });
  }

  componentDidMount() {
    // Keep track of the setInterval ID so we can clear it later
    const intervalId = setInterval(() => {
      const time = new Date();
      if (time.getDate() !== this.state.currentDate) {
        this.updateDay();
      }
    }, this.props.checkInterval || 1000);

    this.setState({
      intervalId: intervalId,
    });
  }

  render() {
    return (
      <div style={{ position: 'absolute', marginLeft: '1em', }}>
        {this.state.dayOfWeek}
      </div>
    );
  }
}

export default DayOfWeek;
