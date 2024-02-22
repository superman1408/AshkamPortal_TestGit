import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { Grid, CircularProgress, Box } from "@mui/material";


import { fetchPost } from '../../../api';
import { getPost } from '../../../action/posts';

const TimeSheetTable = ({ currentId, posts }) => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  // Fetch the entries for this timesheet when the component mounts.
  useEffect(() => {
    dispatch(getPost(id))
    .then((res) => {
        console.log("TimeSheetTable: got data");
        
        // setEntries((prevEntries) => ([...prevEntries, res]));
        setEntries(() => {
          posts.map((post) => {
            if (post._id === currentId) {
              // console.log(post)
              return setEntries([...entries, post]);
            }
          })
        });
        
        setIsLoading(false);
    })
  }, [dispatch, currentId, isLoading]);





  const editEntry = (index) => {};
  const deleteEntry = (index) => {};


  console.log(entries)



  return (
    <Grid sx={{ width: "100%" }}>
      <div>
        {
          isLoading ? (
            <Box sx={{ display: "flex", paddingLeft: "600px" }}>
              <CircularProgress />
            </Box>
          ) : (
            <table className="time-sheet-table">
          <thead>
            <tr>
              <th style={{ color: "#16355d" }}>Project Code</th>
              <th style={{ color: "#16355d" }}>Activity Code</th>
              <th style={{ color: "#16355d" }}>Date</th>
              <th style={{ color: "#16355d" }}>Net Time (hrs)</th>
              <th style={{ color: "#16355d" }}>Over Time (hrs)</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td style={{ color: "#e55d17" }}>{entry.projectCode}</td>
                <td style={{ color: "#e55d17" }}>{entry.activityCode}</td>
                <td style={{ color: "#e55d17" }}>{entry.date}</td>
                <td style={{ color: "#e55d17" }}>{entry.netTime}</td>
                <td style={{ color: "#e55d17" }}>{entry.overTime}</td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <button onClick={() => editEntry(index)}>Edit</button>
                  <button onClick={() => deleteEntry(index)}>Delete</button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
          )
        }
        {/* <h2 style={{ color: "#16355d" }}>Time Sheet Entries</h2> */}
        
      </div>
  </Grid>
  )
}

export default TimeSheetTable;
