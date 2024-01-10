import React from 'react';



const timeSheets = [{employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}, {employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}, {employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}, {employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}];

const TimeSheet = () => {
  return (
    <div>
      <h2>Time Sheet List</h2>
      <ul>
        {timeSheets.map(sheet => (
          <li key={sheet._id}>
            Employee ID : {sheet.employeeId} -- Job Code : {sheet.jobCode} -- Start Date : {sheet.start} -- Hours Of Work : {sheet.hoursWorked} hours -- End Date : {sheet.end}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TimeSheet;
