import React, { useState } from "react";
import { Card, Grid, TextField, Typography, Box, Button } from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import SendSharpIcon from "@mui/icons-material/SendSharp";
import PublicSharpIcon from "@mui/icons-material/PublicSharp";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Grid container className={classes.mainContainer} sx={{ mt: 2 }}>
      <div style={{ display: "inline" }}>
        <Button
          onClick={handleGoBack}
          sx={{
            // padding: "8px 16px",
            color: "#16355d",
            display: {
              xs: "none",
              sm: "inline-block",
            },
          }}
        >
          <ArrowBackIcon />
        </Button>
      </div>
      <h2
        style={{
          color: "#16355d",
          marginLeft: "20px",
          fontFamily: "Roboto",
        }}
      >
        Leave Section
      </h2>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Panel />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            // gap: 2,
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Left side - Form */}
            <Grid item xs={12} md={6}>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Typography
                  variant="h6"
                  align="left" // or just remove this line
                  sx={{
                    mb: 2,
                    fontFamily: "Roboto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // bgcolor: "#0D325C",
                  }}
                >
                  <PublicSharpIcon sx={{ mr: 1 }} />
                  {user.result.email}
                </Typography>

                <Card elevation={10} sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      // margin: "2px",
                      bgcolor: "#0D325C",
                      color: "#ffffff",
                      fontFamily: "Roboto",
                      mb: "10px",
                    }}
                  >
                    Mail
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        type="email"
                        label="To"
                        required
                        fullWidth
                        onChange={(e) =>
                          setMailData({
                            ...mailData,
                            recipient: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Cc"
                        required
                        fullWidth
                        onChange={(e) =>
                          setMailData({
                            ...mailData,
                            recipient2: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From"
                          value={valueTo || null}
                          onChange={setValueTo}
                          slotProps={{
                            textField: { fullWidth: true, required: true },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To"
                          value={valueFrom || null}
                          onChange={setValueFrom}
                          slotProps={{
                            textField: { fullWidth: true, required: true },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12}>
                      <select
                        value={select}
                        onChange={handleSelect}
                        className={classes.dropDown}
                        style={{ width: "100%", padding: "10px" }}
                      >
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Grid>

                    {select && (
                      <Grid item xs={12}>
                        <TextField
                          label="Subject"
                          required
                          fullWidth
                          value={`Applying for ${leaveType} from ${fromDate} to ${toDate}`}
                          onChange={(e) =>
                            setMailData({
                              ...mailData,
                              subject: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <TextField
                        multiline
                        minRows={8}
                        fullWidth
                        required
                        defaultValue={`\n\n\n\n\n\nThanks & Regards\n${
                          user.result.firstName.charAt(0).toUpperCase() +
                          user.result.firstName.slice(1).toLowerCase() +
                          " " +
                          user.result.lastName.charAt(0).toUpperCase() +
                          user.result.lastName.slice(1).toLowerCase()
                        } | ${user.result.department}`}
                        onChange={(e) =>
                          setMailData({
                            ...mailData,
                            requiredMessage: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                      <button
                        type="submit"
                        style={{
                          height: "50px",
                          width: "100px",
                          fontFamily: "Roboto",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SendSharpIcon sx={{ mr: 1 }} />
                        Send
                      </button>
                    </Grid>
                  </Grid>
                </Card>
              </form>
            </Grid>

            {/* Right side - Leave table and calendar */}
            <Grid item xs={12} md={6}>
              <LeaveTableDisplay />
              {(user?.result?.role === "employee" ||
                (user?.result?.role === "manager" &&
                  user?.result?.jobTitle !== "HR")) && (
                <Card
                  elevation={10}
                  sx={{
                    mt: 2,
                    height: "350px",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                      sx={{
                        height: "100%",
                        "& .MuiCalendarPicker-root": {
                          height: "100%",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Card>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default Leave;
