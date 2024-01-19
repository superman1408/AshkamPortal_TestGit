import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { todoList } from "../../../api";

const TimeSheetForm = ({ currentId }) => {
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    jobCode: "",
    hoursWorked: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();
    console.log(formData);
    console.log(currentId);
    if (currentId) {
      await dispatch(
        todoList(formData, currentId).then(alert("Send to Data base"))
      );
      navigate("/home");
    } else {
      console.log("Error is inevitable");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Time Sheet Form</h2>
      <form onSubmit={handleSubmit}>
        {/* <label>
          Employee ID:
          <input type="text" name="employeeId" value={formData.employeeId} onChange={handleInputChange} />
        </label> */}
        <label>
          Job Code:
          <input
            type="text"
            name="jobCode"
            value={formData.jobCode}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Hours Worked:
          <input
            type="number"
            name="hoursWorked"
            value={formData.hoursWorked}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Time Sheet</button>
      </form>
    </div>
  );
};

export default TimeSheetForm;
