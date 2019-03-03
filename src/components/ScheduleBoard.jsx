import React from 'react';

import BoardHeader from './BoardHeader.jsx';
import CurrentDate from './CurrentDate.jsx';
import CurrentTime from './CurrentTime.jsx';
import DayOfWeek from './DayOfWeek.jsx';
import DeparturesTable from './DeparturesTable.jsx';


class ScheduleBoard extends React.Component {
  render() {
    // TODO - Style this
    return (
      <div>
        <BoardHeader />
        <DayOfWeek />
        <CurrentDate />
        <CurrentTime />
        <DeparturesTable />
      </div>
    );
  }
}

export default ScheduleBoard;
