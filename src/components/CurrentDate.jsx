import React from 'react';


class CurrentDate extends React.Component {
  constructor(props) {
    super(props);

    const time = new Date();

    this.state = {
      currentDate: time.getDate(),
      formattedCurrentDate: this._formatCurrentDate(time),
      intervalId: null,
    };
  }

  _formatCurrentDate(time) {
    let currentDate = time.toLocaleString(
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
    return currentDate.replace(/\//g, '-');
  }

  updateDate() {
    this.setState({
      formattedCurrentDate: this._formatCurrentDate(new Date()),
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
        {this.state.formattedCurrentDate}
      </div>
    );
  }
}

export default CurrentDate;
