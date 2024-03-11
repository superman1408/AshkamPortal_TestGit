import React from "react";
import Excel from 'exceljs';

const EmployeeAttendance = () => {

    const handleChange = (e) => {
      const file = e.target.files[0];
      const wb = new Excel.Workbook();
      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onload = () => {
          const buffer = reader.result;
          wb.xlsx.load(buffer).then((workbook) => {
              console.log(workbook, 'workbook instance');
              workbook.eachSheet((sheet, id) => {
                  sheet.eachRow((row, rowIndex) => {
                      console.log(row.values, rowIndex);
                  });
              });
          });
      };
  };

  return (
    <div className="card">
      <div>Upload Excel File</div>
      <input type='file' onChange={(e) => handleChange(e)} />
    </div>
  );
};

export default EmployeeAttendance;
