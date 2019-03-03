import React from 'react';

import ScheduleRow from './ScheduleRow.jsx';


class DeparturesTable extends React.Component {
  constructor(props) {
    super(props);

    // TODO - Set API_KEY as Env. Var.

    this.state = {
      predictions: [],
    };
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
            this.state.predictions.map((pred, idx) => <ScheduleRow key={idx} />)
          }
        </tbody>
      </table>
    );
  }
}

export default DeparturesTable;
