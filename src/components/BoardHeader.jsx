import React from 'react';


class BoardHeader extends React.Component {
  // Making this a component in case we'd like to make the stations configurable
  render() {
    return (
      <h1>
        MBTA North/South Station Departures
      </h1>
    );
  }
}

export default BoardHeader;
