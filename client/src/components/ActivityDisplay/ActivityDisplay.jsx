import React, { useEffect, useState } from 'react';




import TimeSheet from './TimeSheet/TimeSheet';
import { useParams } from 'react-router-dom';
// import TimeSheetForm from './TimeSheetForm/TimeSheetForm';

const ActivityDisplay = () => {
  const [ currentId, setCurrentId] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    setCurrentId(id);
  },[currentId, id]);




  return (
    // <div>ActivityDisplay</div>
    <div>
        {/* <TimeSheetForm/> */}
        
        <TimeSheet currentId={currentId}/>
    </div>
  )
}

export default ActivityDisplay;