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
    // The values below are set up with defaults that came from poject requirements
    // However they've been set up so the values can be passed in to props to the
    // DeparturesTable component

    const COMMUTER_RAIL = 2;
    const DEPARTING_DIRECTION = 0;

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('api_key', this.apiKey);

    let stops;
    if (this.props.stops && this.props.stops.length) {
      stops = this.props.stops;
    } else {
      // Default to North and South Station
      stops = [
        'place-north',
        'place-sstat',
      ];
    }
    urlSearchParams.append('filter[stop]', stops.join());

    let routeType;
    // route_type can be zero
    if (typeof this.props.routeType === 'undefined') {
      routeType = COMMUTER_RAIL;
    } else {
      routeType = this.props.routeType;
    }
    urlSearchParams.append('filter[route_type]', routeType);

    let directionId;
    // direction_id can be zero
    if (typeof this.props.directionId === 'undefined') {
      directionId = DEPARTING_DIRECTION;
    } else {
      directionId = this.props.directionId;
    }
    urlSearchParams.append('filter[direction_id]', directionId);

    const sort = this.props.sortValue || 'departure_time';
    urlSearchParams.append('sort', sort);


    let includeValues;
    if (this.props.includeValues && this.props.includeValues.length) {
      includeValues = this.props.includeValues;
    } else {
      // Use defaults
      includeValues = [
        'schedule',
        'trip.direction_id',
        'route.type',
      ];
    }
    urlSearchParams.append('include', includeValues.join());

    const mbtaEventSourceUrl = `${this.baseUrl}predictions/?${urlSearchParams.toString()}`;

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
    const data = JSON.parse(evt.data);

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
    const data = JSON.parse(evt.data);
    let predictionsCopy = this.state.predictions.slice();
    const insertionIndex = this.state.predictions.findIndex(p => p.id === data.id);
    predictionsCopy.splice(insertionIndex, 1, data);
    this.setState({
      predictions: predictionsCopy,
    });
  }

  removeEvent(evt) {
    const data = JSON.parse(evt.data);
    this._removePredById(data.id);
  }

  render() {
    return (
      <table cellPadding='8'>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #FFF', }}>Station</th>
            <th style={{ borderBottom: '1px solid #FFF', }}>Time</th>
            <th style={{ borderBottom: '1px solid #FFF', }}>Destination</th>
            <th style={{ borderBottom: '1px solid #FFF', }}>Track</th>
            <th style={{ borderBottom: '1px solid #FFF', }}>Status</th>
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
