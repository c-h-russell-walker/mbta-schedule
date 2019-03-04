import React from 'react';

import BoardHeader from './BoardHeader.jsx';
import CurrentDate from './CurrentDate.jsx';
import CurrentTime from './CurrentTime.jsx';
import DayOfWeek from './DayOfWeek.jsx';
import DeparturesTable from './DeparturesTable.jsx';


class ScheduleBoard extends React.Component {
  render() {
    return (
      <div>
        <BoardHeader />
        <div>
          <DayOfWeek />
          <div style={{ float: 'right', marginRight: '1em', }}>
            Current Time
          </div>
        </div>
        <div style={{ clear: 'both', }}></div>
        <div>
          <CurrentDate />
          <CurrentTime />
        </div>
        <div style={{ clear: 'both', }}></div>
        <hr/>
        <DeparturesTable />
      </div>
    );
  }
}

export default ScheduleBoard;
