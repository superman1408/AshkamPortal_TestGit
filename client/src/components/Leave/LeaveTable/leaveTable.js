import React, { useState, useEffect } from "react";
import { Card, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
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

  const headerCellStyle = {
    display: "table-cell",
    padding: "10px",
    color: "#16355d",
    fontFamily: "Roboto",
    fontSize: "15px",
    borderBottom: "1px solid #ccc",
  };

  const cellStyle = {
    display: "table-cell",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  };

  const inputStyle = {
    width: "50px",
  };

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
          <div style={{ display: "table", width: "100%", marginTop: "10px" }}>
            {verify() === true && (
              <div style={{ display: "table-row", fontWeight: "bold" }}>
                <div style={headerCellStyle}>Casual Leave</div>
                <div style={headerCellStyle}>Sick Leave</div>
                <div style={headerCellStyle}>Privilege Leave</div>
                <div style={headerCellStyle}>Floating Leave</div>
                <div style={headerCellStyle}>C-off</div>
              </div>
            )}
            <div style={{ display: "table-row" }}>
              <div style={cellStyle}>
                <input
                  style={inputStyle}
                  type="text"
                  id="CL"
                  value={leaveBalances.CL}
                  onChange={(e) =>
                    setLeaveBalances({ ...leaveBalances, CL: e.target.value })
                  }
                />
              </div>
              <div style={cellStyle}>
                <input
                  style={inputStyle}
                  type="text"
                  id="SL"
                  value={leaveBalances.SL}
                  onChange={(e) =>
                    setLeaveBalances({ ...leaveBalances, SL: e.target.value })
                  }
                />
              </div>
              <div style={cellStyle}>
                <input
                  style={inputStyle}
                  type="text"
                  id="PL"
                  value={leaveBalances.PL}
                  onChange={(e) =>
                    setLeaveBalances({ ...leaveBalances, PL: e.target.value })
                  }
                />
              </div>
              <div style={cellStyle}>
                <input
                  style={inputStyle}
                  type="text"
                  id="FL"
                  value={leaveBalances.FL}
                  onChange={(e) =>
                    setLeaveBalances({ ...leaveBalances, FL: e.target.value })
                  }
                />
              </div>
              <div style={cellStyle}>
                <input
                  style={inputStyle}
                  type="text"
                  id="Coff"
                  value={leaveBalances.Coff}
                  onChange={(e) =>
                    setLeaveBalances({ ...leaveBalances, Coff: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          {verify() === true && (
            <button
              onClick={handleSubmit}
              style={{ float: "right", marginTop: "20px" }}
            >
              Submit
            </button>
          )}
        </Card>
      )}
      <Card sx={{ padding: "5px", marginTop: "5px" }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            margin: "5px",
            color: "#16355d",
            fontFamily: "Roboto",
          }}
        >
          Leave Overview
        </Typography>
        <Container
          sx={{
            // width: "350px",
            // height: "200px",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <CChart
            type="doughnut"
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
                tooltip: {
                  // Example for changing tooltip position to nearest
                  position: "nearest",
                  // Additional tooltip customization can be done here
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
