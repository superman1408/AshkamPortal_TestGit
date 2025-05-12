import React, { useState } from "react";
import { Card, Grid, TextField, Typography } from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import SendSharpIcon from "@mui/icons-material/SendSharp";
import PublicSharpIcon from "@mui/icons-material/PublicSharp";

import useStyles from "./style";
import Panel from "../Panel/Panel";
import { sendMail, sendMailData } from "../../action/mail";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import LeaveTableDisplay from "./LeaveTable/leaveTableDisplay";
import ChartComponent from "./pieGraph";

const Leave = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalLeave = 24;

  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [select, setSelect] = useState("");
  const [mailData, setMailData] = useState({
    recipient: "",
    recipient2: "",
    requiredMessage: "",
    subject: "",
  });

  const [valueTo, setValueTo] = useState();

  const [valueFrom, setValueFrom] = useState();

  const options = [
    { label: "SELECT LEAVE", value: "" },
    { label: "Casual Leave", value: "Casual Leave" },
    { label: "Sick Leave", value: "Sick Leave" },
    { label: "Leave (others)", value: "Leave" },
    // { label: "Floating Leave", value: "Floating Leave" },
  ];

  const UsFormatter = new Intl.DateTimeFormat("en-US");
  const fromDate = UsFormatter.format(valueTo);
  const toDate = UsFormatter.format(valueFrom);

  const [value, setValue] = React.useState(dayjs(new Date()));

  // ----------------------------- Calculate Total Number of Leave Days ---------------------------------------------------------

  const calculateTotalDays = () => {
    if (valueTo && valueFrom) {
      const fromDate = new Date(valueTo);
      const toDate = new Date(valueFrom);
      let totalDays = 0;

      // Iterate through each day between fromDate and toDate
      for (
        let currentDate = fromDate;
        currentDate <= toDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        // Check if the current day is not Saturday (6) or Sunday (0)
        if (currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
          totalDays++;
        }
      }

      return totalDays;
    }
    return 0;
  };

  const leaveTaken = calculateTotalDays();

  const availabelLeave = totalLeave - leaveTaken;

  // ---------------------------------------------------------------------------------------------------------------

  const handleSelect = (event) => setSelect(event.target.value);
  const leaveType = select;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mailData) {
      dispatch(sendMail(mailData, navigate));
      dispatch(sendMailData(id, mailData))
        .then(() => {
          navigate(`/home`, { replace: true });
        })
        .catch((err) => {
          console.log("Error : ", err);
        });
    }
    clear();
  };

  const clear = () => {
    setMailData({
      recipient: "",
      recipient2: "",
      requiredMessage: "",
      subject: "",
    });
  };

  return (
    <Grid
      className={classes.mainContainer}
      sx={{
        padding: "1px",
        display: "flex",
        // justifyContent:"" ,
        marginTop: "20px",
      }}
    >
      <Grid item xs={12} md={8} sx={{ display:"flex" }}>
        <Panel />
      </Grid>
      <Grid item xs={12} md={4} sx={{ p: 1, width: "100%" }}>
        <Grid
          sx={{
            display: "flex",
            "@media (max-width: 600px)": {
              flexDirection: "column",
              margin: "0px",
            },
          }}
        >
          <Grid
            sx={{
              marginLeft: "15px",
              "@media (max-width: 600px)": {
                flexDirection: "column",
                margin: "0px",
              },
            }}
          >
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Grid>
                <Typography
                  variant="h6"
                  sx={{
                    padding: "5px",
                    textAlign: "center",
                    fontFamily: "Roboto",
                  }}
                >
                  <PublicSharpIcon sx={{ marginRight: "10px" }} />
                  {`${user.result.email}`}
                </Typography>
              </Grid>
              <Card
                elevation={10}
                sx={{
                  padding: "10px",
                  // width: "700px",
                  width: {
                    sx: 1.0,
                    sm: 250,
                    md: 600,
                  },
                }}
              >
                <TextField
                  type="email"
                  name="recipient"
                  label="To"
                  variant="outlined"
                  required
                  fullWidth
                  sx={{ marginTop: "10px" }}
                  onChange={(e) =>
                    setMailData({ ...mailData, recipient: e.target.value })
                  }
                />

                <TextField
                  type="text"
                  name="recipient2"
                  label="Cc"
                  variant="outlined"
                  required
                  fullWidth
                  sx={{ marginTop: "10px" }}
                  onChange={(e) =>
                    setMailData({ ...mailData, recipient2: e.target.value })
                  }
                />

                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    "@media (max-width: 600px)": {
                      flexDirection: "column",
                    },
                  }}
                >
                  <Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="From"
                          value={valueTo ? valueTo : " "}
                          onChange={(newValue) => setValueTo(newValue)}
                          required
                          fullWidth
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="To"
                          value={valueFrom ? valueFrom : ""}
                          required
                          halfWidth
                          onChange={(newValue) => setValueFrom(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </Grid>

                <Grid>
                  <div style={{ margin: "10px 0px" }}>
                    <select
                      value={select ? select : ""}
                      onChange={handleSelect}
                      placeholder="Select Leave"
                      className={classes.dropDown}
                    >
                      {options.map((option) => (
                        <option key={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </Grid>

                <Grid>
                  {select && (
                    <TextField
                      name="subject"
                      label="Subject"
                      required
                      fullWidth
                      sx={{ marginTop: "10px", fontWeight: "500px" }}
                      value={
                        (mailData.subject = `Applying for ${leaveType} from ${fromDate} to ${toDate}`)
                      }
                      onChange={(e) =>
                        setMailData({
                          ...mailData,
                          [e.target.subject]: e.target.value,
                        })
                      }
                    />
                  )}
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      multiline
                      minRows={9}
                      sx={{
                        marginTop: "10px",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                      defaultValue={`\n\n\n\n\n\nThanks & Regards\n${
                        user.result.firstName.charAt(0).toUpperCase() +
                        user.result.firstName.slice(1).toLowerCase() +
                        " " +
                        user.result.lastName.charAt(0).toUpperCase() +
                        user.result.lastName.slice(1).toLowerCase()
                      } | ${user.result.department}`}
                      // Regards & username should be on two lines one by one
                      onChange={(e) =>
                        setMailData({
                          ...mailData,
                          requiredMessage: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <button
                      variant="contained"
                      type="submit"
                      style={{
                        height: "50px",
                        width: "20%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "10px",
                        padding: "2px",
                        fontFamily: "Roboto",
                      }}
                    >
                      <SendSharpIcon />
                      Send
                    </button>
                  </div>
                </Grid>
              </Card>
              {/* </div>
              </div> */}
            </form>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              p: 1,
              width: "100%",
            }}
          >
            <LeaveTableDisplay />{" "}
            {user.result.role === "employee" ||
            user.result.role === "manager" ? (
              <Card
                elevation={10}
                sx={{
                  marginLeft: "5px",
                  display: "flex",
                  marginBottom: "10px",
                  "@media (max-width: 600px)": {
                    marginTop: "10px",
                  },
                  height: "350px", // Adjust the height of the Card
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                    <DateCalendar
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                      sx={{
                        height: "100%", // Adjust the height of the DateCalendar
                        "& .MuiCalendarPicker-root": {
                          height: "100%", // Ensures the calendar picker takes the full height
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Card>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Leave;
