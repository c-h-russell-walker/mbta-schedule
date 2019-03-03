import React from 'react';


class StationName extends React.Component {
  render() {
    return (
      <td>
        {
          Object.keys(this.props.stationIdsToNames).length
            ?
            this.props.stationIdsToNames[this.props.stationId]
            :
            ''
        }
      </td>
    );
  }
}

export default StationName;
