import React, { useState } from 'react';
import * as XLSX from 'xlsx';
// import ExcelReader from './ExcelReader3';

const ExcelReader= () => {
  const [attendanceData, setAttendanceData] = useState([]);

  const readExcel = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    readExcel(file)
      .then((data) => {
        setAttendanceData(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((row, index) => (
            <tr key={index}>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExcelReader;
