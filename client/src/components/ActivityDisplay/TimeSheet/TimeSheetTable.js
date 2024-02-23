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



  useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
    // return () => clearTimeout(loadingTimeout);
  }, [isLoading]);

  // Fetch the entries for this timesheet when the component mounts.
  // useEffect(() => {
  //   dispatch(getPost(id))
  //   .then((res) => {
  //       console.log("TimeSheetTable: got data");
        
  //       // setEntries((prevEntries) => ([...prevEntries, res]));
  //       setEntries(() => {
  //         let array = [];
  //         // eslint-disable-next-line array-callback-return
  //         posts.map((post) => {
  //           if (post._id === currentId) {
  //             for (let index = 0; index < post.projectCode.length; index++) {
  //               console.log(post.projectCode)
  //               const element = array.push({
  //                 projectCode: post.projectCode[index],
  //                 activityCode: post.activityCode[index],
  //                 date: post.date[index],
  //                 endTime: post.netTime[index],
  //                 overTime: post.overTime[index],
  //               });
  //               console.log(element)
  //               return setEntries([...entries, element]);
  //             }
  //             console.log(entries)
  //           }
  //           console.log("nice work")
  //         })
  //       });
        
  //       setIsLoading(false);
  //   })
  // }, [dispatch, currentId, isLoading,entries]);





  const editEntry = (index) => {};
  const deleteEntry = (index) => {};


  const array = [];
  // eslint-disable-next-line array-callback-return
  posts.map((post) => {
    for (let i = 0; i < post.projectCode.length; i++) {
      if (post._id === currentId) {
          array.push({
          projectCode: post.projectCode[i],
          activityCode: post.activityCode[i],
          date: post.date[i],
          netTime: post.netTime[i],
          overTime: post.overTime[i],
        });
      }
    }
  })
  


  console.log(array);



  return (
    <Grid sx={{ width: "100%" }}>
      <div>
        {
          isLoading ? (
            <Box sx={{ display: "flex", paddingLeft: "100px" }}>
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
            {array.map((post, index) => (
              <tr key={index}>
                <td style={{ color: "#e55d17" }}>{post.projectCode}</td>
                <td style={{ color: "#e55d17" }}>{post.activityCode}</td>
                <td style={{ color: "#e55d17" }}>{post.date}</td>
                <td style={{ color: "#e55d17" }}>{post.netTime}</td>
                <td style={{ color: "#e55d17" }}>{post.overTime}</td>
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
