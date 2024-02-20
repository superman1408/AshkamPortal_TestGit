import React, { useState, useEffect } from "react";

const ProjectCodePopUp = ({ setProjectCode, setProjectOpen }) => {
  const [officeCode, setOfficeCode] = useState();
  const [year, setYear] = useState();
  const [serialNo, setserialNo] = useState();
  
  const [monthNumber, setMonthNumber] = useState();
  const [month, setMonth] = useState();

  const maxOffset = 10;
  const thisYear = new Date().getFullYear();
  const allYears = [];
  for (let x = 0; x <= maxOffset; x++) {
    allYears.push(thisYear - x);
  }

  const yearList = allYears.map((x) => {
    return <option key={x}>{x}</option>;
  });

  const SerialNo = [];
  for (let i = 1; i <= 300; i++) {
    SerialNo.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const appendData = () => {
    const updatedList = officeCode + year + monthNumber + serialNo; // Combine officeCode and year
    setProjectCode(updatedList);
    console.log(updatedList);
    setProjectOpen(false);
  };

  const closetoggle = () => {
    setProjectOpen(false);
  };

  const handleMonthChange = (event) => {
    const selectedMonthName = event.target.value;
    const selectedMonthNumber = getMonthNumber(selectedMonthName); // Convert month name to month number
    setMonth(selectedMonthName); // Update month state with the month number
    setMonthNumber(selectedMonthNumber);
    console.log(selectedMonthNumber);
  };

  // Function to convert month name to its number
  const getMonthNumber = (monthName) => {
    const months = {
      select: "00",
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };
    return months[monthName];
  };

  useEffect(() => {
    console.log(month);
  }, [month]);

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Project Code</h5>
            <button type="button" className="close" onClick={closetoggle}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              {/*_______________Office Code____________________  */}

              <label>Office Code</label>
              <select
                style={{
                  width: "200px",
                  height: "30px",
                  fontSize: "16px",
                  marginTop: "10px",
                }}
                name="Office Code"
                value={officeCode}
                onChange={(e) => setOfficeCode(e.target.value)}
              >
                <option value="select">Select</option>
                <option value="01">01</option>
                <option value="02">02</option>
              </select>
            </div>
            {/*_______________Year____________________  */}
            <div>
              <label
                style={{
                  marginTop: "20px",
                }}
              >
                Year
              </label>
              <div>
                <select
                  style={{
                    width: "200px",
                    height: "30px",
                    fontSize: "16px",
                    marginTop: "10px",
                  }}
                  name="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="select">Select</option>
                  {yearList}
                </select>
              </div>
            </div>
            {/*_______________Month____________________  */}
            <div>
              <label
                style={{
                  marginTop: "20px",
                }}
              >
                Month
              </label>
              <div>
                <select
                  style={{
                    width: "200px",
                    height: "30px",
                    fontSize: "16px",
                    marginTop: "10px",
                  }}
                  name="Month"
                  value={month}
                  onChange={handleMonthChange}
                >
                  <option value="select">Select</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
            </div>
            {/*_______________Serial Number____________________  */}
            <div>
              <label
                style={{
                  marginTop: "20px",
                }}
              >
                Serial Number
              </label>
              <div>
                <select
                  style={{
                    width: "200px",
                    height: "30px",
                    fontSize: "16px",
                    marginTop: "10px",
                  }}
                  name="Month"
                  value={serialNo}
                  onChange={(e) => setserialNo(e.target.value)}
                >
                  <option value="select">Select</option>
                  {SerialNo}
                </select>
              </div>
            </div>{" "}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={appendData}
            >
              Save
            </button>
            {/* Add additional buttons or actions if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCodePopUp;
