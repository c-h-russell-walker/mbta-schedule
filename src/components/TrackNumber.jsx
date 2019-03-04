import React from 'react';


class TrackNumber extends React.Component {
  render() {
    return <td>{this.props.track || 'TBD'}</td>;
  }
}

export default TrackNumber;
