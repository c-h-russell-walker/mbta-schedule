import React from 'react';


class BoardHeader extends React.Component {
  // Making this a component in case we'd like to make the stations configurable
  render() {
    return (
      <h1 style={{ fontSize: '1em', }}>
        MBTA North/South Station Departures
      </h1>
    );
  }
}

export default BoardHeader;
