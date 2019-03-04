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
      track,
    } = prediction.attributes;

    const stationId = prediction.relationships.stop.data.id;
    const routeId = prediction.relationships.route.data.id;

    return (
      <tr>
        <StationName stationId={stationId} stationIdsToNames={this.props.stationIdsToNames} />
        <DepartureTime departureTime={departure_time} />
        <Destination routeId={routeId} routeDestinations={this.props.routeDestinations} />
        <TrackNumber track={track} />
        <Status status={status} />
      </tr>
    );
  }
}

export default ScheduleRow;
