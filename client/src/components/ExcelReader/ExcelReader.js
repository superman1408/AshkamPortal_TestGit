import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelReader = () => {
  const [excelData, setExcelData] = useState(null);
  const [sortedColumn, setSortedColumn] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(data);
    };

    reader.readAsBinaryString(file);
  };

  const sortData = (columnIndex) => {
    const sortedData = [...excelData].sort((a, b) => {
      if (a[columnIndex] < b[columnIndex]) return -1;
      if (a[columnIndex] > b[columnIndex]) return 1;
      return 0;
    });
    setExcelData(sortedData);
    setSortedColumn(columnIndex);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {excelData && (
        <table>
          <thead>
            <tr>
              {excelData[0].map((header, index) => (
                <th key={index} onClick={() => sortData(index)} style={{ cursor: 'pointer' }}>
                  {header}
                  {sortedColumn === index && ' ▲'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelReader;
