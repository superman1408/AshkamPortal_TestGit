import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import './Style.css'; // Import CSS file for styling
import { todoList } from '../../../api';


const Evolve = ({ currentId }) => {
  const dispatch = useDispatch();
  const [entries, setEntries] = useState([]);
  const [projectCode, setProjectCode] = useState('');
  const [activityCode, setActivityCode] = useState('');
  const [date, setDate] = useState('');
  const [netTime, setNetTime] = useState('');
  const [overTime, setOverTime] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      projectCode,
      activityCode,
      date,
      netTime: parseFloat(netTime),
      overTime: parseFloat(overTime),
    };
    if (validateEntry(newEntry)) {
      if (editIndex !== -1) {
        const updatedEntries = [ ...entries];
        updatedEntries[editIndex] = newEntry;
        setEntries(updatedEntries);
        await dispatch(
          todoList(entries, currentId)
        )
        setEditIndex(-1); // Reset edit index
      }
      else {
        setEntries([...entries, newEntry]);
        await dispatch(
          todoList(entries, currentId)
        )
      }
      clearForm();
    } 
    else {
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




  const editEntry = (index) => {
    const entryToEdit = entries[index];
    setProjectCode(entryToEdit.projectCode);
    setActivityCode(entryToEdit.activityCode);
    setDate(entryToEdit.date);
    setNetTime(entryToEdit.netTime.toString());
    setOverTime(entryToEdit.overTime.toString());
    setEditIndex(index);
  };


  const clearForm = () => {
    setProjectCode('');
    setActivityCode('');
    setDate('');
    setNetTime('');
    setOverTime('');
    setEditIndex(-1)
  };


  const deleteEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };



  return (
    <div className="time-sheet-container">
      <h1 style={{color: '#16355d'}}>Time Sheet</h1>
      <form onSubmit={handleSubmit} className="time-sheet-form">
        <div className="form-group">
          <label style={{color: '#16355d'}} htmlFor="projectCode">Project Code:</label>
          <input type="text" id="projectCode" value={projectCode} onChange={(e) => setProjectCode(e.target.value)} />
        </div>
        <div className="form-group">
          <label style={{color: '#16355d'}} htmlFor="activityCode">Activity Code:</label>
          <input type="text" id="activityCode" value={activityCode} onChange={(e) => setActivityCode(e.target.value)} />
        </div>
        <div className="form-group">
          <label style={{color: '#16355d'}} htmlFor="date">Date:</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label style={{color: '#16355d'}} htmlFor="netTime">Net Time (hrs):</label>
          <input type="number" id="netTime" value={netTime} onChange={(e) => setNetTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label style={{color: '#16355d'}} htmlFor="overTime">Over Time (hrs):</label>
          <input type="number" id="overTime" value={overTime} onChange={(e) => setOverTime(e.target.value)} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <button type="submit">{editIndex !== -1 ? 'Update' : 'Submit'}</button>
          <button type="button" onClick={clearForm}>Clear</button>
        </div>
        
      </form>
      <hr />
      <h2 style={{color: '#16355d'}}>Time Sheet Entries</h2>
      <table className="time-sheet-table">
        <thead>
          <tr>
            <th style={{color: '#16355d'}}>Project Code</th>
            <th style={{color: '#16355d'}}>Activity Code</th>
            <th style={{color: '#16355d'}}>Date</th>
            <th style={{color: '#16355d'}}>Net Time (hrs)</th>
            <th style={{color: '#16355d'}}>Over Time (hrs)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td style={{color: '#e55d17'}}>{entry.projectCode}</td>
              <td style={{color: '#e55d17'}}>{entry.activityCode}</td>
              <td style={{color: '#e55d17'}}>{entry.date}</td>
              <td style={{color: '#e55d17'}}>{entry.netTime}</td>
              <td style={{color: '#e55d17'}}>{entry.overTime}</td>
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <button onClick={() => editEntry(index)}>Edit</button>
                <button onClick={() => deleteEntry(index)}>Delete</button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Evolve;
