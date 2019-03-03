import React from 'react';


class Destination extends React.Component {
  render() {
    return (
      <td>
        {
          Object.keys(this.props.routeDestinations).length
            ?
            this.props.routeDestinations[this.props.routeId]
            :
            ''
        }
      </td>
    );
  }
}

export default Destination;
