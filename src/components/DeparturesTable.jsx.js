import React from 'react';

import ScheduleRow from './ScheduleRow.jsx';


class DeparturesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      predictions: [],
      stationIdsToNames: {},
      routeDestinations: {},
    };

    this.baseUrl = 'https://api-v3.mbta.com/';
    this.apiKey = process.env.REACT_APP_MBTA_KEY;

    this.eventSourceOnMessage = this.eventSourceOnMessage.bind(this);
    this.eventSourceOnError = this.eventSourceOnError.bind(this);
    this.eventSourceOnOpen = this.eventSourceOnOpen.bind(this);

    this.resetEvent = this.resetEvent.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);

    this._removePredById = this._removePredById.bind(this);
    this._getAndStoreStationName = this._getAndStoreStationName.bind(this);
    this._getAndStoreRouteDestination = this._getAndStoreRouteDestination.bind(this);

    this.evtSource = this._setupEventSource();
  }

  _removePredById(predId) {
    this.setState({
      predictions: this.state.predictions.filter(p => p.id !== predId),
    });
  }

  _setupEventSource() {
    // TODO - Use url parsing in JS
    // TODO - Set these up to be props and/or configurable

    const mbtaEventSourceUrl = `${this.baseUrl}predictions/?api_key=${this.apiKey}&filter[stop]=place-north,place-sstat&filter[route_type]=2&filter[direction_id]=0&sort=departure_time&include=schedule,trip.direction_id,route.type`;

    const evtSource = new EventSource(mbtaEventSourceUrl);

    evtSource.onmessage = this.eventSourceOnMessage;
    evtSource.onerror = this.eventSourceOnError;
    evtSource.onopen = this.eventSourceOnOpen;

    evtSource.addEventListener('reset', this.resetEvent, false);
    evtSource.addEventListener('add', this.addEvent, false);
    evtSource.addEventListener('update', this.updateEvent, false);
    evtSource.addEventListener('remove', this.removeEvent, false);

    return evtSource;
  }

  eventSourceOnMessage(evt) {
    console.log('onmessage');
    console.log(evt);
  }

  eventSourceOnError(evt) {
    console.log('onerror');
    console.log(evt);
    this.setState({
      predictions: [],
    }, () => {
      this.evtSource = this._setupEventSource();
    });
  }

  eventSourceOnOpen(evt) {
  }

  resetEvent(evt) {
    const data = JSON.parse(evt.data);
    const predictions = data.filter(d => d.type === 'prediction');
    this.setState({
      predictions: predictions,
    });

    // Get Station names from ids
    const relationships = predictions.map(pred => pred.relationships);
    const stationIds = new Set(relationships.map(rel => rel.stop.data.id));
    stationIds.forEach(stationId => {
      this._getAndStoreStationName(stationId);
    });

    // Get destinations from routes via their ids
    const routeIds = new Set(predictions.map(p => p.relationships.route.data.id));
    routeIds.forEach(routeId => {
      this._getAndStoreRouteDestination(routeId);
    });
  }

  _getAndStoreStationName(stationId) {
    fetch(`${this.baseUrl}stops/${stationId}`).then(resp => {
      return resp.json();
    }).then(jsonData => {
      let callSetState = false;
      const stationData = jsonData.data;
      const stationDataId = stationData.id;
      const stationIdsToNamesCopy = this.state.stationIdsToNames;
      if (!Object.keys(this.state.stationIdsToNames).includes(stationDataId)) {
        stationIdsToNamesCopy[stationDataId] = stationData.attributes.name;
        callSetState = true;
      }
      if (callSetState) {
        this.setState({
          stationIdsToNames: stationIdsToNamesCopy,
        });
      }
    });
  }

  _getAndStoreRouteDestination(routeId) {
    fetch(`${this.baseUrl}routes/${routeId}`).then(resp => {
      return resp.json();
    }).then(jsonData => {
      let callSetState = false;
      const routeData = jsonData.data;
      // TODO - Can we assume we can always use first value in array?
      const destination = routeData.attributes.direction_destinations[0];
      const routeDestinationsCopy = this.state.routeDestinations;
      if (!Object.keys(this.state.routeDestinations).includes(routeId)) {
        routeDestinationsCopy[routeId] = destination;
        callSetState = true;
      }
      if (callSetState) {
        this.setState({
          routeDestinations: routeDestinationsCopy,
        });
      }
    });
  }

  addEvent(evt) {
    const data = JSON.parse(evt.data)

    // TODO - Confirm assumption that we'll only add non "Departed" statuses
    if (data.type === 'prediction' && data.attributes.status !== 'Departed') {

      const currentRouteId = data.relationships.route.data.id;
      if (!Object.keys(this.state.routeDestinations).includes(currentRouteId)) {
        this._getAndStoreRouteDestination(currentRouteId);
      }

      const currentStationId = data.relationships.stop.data.id;
      if (!Object.keys(this.state.stationIdsToNames).includes(currentStationId)) {
        this._getAndStoreStationName(currentStationId);
      }

      // Default to putting prediction at the start of the list
      let insertionIndex = 0;
      this.state.predictions.forEach((pred, index) => {
        if (pred.attributes.departure_time < data.attributes.departure_time) {
          insertionIndex = index;
        }
      });
      this.setState({
        predictions: [
          ...this.state.predictions.slice(0, insertionIndex),
          data,
          ...this.state.predictions.slice(insertionIndex + 1, this.state.predictions.length),
        ],
      });
    }
  }

  updateEvent(evt) {
    console.log('updateEvent !!');
    console.log(evt);
  }

  removeEvent(evt) {
    const data = JSON.parse(evt.data)
    this._removePredById(data.id);
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
            this.state.predictions.map(
              (pred, idx) => {
                return (
                  <ScheduleRow
                    key={idx}
                    pred={pred}
                    stationIdsToNames={this.state.stationIdsToNames}
                    routeDestinations={this.state.routeDestinations}
                  />
                );
              }
            )
          }
        </tbody>
      </table>
    );
  }
}

export default DeparturesTable;
