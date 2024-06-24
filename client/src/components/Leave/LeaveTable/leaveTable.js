import React, { useState, useEffect } from "react";
import { Card, Container, Typography } from "@mui/material";
import { useDispatch} from "react-redux";
import { leaveList } from "../../../action/posts";
import { CChart } from "@coreui/react-chartjs";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement, // Import ArcElement for Pie chart
} from "chart.js";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const LeaveTable = ({ posts, currentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  // Find the current post based on currentId
  const currentPost = posts.find((post) => post._id === currentId);
  const initialLeaveBalances = {
    CL: 0,
    SL: 0,
    PL: 0,
    FL: 0,
    Coff: 0,
  };

  const [leaveBalances, setLeaveBalances] = useState(initialLeaveBalances);


  const verify = () => {
    try {
      if (
        (user.result.department.toLowerCase() === "human resource" &&
          user.result.role === "manager") ||
        user.result.role === "admin"
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    currentId && setLeaveBalances(initialLeaveBalances);
  }, [currentId]);


  const reloadPage = () => {
    window.location.reload();
  };




  const handleSubmit = async () => {
    await dispatch(leaveList(leaveBalances, currentId)).then(() => {
      alert("Leave Status is uploaded...!!!");
    });
    reloadPage();
  };






  return (
    <Card
      sx={{
        padding: "16px",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          margin: "5px",
          color: "#16355d",
          fontFamily: "Roboto",
        }}
      >
        Leave Balance
      </Typography>
      <table>
        <thead>
          {verify() === true && (
            <tr>
              <th
                style={{
                  color: "#16355d",
                  fontFamily: "Roboto",
                  fontSize: "15px",
                }}
              >
                Casual Leave
              </th>
              <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                Sick Leave
              </th>
              <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                Privilege Leave
              </th>
              <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                Floating Leave
              </th>
              <th style={{ color: "#16355d", fontFamily: "Roboto" }}>C-off</th>
            </tr>
          )}
        </thead>

        {verify() === true && (
          <tbody>
            <tr>
              <td>
                <input
                  style={{ width: "50px" }}
                  type="text"
                  id="CL"
                  value={leaveBalances.CL}
                  onChange={(e) =>
                    setLeaveBalances({ ...leaveBalances, CL: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  style={{ width: "50px" }}
                  type="text"
                  id="SL"
                  value={leaveBalances.SL}
                  onChange={(e) =>
                    setLeaveBalances({ ...leaveBalances, SL: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  style={{ width: "50px" }}
                  type="text"
                  id="PL"
                  value={leaveBalances.PL}
                  onChange={(e) =>
                    setLeaveBalances({ ...leaveBalances, PL: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  style={{ width: "50px" }}
                  type="text"
                  id="FL"
                  value={leaveBalances.FL}
                  onChange={(e) =>
                    setLeaveBalances({ ...leaveBalances, FL: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  style={{ width: "50px" }}
                  type="text"
                  id="Coff"
                  value={leaveBalances.Coff}
                  onChange={(e) =>
                    setLeaveBalances({ ...leaveBalances, Coff: e.target.value })
                  }
                />
              </td>
            </tr>
          </tbody>
        )}

        {/* {posts.map((post, index) =>
          post._id === currentId ? (
            <tr key={index}>
              <td
                style={{
                  fontFamily: "Roboto",
                  alignContent: "center",
                  fontWeight: "bold",
                }}
              >
                {post.CL}
              </td>
              <td
                style={{
                  fontFamily: "Roboto",
                  alignContent: "center",
                  fontWeight: "bold",
                }}
              >
                {post.SL}
              </td>
              <td
                style={{
                  fontFamily: "Roboto",
                  alignContent: "center",
                  fontWeight: "bold",
                }}
              >
                {post.PL}
              </td>
              <td
                style={{
                  fontFamily: "Roboto",
                  alignContent: "center",
                  fontWeight: "bold",
                }}
              >
                {post.FL}
              </td>
              <td
                style={{
                  fontFamily: "Roboto",
                  alignContent: "center",
                  fontWeight: "bold",
                }}
              >
                {post.Coff}
              </td>
            </tr>
          ) : null
        )} */}
      </table>
      {verify() === true && (
        <button onClick={handleSubmit} style={{ float: "right" }}>
          Submit
        </button>
      )}
      {/* <div
        style={{
          // display: "flex",
          // padding: "12px",
          // width: "200px",
          // alignItems: "center",
          // alignContent: "center",

          height: "50%",
          width: "50%",
        }}
      >
        <Doughnut data={pieData} options={pieOptions} />
      </div> */}
      <Container
        sx={{
          width: "300px",
          // height: "300px",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CChart
          type="doughnut"
          // width="100px"
          // height="100px"
          data={{
            labels: ["CL", "SL", "PL", "FL", "C off"],
            datasets: [
              {
                data: currentPost
                  ? [
                      currentPost.CL,
                      currentPost.SL,
                      currentPost.PL,
                      currentPost.FL,
                      currentPost.Coff,
                    ]
                  : [0, 0, 0, 0, 0],
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "--cui-body-color",
                },
                position: "right",
              },
            },
          }}
        />
      </Container>
    </Card>
  );
};

export default LeaveTable;
