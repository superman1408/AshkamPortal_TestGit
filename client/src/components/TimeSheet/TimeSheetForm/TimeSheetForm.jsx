import React, { useState } from 'react'

const TimeSheetForm = () => {
  const [formData, setFormData] = useState([]);



  const handleSubmit = () => {};
  const handleInputChange = () => {};
  return (
    <div>
      <h2>Time Sheet Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <input type="text" name="employeeId" value={formData.employeeId} onChange={handleInputChange} />
        </label>
        <label>
          Start Date:
          <input type="date" name="date" value={formData.start} onChange={handleInputChange} />
        </label>
        <label>
          Job Code:
          <input type="text" name="employeeId" value={formData.jobCode} onChange={handleInputChange} />
        </label>
        <label>
          Hours Worked:
          <input type="number" name="hoursWorked" value={formData.hoursWorked} onChange={handleInputChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="date" value={formData.end} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Time Sheet</button>
      </form>
    </div>
  )
}

export default TimeSheetForm
