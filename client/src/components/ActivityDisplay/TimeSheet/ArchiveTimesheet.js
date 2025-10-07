import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../action/posts";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";

const ArchiveTimesheet = () => {
  const posts = useSelector((state) => state.posts || []);

  const { id: currentId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const array = useMemo(() => {
    let temp = [];

    posts.forEach((post) => {
      if (post._id === currentId) {
        const length = post.projectCode?.length || 0;
        for (let i = 0; i < length; i++) {
          temp.push({
            projectCode: post.projectCode?.[i] || "",
            activityCode: post.activityCode?.[i] || "",
            date: post.date?.[i] || "",
            netTime: post.netTime?.[i] || "",
            overTime: post.overTime?.[i] || "",
            editIndex: post.editIndex?.[i] || "",
            remarks: post.remarks?.[i] || "",
          });
        }
      }
    });

    return temp;
  }, [posts, currentId]);

  return (
    // <div>ArchiveTimesheet</div>

    <Grid sx={{ backgroundColor: "white", borderRadius: "12px" }}>
      <table
        className="time-sheet-table"
        style={{
          padding: "10px",
          borderCollapse: "collapse",

          marginRight: "auto",
          borderRadius: "12px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "center",
                // width: "15%",
                color: "#16355d",
                fontFamily: "Roboto",
              }}
            >
              Date (yyyy-mm-dd)
            </th>
            <th
              style={{
                textAlign: "center",
                // width: "25%",
                color: "#16355d",
                fontFamily: "Roboto",
              }}
            >
              Project Code
            </th>
            <th
              style={{
                textAlign: "center",
                // width: "25%",
                color: "#16355d",
                fontFamily: "Roboto",
              }}
            >
              Activity Code
            </th>

            <th
              style={{
                textAlign: "center",
                width: "10%",
                color: "#16355d",
                fontFamily: "Roboto",
              }}
            >
              Net Time (hrs)
            </th>
            <th
              style={{
                textAlign: "center",
                width: "10%",
                color: "#16355d",
                fontFamily: "Roboto",
              }}
            >
              Over Time (hrs)
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Here added fileterd array to display according to month & added conditional statement if there is no data */}
          {array.map((data, index) => (
            <tr key={index}>
              <td
                style={{
                  color: "#e55d17",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {data.date}
              </td>
              <td
                style={{
                  color: "#e55d17",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {data.projectCode}
              </td>
              <td
                style={{
                  color: "#e55d17",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {data.activityCode}
              </td>
              <td
                style={{
                  color: "#e55d17",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {data.netTime}
              </td>
              <td
                style={{
                  color: "#e55d17",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {data.overTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Grid>
  );
};

export default ArchiveTimesheet;
