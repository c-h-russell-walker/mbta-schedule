import React from 'react';


class DayOfWeek extends React.Component {
  constructor(props) {
    super(props);

    // TODO - Make this aware of when to switch over (at midnight)

    const time = new Date();
    const dayOfWeek = time.toLocaleString(
      'en-US',
      {
        // Since we're always concerned with Boston we know the timezone
        timeZone: 'America/New_York',
        weekday: 'long',
      }
    );

    this.state = {
      dayOfWeek: dayOfWeek,
    };
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
