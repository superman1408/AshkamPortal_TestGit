import React, { useState } from 'react';




import TimeSheet from './TimeSheet/TimeSheet';
import TimeSheetForm from './TimeSheetForm/TimeSheetForm';

const ActivityDisplay = () => {
  const [ currentId, setCurrentId] = useState(null);
  return (
    // <div>ActivityDisplay</div>
    <div>
        <TimeSheetForm/>
        
        <TimeSheet/>
    </div>
  )
}

export default ActivityDisplay;