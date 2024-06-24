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
    CL: "",
    SL: "",
    PL: "",
    FL: "",
    Coff: "",
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
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      {" "}
      {verify() === true && (
        <Card sx={{ padding: "12px" }}>
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
                  <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                    C-off
                  </th>
                </tr>
              )}
            </thead>

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
                      setLeaveBalances({
                        ...leaveBalances,
                        Coff: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>{" "}
          {verify() === true && (
            <button
              onClick={handleSubmit}
              style={{ float: "right", marginTop: "50px" }}
            >
              Submit
            </button>
          )}
        </Card>
      )}
      <Card sx={{ padding: "20px", marginTop: "25px" }}>
        <Typography
          variant="h6"
          sx={{
            margin: "5px",
            color: "#16355d",
            fontFamily: "Roboto",
          }}
        >
          Leave Overview
        </Typography>
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
              labels: [
                "Casual Leave",
                "Sick Leave",
                "Priviledge Leave",
                "Floating Leave",
                "Comp off",
              ],
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
    </div>
  );
};

export default LeaveTable;
