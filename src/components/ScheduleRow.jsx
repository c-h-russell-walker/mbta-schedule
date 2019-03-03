import React from 'react';

import DepartureTime from './DepartureTime.jsx';
import Destination from './Destination.jsx';
import StationName from './StationName.jsx';
import Status from './Status.jsx';
import TrackNumber from './TrackNumber.jsx';


class ScheduleRow extends React.Component {
  render() {
    const prediction = this.props.pred;
    const {
      departure_time,
      status,
      track, // TODO - Make sure we're getting track on attributes
    } = prediction.attributes;

    const stationId = prediction.relationships.stop.data.id;
    return (
      <tr>
        <StationName stationId={stationId} stationIdsToNames={this.props.stationIdsToNames} />
        <DepartureTime  departureTime={departure_time}/>
        <Destination />
        <TrackNumber track={track} />
        <Status status={status} />
      </tr>
    );
  }
}

export default ScheduleRow;
