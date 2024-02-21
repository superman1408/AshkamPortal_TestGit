import React, { useState } from "react";

const TimeTrial = () => {
  const [entries, setEntries] = useState([]);
  const [projectCode, setProjectCode] = useState("");
  const [activityCode, setActivityCode] = useState("");
  const [date, setDate] = useState("");
  const [netTime, setNetTime] = useState("");
  const [overTime, setOverTime] = useState("");

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
      alert("Net time cannot exceed 48 hours in a week!");
    }
  };

  // const validateEntry = (newEntry) => {
  //   const totalNetTime = entries.reduce((total, entry) => total + entry.netTime, 0);
  //   return totalNetTime + newEntry.netTime <= 48;
  // };

  // const validateEntry = (newEntry) => {
  //   const today = new Date(date);
  //   const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  //   const daysUntilNextMonday = 1 - currentDay; // Positive if today is Monday, negative otherwise
  //   const mondayOfCurrentWeek = new Date(today);
  //   mondayOfCurrentWeek.setDate(today.getDate() + daysUntilNextMonday);

  //   // Calculate start and end dates for the current week (Monday to Saturday)
  //   const startOfWeek = new Date(mondayOfCurrentWeek);
  //   const endOfWeek = new Date(startOfWeek);
  //   endOfWeek.setDate(startOfWeek.getDate() + 5); // Saturday

  //   // Filter entries for the current week
  //   const entriesForCurrentWeek = entries.filter(entry => {
  //     const entryDate = new Date(entry.date);
  //     return entryDate >= startOfWeek && entryDate <= endOfWeek;
  //   });

  //   // Calculate total net time for the current week
  //   const totalNetTime = entriesForCurrentWeek.reduce((total, entry) => total + entry.netTime, 0);

  //   return totalNetTime + newEntry.netTime <= 48;
  // };

  const validateEntry = (newEntry) => {
    const today = new Date(date);
    const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    // Check if entry is on Sunday
    if (currentDay === 0) {
      alert("Entry on Sunday is invalid.");
      return false;
    }

    // Check if entry is on second or fourth Saturday
    if (currentDay === 6) {
      const dayOfMonth = today.getDate();
      const weekOfMonth = Math.floor((dayOfMonth - 1) / 7) + 1;
      if (weekOfMonth === 2 || weekOfMonth === 4) {
        alert("Entry on second or fourth Saturday is invalid.");
        return false;
      }
    }

    const daysUntilNextMonday = 1 - currentDay; // Positive if today is Monday, negative otherwise
    const mondayOfCurrentWeek = new Date(today);
    mondayOfCurrentWeek.setDate(today.getDate() + daysUntilNextMonday);

    // Calculate start and end dates for the current week (Monday to Saturday)
    const startOfWeek = new Date(mondayOfCurrentWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5); // Saturday

    // Filter entries for the current week
    const entriesForCurrentWeek = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfWeek && entryDate <= endOfWeek;
    });

    // Calculate total net time for the current week
    const totalNetTime = entriesForCurrentWeek.reduce(
      (total, entry) => total + entry.netTime,
      0
    );

    // Validate total net time for the week
    if (totalNetTime + newEntry.netTime > 48) {
      alert("Net time cannot exceed 48 hours in a week!");
      return false;
    }

    return true;
  };

  const clearForm = () => {
    setProjectCode("");
    setActivityCode("");
    setDate("");
    setNetTime("");
    setOverTime("");
  };

  return (
    <div>
      <h1>Time Sheet</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Project Code:
          <input
            type="text"
            value={projectCode}
            onChange={(e) => setProjectCode(e.target.value)}
          />
        </label>
        <br />
        <label>
          Activity Code:
          <input
            type="text"
            value={activityCode}
            onChange={(e) => setActivityCode(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Net Time (hrs):
          <input
            type="number"
            value={netTime}
            onChange={(e) => setNetTime(e.target.value)}
          />
        </label>
        <br />
        <label>
          Over Time (hrs):
          <input
            type="number"
            value={overTime}
            onChange={(e) => setOverTime(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <h2>Time Sheet Entries</h2>
      <table>
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

export default TimeTrial;
