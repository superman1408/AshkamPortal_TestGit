import React, { useState } from 'react';
import './Style.css'; // Import CSS file for styling

const Evolve = () => {
  const [entries, setEntries] = useState([]);
  const [projectCode, setProjectCode] = useState('');
  const [activityCode, setActivityCode] = useState('');
  const [date, setDate] = useState('');
  const [netTime, setNetTime] = useState('');
  const [overTime, setOverTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      projectCode,
      activityCode,
      date,
      netTime: parseFloat(netTime),
      overTime: parseFloat(overTime),
    };
    if (validateEntry(newEntry)) {
      setEntries([...entries, newEntry]);
      clearForm();
    } else {
      alert('Invalid entry! Please check your input values and try again. Selected Date must not fall under "SUNDAY" & 2nd-4th "SATURDAY".');
    }
  };

  const validateEntry = (newEntry) => {
    const today = new Date(date);
    const currentDay = today.getDay();
    if (currentDay === 0 || (currentDay === 6 && isSecondOrFourthSaturday(today))) {
      return false;
    }

    const daysUntilNextMonday = 1 - currentDay;
    const mondayOfCurrentWeek = new Date(today);
    mondayOfCurrentWeek.setDate(today.getDate() + daysUntilNextMonday);

    const startOfWeek = new Date(mondayOfCurrentWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5);

    const entriesForCurrentWeek = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfWeek && entryDate <= endOfWeek;
    });

    const totalNetTime = entriesForCurrentWeek.reduce((total, entry) => total + entry.netTime, 0);

    return totalNetTime + newEntry.netTime <= 48;
  };

  const isSecondOrFourthSaturday = (date) => {
    const dayOfMonth = date.getDate();
    const weekOfMonth = Math.floor((dayOfMonth - 1) / 7) + 1;
    return weekOfMonth === 2 || weekOfMonth === 4;
  };

  const clearForm = () => {
    setProjectCode('');
    setActivityCode('');
    setDate('');
    setNetTime('');
    setOverTime('');
  };

  return (
    <div className="time-sheet-container">
      <h1>Time Sheet</h1>
      <form onSubmit={handleSubmit} className="time-sheet-form">
        <div className="form-group">
          <label htmlFor="projectCode">Project Code:</label>
          <input type="text" id="projectCode" value={projectCode} onChange={(e) => setProjectCode(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="activityCode">Activity Code:</label>
          <input type="text" id="activityCode" value={activityCode} onChange={(e) => setActivityCode(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="netTime">Net Time (hrs):</label>
          <input type="number" id="netTime" value={netTime} onChange={(e) => setNetTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="overTime">Over Time (hrs):</label>
          <input type="number" id="overTime" value={overTime} onChange={(e) => setOverTime(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <hr />
      <h2>Time Sheet Entries</h2>
      <table className="time-sheet-table">
        <thead>
          <tr>
            <th>Project Code</th>
            <th>Activity Code</th>
            <th>Date</th>
            <th>Net Time (hrs)</th>
            <th>Over Time (hrs)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.projectCode}</td>
              <td>{entry.activityCode}</td>
              <td>{entry.date}</td>
              <td>{entry.netTime}</td>
              <td>{entry.overTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Evolve;
