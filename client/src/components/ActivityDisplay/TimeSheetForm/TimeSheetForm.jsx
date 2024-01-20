import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { todoList } from "../../../api";
import { Card, Divider } from "@mui/material";

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
      <h3 style={{ textAlign: "center" }}>Time Sheet</h3>
      <Divider
        sx={{
          borderWidth: "7px",
        }}
      />
      <Card
        elevation={5}
        sx={{ margin: "20px", height: "auto", padding: "15px", width: "auto" }}
      >
        <form onSubmit={handleSubmit}>
          {/* <label>
          Employee ID:
          <input type="text" name="employeeId" value={formData.employeeId} onChange={handleInputChange} />
        </label> */}
     
            <label style={{ fontWeight: "bold" }}>
              Job Code:
              <input
                type="text"
                name="jobCode"
                value={formData.jobCode}
                onChange={handleInputChange}
                style={{ marginLeft: "5px" }}
              />
            </label>
            <label style={{ marginLeft: "15px", fontWeight: "bold" }}>
              Start Date:
              <input
                type="date"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                style={{ marginLeft: "5px" }}
              />
            </label>
            <label style={{ marginLeft: "15px", fontWeight: "bold" }}>
              Hours Worked:
              <input
                type="number"
                name="hoursWorked"
                value={formData.hoursWorked}
                onChange={handleInputChange}
                style={{ marginLeft: "5px" }}
              />
            </label>
            <label style={{ marginLeft: "15px", fontWeight: "bold" }}>
              End Date:
              <input
                type="date"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                style={{ marginLeft: "5px" }}
              />
            </label>
     
          <button style={{ float: "right" }} type="submit">
            Add Job
          </button>
        </form>{" "}
      </Card>
    </div>
  );
};

export default TimeSheetForm;
