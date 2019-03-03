import React from 'react';

import CurrentDate from './CurrentDate.jsx';
import CurrentTime from './CurrentTime.jsx';
import DayOfWeek from './DayOfWeek.jsx';
import BoardHeader from './BoardHeader.jsx';


class ScheduleBoard extends React.Component {
  render() {
    // TODO - Style this
    return (
      <div>
        <BoardHeader />
        <DayOfWeek />
        <CurrentDate />
        <CurrentTime />
      </div>
    );
  }
}

export default ScheduleBoard;
