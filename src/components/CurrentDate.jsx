import React from 'react';


class CurrentDate extends React.Component {
  constructor(props) {
    super(props);

    // TODO - Make this aware of when to switch over (at midnight)

    const time = new Date();
    let dayOfWeek = time.toLocaleString(
      'en-US',
      {
        // Since we're always concerned with Boston we know the timezone
        timeZone: 'America/New_York',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }
    );

    // Replacing slashes with hyphens to match image of board at North Station
    dayOfWeek = dayOfWeek.replace(/\//g, '-');

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

export default CurrentDate;
