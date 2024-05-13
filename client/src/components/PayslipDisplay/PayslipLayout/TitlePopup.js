import React, { useState, useEffect } from "react";

const TitlePopup = ({ setTitle, setTitleOpen }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const appendData = () => {
    const updatedTitle = month + "," + " " + year;
    setTitle(updatedTitle);
    setTitleOpen(false);
  };

  const closetoggle = () => {
    setTitleOpen(false);
  };

  const handleMonthChange = (event) => {
    const selectedMonthName = event.target.value;

    setMonth(selectedMonthName);
  };

  const maxOffset = 5;
  const thisYear = new Date().getFullYear();
  const allYears = [];
  for (let x = 0; x <= maxOffset; x++) {
    allYears.push(thisYear - x);
  }

  const yearList = allYears.map((x) => {
    return <option key={x}>{x}</option>;
  });

  useEffect(() => {}, [month]);

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
            <h5 className="modal-title">Select the boxes</h5>
            <button type="button" className="close" onClick={closetoggle}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={appendData}
            >
              Save
            </button>
          </div>{" "}
        </div>
        {/* Add additional buttons or actions if needed */}
      </div>
    </div>
  );
};

export default TitlePopup;
