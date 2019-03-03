import React from 'react';

import ScheduleRow from './ScheduleRow.jsx';


class DeparturesTable extends React.Component {
  constructor(props) {
    super(props);

    // TODO - Set API_KEY as Env. Var.

    this.state = {
      predictions: [],
    };

    this.eventSourceOnMessage = this.eventSourceOnMessage.bind(this);
    this.eventSourceOnError = this.eventSourceOnError.bind(this);
    this.eventSourceOnOpen = this.eventSourceOnOpen.bind(this);

    this.resetEvent = this.resetEvent.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);

    this._setupEventSource();
  }

  _setupEventSource() {
    const baseUrl = 'https://api-v3.mbta.com/';
    const apiKey = process.env.REACT_APP_MBTA_KEY;

    // TODO - Use url parsing in JS
    // TODO - Set these up to be props and/or configurable

    const mbtaEventSourceUrl = `${baseUrl}predictions/?api_key=${apiKey}&filter[stop]=place-north,place-sstat&filter[route_type]=2&filter[direction_id]=0&sort=departure_time&include=schedule,trip.direction_id,route.type`;

    const evtSource = new EventSource(mbtaEventSourceUrl);

    evtSource.onmessage = this.eventSourceOnMessage;
    evtSource.onerror = this.eventSourceOnError;
    evtSource.onopen = this.eventSourceOnOpen;

    evtSource.addEventListener('reset', this.resetEvent, false);
    evtSource.addEventListener('add', this.addEvent, false);
    evtSource.addEventListener('update', this.updateEvent, false);
    evtSource.addEventListener('remove', this.removeEvent, false);
  }

  eventSourceOnMessage(evt) {
    console.log('onmessage');
    console.log(evt);
  }

  eventSourceOnError(evt) {
    console.log('onerror');
    console.log(evt);
  }

  eventSourceOnOpen(evt) {
    console.log('onopen');
    console.log(evt);
  }

  resetEvent(evt) {
    const data = JSON.parse(evt.data);
    this.setState({
      predictions: data.filter(d => d.type === 'prediction'),
    });
  }

  addEvent(evt) {
    console.log('addEvent !!');
    console.log(evt);
  }

  updateEvent(evt) {
    console.log('updateEvent !!');
    console.log(evt);
  }

  removeEvent(evt) {
    console.log('removeEvent !!');
    console.log(evt);
  }

  render() {

    // TODO - Style this

    return (
      <table cellPadding="10">
        <thead>
          <tr>
            <th>Station</th>
            <th>Time</th>
            <th>Destination</th>
            <th>Track</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.predictions.map((pred, idx) => <ScheduleRow key={idx} pred={pred} />)
          }
        </tbody>
      </table>
    );
  }
}

export default DeparturesTable;
