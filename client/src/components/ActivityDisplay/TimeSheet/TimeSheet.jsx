import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TimeSheetForm from '../TimeSheetForm/TimeSheetForm';

const time = [{employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}, {employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}, {employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}, {employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}];

const TimeSheet = ({currentId}) => {
  // console.log(currentId);
  const  timeSheets  = useSelector((state) => state.posts);

  console.log(timeSheets);
  return (
    <div>
      <TimeSheetForm currentId={currentId}/>
      <br/>
      <h2>Time Sheet List</h2>
      <ul>
        {time.map(sheet => (
          <li>
            Employee ID : {sheet.employeeId} -- Job Code : {sheet.jobCode} -- Start Date : {sheet.start} -- Hours Of Work : {sheet.hoursWorked} hours -- End Date : {sheet.end}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TimeSheet;


