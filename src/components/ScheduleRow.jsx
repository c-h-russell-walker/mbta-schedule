import React from 'react';

import DepartureTime from './DepartureTime.jsx';
import Destination from './Destination.jsx';
import StationName from './StationName.jsx';
import Status from './Status.jsx';
import TrackNumber from './TrackNumber.jsx';


class ScheduleRow extends React.Component {
  render() {
    return (
      <tr>
        <StationName />
        <DepartureTime />
        <Destination />
        <TrackNumber />
        <Status />
      </tr>
    );
  }
}

export default ScheduleRow;
