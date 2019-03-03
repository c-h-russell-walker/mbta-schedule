import React from 'react';

import { formatTime } from '../utils/formatTime.js';


class DepartureTime extends React.Component {
  displayDepartureTime(departureTime) {
    const time = new Date(departureTime);
    return formatTime(time);
  }

  render() {
    return <td>{this.displayDepartureTime(this.props.departureTime)}</td>;
  }
}

export default DepartureTime;
