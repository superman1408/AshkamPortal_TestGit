import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Grid,
  CircularProgress,
  Box,
  Button,
  IconButton,
  Tooltip,
  Card,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import "./Style1.css"; // Import CSS file for styling
import ActivityCodePopUp from "./ActivityCodePopUp";

import { getPosts } from "../../../action/posts";
import {
  timesheetList,
  deleteTimesheet,
  updateTimesheet,
  getTimesheetPosts,
} from "../../../action/timesheet";
import LOGO from "../../../assets/AshkamLogoTransparentbc.png";
import { getProjectCodes } from "../../../api";

// import ArchiveTimesheet from "./ArchiveTimesheet";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ArchiveIcon from "@mui/icons-material/Archive";

import LoadingSpinner from "../../ReactSpinner/reactSpinner";
import DownloadButton from "../../DownloadButton/DownloadButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function TimeSheet({ currentId, posts, timesheetData }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [entries, setEntries] = useState([]);
  const [projectCode, setProjectCode] = useState("");
  const [refdocNumber, setRefdocNumber] = useState("");
  const [activityCode, setActivityCode] = useState("");
  const [date, setDate] = useState("");
  const [netTime, setNetTime] = useState("");
  const [overTime, setOverTime] = useState("");
  const [remarks, setRemarks] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [timesheet, setTimesheet] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isStatus, setIsStatus] = useState(true);

  const [activityopen, setActivityOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [projectCodes, setProjectCodes] = useState([]);

  // State for filter
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const user = JSON.parse(localStorage.getItem("profile"));
  // eslint-disable-next-line no-unused-vars
  const [role, setRole] = useState(user?.result?.role);

  const [printingShow, setPrintingShow] = useState(false);

  const [disable, setDisabled] = useState(true);
  const loggedInUserId = user?.result?._id;
  // For enabling form only for login users
  useEffect(() => {
    if (loggedInUserId === currentId || role === "admin") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [loggedInUserId, currentId, role]);

  useEffect(() => {
    // Fetch posts whenever currentId changes
    dispatch(getPosts())
      .then(() => {
        // Optionally, clear local entries if you want
        setEntries([]);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, [dispatch, currentId]);

  //------------------------------------------------For getting data of Timesheet--------------------------------------------------

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjectCodes();

        console.log("API Response:", data);
        console.log("Is Array:", Array.isArray(data));

        setProjectCodes(data.split(",").map((code) => code.trim()));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    const newEntry = {
      projectCode,
      activityCode,
      refdocNumber,
      date,
      netTime: parseFloat(netTime),
      overTime: parseFloat(overTime),
      editIndex: parseFloat(editIndex),
      remarks,
    };

    if (validateEntry(newEntry)) {
      try {
        if (editIndex !== -1) {
          const indexed = [editIndex];
          const updatedEntries = [...entries];
          updatedEntries[editIndex] = newEntry;
          setEntries(updatedEntries);
          await dispatch(updateTimesheet(currentId, indexed, newEntry)).then(
            (res) => {
              console.log("Data is recieved in the Data Base for Editing....");
              setEditIndex(-1); // Reset edit index
              alert("✅ Updated Data successfully!");
              dispatch(getTimesheetPosts()); // 🔄 refresh data
            },
          );
        } else {
          setEntries([...entries, newEntry]);
          await dispatch(timesheetList(newEntry, currentId)).then((res) => {
            console.log("Data is recieved in the Data Base");
            clearForm();
            alert("✅ Entry submitted successfully!");
            dispatch(getTimesheetPosts()); // 🔄 refresh data
            // window.location.reload();
          });
        }
      } catch (err) {
        console.error("Submission failed :", err);
        alert("❌ Something went wrong while submitting.");
        setIsSubmitting(false); // Stop loading
      }
    } else {
      alert(
        'Invalid entry! Please check your input values and try again. Selected Date must not fall under "SUNDAY" & 2nd-4th "SATURDAY".',
      );
      setIsSubmitting(false); // Reset only if validation fails
    }
    clearForm();
    window.location.reload();
  };

  //

  //checking for the valid entry in the form and return result in "True" or "False".....!!!
  const validateEntry = (newEntry) => {
    const today = new Date(newEntry.date);
    const currentDay = today.getDay();
    if (
      currentDay === 0 ||
      (currentDay === 6 && isSecondOrFourthSaturday(today))
    ) {
      return false;
    }

    const daysUntilNextMonday = 1 - currentDay;
    const mondayOfCurrentWeek = new Date(today);
    mondayOfCurrentWeek.setDate(today.getDate() + daysUntilNextMonday);

    const startOfWeek = new Date(mondayOfCurrentWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5);

    const entriesForCurrentWeek = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfWeek && entryDate <= endOfWeek;
    });

    const totalNetTime = entriesForCurrentWeek.reduce(
      (total, entry) => total + entry.netTime,
      0,
    );

    return totalNetTime + newEntry.netTime <= 9;
  };

  const handleCheck = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDay = selectedDate.getDay();
    const isInvalidDate =
      currentDay === 0 ||
      (currentDay === 6 && isSecondOrFourthSaturday(selectedDate));
    if (isInvalidDate) {
      alert(
        'Invalid entry! Please check your input values and try again. Selected Date must not fall under "SUNDAY" & 2nd-4th "SATURDAY".',
      );
      window.location.reload();
    } else {
      setDate(e.target.value);
    }
  };

  //Logic for Second and Fourth Saturday....!!!!!
  const isSecondOrFourthSaturday = (date) => {
    const dayOfMonth = date.getDate();
    const weekOfMonth = Math.floor((dayOfMonth - 1) / 7) + 1;
    return weekOfMonth === 2 || weekOfMonth === 4;
  };

  // Build array from posts + currentId using useMemo()

  const array = useMemo(() => {
    let temp = [];

    timesheetData.map((data) => {
      if (data._id === currentId) {
        // console.log("Id is matching");
        for (let i = 0; i < data.projectCode.length; i++) {
          temp.push({
            projectCode: data.projectCode[i],

            activityCode: data.activityCode[i],

            refdocNumber: data.refdocNumber[i],

            date: data.date[i],

            netTime: data.netTime[i],

            overTime: data.overTime[i],

            editIndex: data.editIndex[i],

            remarks: data.remarks[i],
          });
        }
      } else {
        // console.log("Id is not matching");
      }
    });

    return temp;
  }, [timesheetData, currentId]);

  // const handleNetSubmit = (e) => {
  //   let value = parseInt(e.target.value);
  //   if (value > 8) {
  //     value = 8;
  //   }
  //   setNetTime(value);
  // };

  //Logic for clearing the form.........
  const clearForm = () => {
    setProjectCode("");
    setActivityCode("");
    setRefdocNumber("");
    setDate("");
    setNetTime("");
    setOverTime("");
    setRemarks("");
    setEditIndex(-1);
  };

  const togglePopup2 = () => {
    setActivityOpen(!activityopen);
  };

  // Build array from posts + currentId using useMemo()

  // Here the array is being loaded....!!!
  // eslint-disable-next-line array-callback-return

  //This logic is creating a delay time for loading the array....!!
  useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  // Logic for deleting the entry......!!!
  const deleteEntry = (index) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteTimesheet(currentId, index))
        .then(() => {
          setIsLoading(true);
          // setEntries(entries.filter((_, i) => i !== index)); // remove from UI
          alert("✅ Deleted successfully!");
          // navigate(0); // ✅ refresh current route (React way of reload)
          dispatch(getTimesheetPosts()); // 🔄 refresh data
        })
        .catch((err) => {
          alert("Error While Deleting!");
          return console.log("Error in deleting the file..!!");
        });
    }
  };

  //To Edit the entry....!!!!
  const editEntry = (index) => {
    setEditIndex(index);
    setProjectCode(array[index].projectCode);
    setRefdocNumber(array[index].refdocNumber);
    setActivityCode(array[index].activityCode);
    setDate(array[index].date);
    setNetTime(array[index].netTime);
    setOverTime(array[index].overTime);
    setRemarks(array[index].remarks);
  };

  const componentRef = useRef();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleArchive = () => {
    navigate(`/${currentId}/archiveTimesheet`);
  };

  // console.log("timesheetData", timesheetData);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length >= 50) {
      setShowTooltip(true); // show tooltip only once
    } else {
      setShowTooltip(false);
      setRemarks(value);
    }
  };

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredArray = array.filter((data) => {
    const entryDate = new Date(data.date);
    return (
      entryDate.getMonth() === selectedMonth &&
      entryDate.getFullYear() === selectedYear
    );
  });

  const monthlyTotalNetTime = array
    .filter((entry) => {
      const date = new Date(entry.date);
      return (
        date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
      );
    })
    .reduce((total, entry) => total + (parseFloat(entry.netTime) || 0), 0);

  // style for input box

  const inputStyle = {
    width: "100%",
    height: "42px",
    padding: "0 14px",
    fontSize: "15px",
    fontFamily: "Roboto",
    color: "#16355d",
    background: "#fff",
    border: "1px solid #D5DBE5",
    borderRadius: "8px",
    outline: "none",
    transition: "all .25s",

    boxSizing: "border-box",
  };

  return (
    <div>
      <div style={{ display: "inline" }}>
        <Button
          onClick={handleGoBack}
          sx={{
            padding: "8px 16px",
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
      <strong
        style={{
          color: "#16355d",
          marginLeft: "50px",
          fontFamily: "Roboto",
          fontSize: "30px",
        }}
      >
        Project Time Sheet
      </strong>

      <div style={{ display: "flex" }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            padding: "12px",
            flexDirection: "row",
            "@media (max-width: 600px)": {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Grid item xs={12} md={3}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                m: "10px 8px 0px 20px",
                borderRadius: 4,
                bgcolor: "#ffffff",
                border: "1px solid #E5E7EB",
                boxShadow: "0 10px 30px rgba(22,53,93,0.08)",

                "&:hover": {
                  boxShadow: "0 14px 40px rgba(22,53,93,0.12)",
                },
              }}
            >
              <form onSubmit={handleSubmit} className="time-sheet-form">
                <fieldset disabled={disable}>
                  <div className="form-group">
                    <label
                      style={{ color: "#16355d", fontFamily: "Roboto" }}
                      htmlFor="date"
                    >
                      Date:
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={handleCheck}
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      style={{ color: "#16355d", fontFamily: "Roboto" }}
                      htmlFor="projectCode"
                    >
                      Project Code:
                    </label>
                    {/* <input
                      style={{
                        width: "100%",
                        height: "30px",
                        padding: "8px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        color: "#e55d17",
                      }}
                      type="text"
                      id="projectCode"
                      // value={projectCode}
                      defaultValue={projectCode}
                      // onFocus={togglePopup1} // Using onFocus event to trigger the popup
                      onChange={(e) => setProjectCode(e.target.value)}
                      autoComplete="off"
                    /> */}
                    <Select
                      labelId="project-code-label"
                      value={projectCode}
                      displayEmpty
                      renderValue={(selected) => {
                        if (selected === "") {
                          return (
                            <span style={{ color: "#9CA3AF" }}>
                              Select Project Code
                            </span>
                          );
                        }
                        return selected;
                      }}
                      label="Project Code"
                      onChange={(e) => setProjectCode(e.target.value)}
                      sx={{
                        width: "100%",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        fontFamily: "Roboto",
                        color: "#16355d",

                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#16355d",
                        },

                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#16355d",
                        },

                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#16355d",
                          borderWidth: "2px",
                        },

                        "& .MuiSelect-select": {
                          padding: "10px 14px",
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select Project Code</em>
                      </MenuItem>
                      {projectCodes.map((code) => (
                        <MenuItem key={code} value={code}>
                          {code}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* ______________________________________pop window
                    contents_____________________________________________ */}
                  </div>

                  <div className="form-group">
                    <label
                      style={{ color: "#16355d", fontFamily: "Roboto" }}
                      htmlFor="activityCode"
                    >
                      Activity Code:
                    </label>
                    <input
                      style={inputStyle}
                      type="text"
                      id="activityCode"
                      value={activityCode}
                      // defaultValue={activityCode}
                      onFocus={togglePopup2}
                      readOnly
                      autoComplete="off"
                    />
                    {activityopen && (
                      <ActivityCodePopUp
                        setActivityCode={setActivityCode}
                        setActivityOpen={setActivityOpen}
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label
                      style={{ color: "#16355d", fontFamily: "Roboto" }}
                      htmlFor="refdocNumber"
                    >
                      Ref. Document Number:
                    </label>
                    <input
                      style={inputStyle}
                      type="text"
                      id="refdocNumber"
                      value={refdocNumber}
                      // defaultValue={refdocNumber}
                      onChange={(e) => setRefdocNumber(e.target.value)}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label
                      style={{ color: "#16355d", fontFamily: "Roboto" }}
                      htmlFor="netTime"
                    >
                      Net Time (hrs):
                    </label>
                    <input
                      type="number"
                      id="netTime"
                      value={netTime}
                      // defaultValue={netTime}
                      step="0.1"
                      max="7.5"
                      style={inputStyle}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);

                        if (value <= 7.5 || e.target.value === "") {
                          setNetTime(value);
                        } else {
                          alert("Net Time cannot exceed 7.5 hours.");
                          e.target.value = 7.5;
                          setNetTime(7.5);
                        }
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      style={{ color: "#16355d", fontFamily: "Roboto" }}
                      htmlFor="overTime"
                    >
                      Over Time (hrs):
                    </label>
                    <input
                      type="number"
                      id="overTime"
                      value={overTime}
                      // defaultValue={overTime}
                      onChange={(e) => setOverTime(parseFloat(e.target.value))}
                      step="0.1"
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label
                      style={{ color: "#16355d", fontFamily: "Roboto" }}
                      htmlFor="Remarks"
                    >
                      Remarks:
                    </label>
                    <input
                      style={inputStyle}
                      type="text"
                      id="remarks"
                      placeholder="Enter text (max 50 chars)"
                      maxLength={50} // ✅ correct way in React
                      value={remarks}
                      onChange={(e) => {
                        setRemarks(e.target.value);
                        handleChange(e);
                      }}
                      step="0.1"
                    />
                    {showTooltip && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "4px",
                          whiteSpace: "nowrap", // ✅ keep tooltip one-line
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        ⚠️ Maximum 50 characters allowed
                      </div>
                    )}
                  </div>
                  {/* </div> */}

                  {disable ? (
                    <p
                      style={{
                        color: "#888",
                        fontStyle: "italic",
                        textAlign: "center",
                        marginBottom: "10px",
                      }}
                    >
                      ⚠️ You are not authorized to submit this timesheet.
                    </p>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          background:
                            "linear-gradient(135deg, #0d325c, #16355d)",
                          borderRadius: "5px",
                          color: "#fff",
                          padding: "5px 20px",
                          fontFamily: "Roboto",
                          fontWeight: 600,
                          textTransform: "none",
                          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #16355d, #0d325c)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                          },

                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          opacity: isSubmitting ? 0.6 : 1,
                        }}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              color: "inherit",
                            }}
                          >
                            Submitting...
                            <LoadingSpinner size={16} color="#fff" />
                          </Box>
                        ) : editIndex !== -1 ? (
                          "Update"
                        ) : (
                          "Submit"
                        )}
                      </Button>

                      <Button
                        variant="contained"
                        sx={{
                          background:
                            "linear-gradient(135deg, #0d325c, #16355d)",
                          borderRadius: "5px",
                          padding: "5px 20px",
                          fontFamily: "Roboto",
                          fontWeight: 600,
                          textTransform: "none",
                          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #16355d, #0d325c)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                          },
                        }}
                        type="button"
                        onClick={clearForm}
                      >
                        Clear
                      </Button>
                    </div>
                  )}
                </fieldset>
              </form>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={9}
            sx={{
              borderRadius: "12px",
              height: "100%",
              minHeight: "100%",
            }}
          >
            <Grid
              width={"100%"}
              height="auto"
              // bgcolor="gray"
              sx={{
                borderRadius: "12px",
                height: "100%",
                minHeight: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "15px",
                  fontFamily: "Roboto",
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {/* <Select>Year</Select> */}
                      <select
                        style={{
                          backgroundColor: "#ffffff", // clean white background
                          color: "#16355d", // navy text color
                          border: "1.8px solid #16355d", // same navy as buttons
                          borderRadius: "6px", // soft edges for cohesion
                          padding: "6px 12px", // breathing room
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: 500,
                          fontSize: "15px",
                          outline: "none", // remove browser default blue outline
                          cursor: "pointer",
                          transition: "all 0.2s ease-in-out",
                        }}
                        onFocus={
                          (e) => (e.target.style.border = "1.8px solid #007bff") // focus border color
                        }
                        onBlur={
                          (e) => (e.target.style.border = "1.8px solid #16355d") // revert after focus
                        }
                        value={selectedYear}
                        onChange={(e) =>
                          setSelectedYear(parseInt(e.target.value))
                        }
                      >
                        {Array.from(
                          new Set(
                            array.map((entry) =>
                              new Date(entry.date).getFullYear(),
                            ),
                          ),
                        )
                          .sort((a, b) => b - a) // descending order
                          .map((year, index) => (
                            <option key={index} value={year}>
                              {year}
                            </option>
                          ))}
                      </select>
                      {/* <Select>Month</Select> */}

                      <select
                        style={{
                          backgroundColor: "#ffffff", // clean white background
                          color: "#16355d", // navy text color
                          border: "1.8px solid #16355d", // same navy as buttons
                          borderRadius: "6px", // soft edges for cohesion
                          padding: "6px 12px", // breathing room
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: 500,
                          fontSize: "15px",
                          outline: "none", // remove browser default blue outline
                          cursor: "pointer",
                          transition: "all 0.2s ease-in-out",
                        }}
                        onFocus={
                          (e) => (e.target.style.border = "1.8px solid #007bff") // focus border color
                        }
                        onBlur={
                          (e) => (e.target.style.border = "1.8px solid #16355d") // revert after focus
                        }
                        value={selectedMonth}
                        onChange={(e) =>
                          setSelectedMonth(parseInt(e.target.value))
                        }
                      >
                        {MONTHS.map((month, index) => (
                          <option key={index} value={index}>
                            {month}
                          </option>
                        ))}
                      </select>
                      {role === "admin" && (
                        <Button onClick={() => setIsStatus((pre) => !pre)}>
                          {isStatus ? "Inactive" : "Active"}
                        </Button>
                      )}
                      {/* Card for Total Net Time */}
                      <Card
                        elevation={0}
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          border: "1px solid #E5E7EB",
                          borderLeft: "4px solid #047681",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          boxShadow: "0 4px 12px rgba(22,53,93,0.08)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 13,
                            color: "#5A6A85",
                            fontWeight: 600,
                          }}
                        >
                          Total Net Time :
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 20,
                            color: "#16355d",
                            fontWeight: 700,
                          }}
                        >
                          {monthlyTotalNetTime} hrs
                        </Typography>
                      </Card>
                    </Box>
                  </Grid>{" "}
                  <Grid item>
                    <Tooltip title="Archived">
                      <IconButton
                        onClick={handleArchive}
                        sx={{
                          padding: "8px 16px",
                          float: "right",
                          color: "#16355d",
                          display: {
                            xs: "none",
                            sm: "inline-block",
                          },
                        }}
                      >
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </div>
              <div style={{ display: "inline" }}></div>
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex", // Make it a flex container
                    alignItems: "center", // Vertically center
                    justifyContent: "center",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Card>
                  <div
                    style={{
                      padding: "5px",
                      borderRadius: "12px",
                      backgroundColor: "white",
                    }}
                    ref={componentRef}
                  >
                    {printingShow && (
                      <>
                        <table
                          table
                          style={{
                            width: "100%",
                            borderCollapse: "separate",
                            borderSpacing: 0,
                            fontFamily: "Roboto",
                            overflow: "hidden",
                          }}
                        >
                          {/* <thead> */}
                          <tr>
                            <div
                              style={{
                                padding: "10px",
                              }}
                            >
                              <img src={LOGO} alt="logo" />
                            </div>
                            <td style={{ padding: "5px" }}>
                              TIME SHEET SUMMARY
                            </td>
                          </tr>
                        </table>

                        <table
                          style={{
                            // marginLeft: "100px",
                            padding: "5px",
                            // marginLeft: "100px",
                            borderCollapse: "collapse",
                            border: "1px solid black",
                            // marginLeft: "auto",
                            // marginRight: "auto",
                            width: "100%",
                            marginBottom: "10px",
                            maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                          }}
                        >
                          <tbody>
                            {
                              // eslint-disable-next-line array-callback-return
                              posts.map((post, index) => {
                                if (post._id === currentId) {
                                  return (
                                    <>
                                      <tr
                                        key={index}
                                        style={{
                                          backgroundColor:
                                            index % 2 === 0
                                              ? "#ffffff"
                                              : "#F8FAFC",
                                          transition: "0.25s",
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.background =
                                            "#EEF5FF";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background =
                                            index % 2 === 0
                                              ? "#ffffff"
                                              : "#F8FAFC";
                                        }}
                                      >
                                        <th
                                          style={{
                                            background: "#16355d",
                                            color: "#fff",
                                            padding: "14px",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            textAlign: "center",
                                            position: "sticky",
                                            top: 0,
                                            letterSpacing: ".4px",
                                          }}
                                        >
                                          Employee Id
                                        </th>
                                        <td
                                          style={{
                                            border: "1px solid black",
                                            textAlign: "center",
                                            fontFamily: "Roboto",
                                          }}
                                        >
                                          {post?.employeeId}
                                        </td>
                                        <th
                                          style={{
                                            background: "#16355d",
                                            color: "#fff",
                                            padding: "14px",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            textAlign: "center",
                                            position: "sticky",
                                            top: 0,
                                            letterSpacing: ".4px",
                                          }}
                                        >
                                          Name
                                        </th>
                                        <td
                                          style={{
                                            border: "1px solid black",
                                            textAlign: "center",
                                            fontFamily: "Roboto",
                                          }}
                                        >
                                          {post?.firstName
                                            .charAt(0)
                                            .toUpperCase() +
                                            post?.firstName
                                              .slice(1)
                                              .toLowerCase() +
                                            " " +
                                            post?.lastName
                                              .charAt(0)
                                              .toUpperCase() +
                                            post?.lastName
                                              .slice(1)
                                              .toLowerCase()}
                                        </td>
                                      </tr>
                                      <tr
                                        key={index}
                                        style={{
                                          backgroundColor:
                                            index % 2 === 0
                                              ? "#ffffff"
                                              : "#F8FAFC",
                                          transition: "0.25s",
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.background =
                                            "#EEF5FF";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background =
                                            index % 2 === 0
                                              ? "#ffffff"
                                              : "#F8FAFC";
                                        }}
                                      >
                                        <th
                                          style={{
                                            background: "#16355d",
                                            color: "#fff",
                                            padding: "14px",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            textAlign: "center",
                                            position: "sticky",
                                            top: 0,
                                            letterSpacing: ".4px",
                                          }}
                                        >
                                          Department
                                        </th>
                                        <td
                                          style={{
                                            border: "1px solid black",
                                            textAlign: "center",
                                            fontFamily: "Roboto",
                                          }}
                                        >
                                          {post?.department}
                                        </td>
                                        <th
                                          style={{
                                            background: "#16355d",
                                            color: "#fff",
                                            padding: "14px",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            textAlign: "center",
                                            position: "sticky",
                                            top: 0,
                                            letterSpacing: ".4px",
                                          }}
                                        >
                                          Duration
                                        </th>
                                        <td
                                          style={{
                                            border: "1px solid black",
                                            textAlign: "center",
                                            fontFamily: "Roboto",
                                          }}
                                        >
                                          {MONTHS[selectedMonth]}
                                        </td>
                                      </tr>
                                    </>
                                  );
                                }
                              })
                            }
                          </tbody>
                        </table>
                      </>
                    )}
                    <Grid
                      sx={{ backgroundColor: "white", borderRadius: "12px" }}
                    >
                      <table
                        className="time-sheet-table"
                        style={{
                          padding: "10px",
                          borderCollapse: "collapse",

                          marginRight: "auto",
                          borderRadius: "12px",
                          width: windowWidth <= 600 ? "30%" : "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th
                              style={{
                                background: "#16355d",
                                color: "#fff",
                                padding: "14px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textAlign: "center",
                                position: "sticky",
                                top: 0,
                                letterSpacing: ".4px",
                              }}
                            >
                              Date (yyyy-mm-dd)
                            </th>
                            <th
                              style={{
                                background: "#16355d",
                                color: "#fff",
                                padding: "14px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textAlign: "center",
                                position: "sticky",
                                top: 0,
                                letterSpacing: ".4px",
                              }}
                            >
                              Project Code
                            </th>
                            <th
                              style={{
                                background: "#16355d",
                                color: "#fff",
                                padding: "14px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textAlign: "center",
                                position: "sticky",
                                top: 0,
                                letterSpacing: ".4px",
                              }}
                            >
                              Activity Code
                            </th>

                            <th
                              style={{
                                background: "#16355d",
                                color: "#fff",
                                padding: "14px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textAlign: "center",
                                position: "sticky",
                                top: 0,
                                letterSpacing: ".4px",
                              }}
                            >
                              Ref. Doc. Number
                            </th>

                            <th
                              style={{
                                background: "#16355d",
                                color: "#fff",
                                padding: "14px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textAlign: "center",
                                position: "sticky",
                                top: 0,
                                letterSpacing: ".4px",
                              }}
                            >
                              Net Time (hrs)
                            </th>
                            <th
                              style={{
                                background: "#16355d",
                                color: "#fff",
                                padding: "14px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textAlign: "center",
                                position: "sticky",
                                top: 0,
                                letterSpacing: ".4px",
                              }}
                            >
                              Over Time (hrs)
                            </th>
                            <th
                              style={{
                                background: "#16355d",
                                color: "#fff",
                                padding: "14px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textAlign: "center",
                                position: "sticky",
                                top: 0,
                                letterSpacing: ".4px",
                              }}
                            >
                              Remarks
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Here added fileterd array to display according to month & added conditional statement if there is no data */}
                          {(role === "admin" ? array : filteredArray).length ===
                          0 ? (
                            <tr>
                              <td
                                colSpan={7} // ✅ span across all columns
                                style={{
                                  textAlign: "center",
                                  padding: "15px",
                                  color: "#888",
                                  fontFamily: "Roboto",
                                }}
                              >
                                No data available for this month/year
                              </td>
                            </tr>
                          ) : (
                            (role === "admin" && isStatus === true
                              ? array
                              : filteredArray.sort(
                                  (a, b) => new Date(a.date) - new Date(b.date),
                                )
                            ).map((data, index) => (
                              <tr
                                key={index}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#ffffff" : "#F8FAFC",
                                  transition: "0.25s",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#EEF5FF";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    index % 2 === 0 ? "#ffffff" : "#F8FAFC";
                                }}
                              >
                                <td
                                  style={{
                                    padding: "14px",
                                    textAlign: "center",
                                    color: "#374151",
                                    borderBottom: "1px solid #F1F5F9",
                                    fontSize: "14px",
                                  }}
                                >
                                  {data.date}
                                </td>
                                <td
                                  style={{
                                    padding: "14px",
                                    textAlign: "center",
                                    color: "#374151",
                                    borderBottom: "1px solid #F1F5F9",
                                    fontSize: "14px",
                                  }}
                                >
                                  {data.projectCode}
                                </td>
                                <td
                                  style={{
                                    padding: "14px",
                                    textAlign: "center",
                                    color: "#374151",
                                    borderBottom: "1px solid #F1F5F9",
                                    fontSize: "14px",
                                  }}
                                >
                                  {data.activityCode}
                                </td>
                                <td
                                  style={{
                                    padding: "14px",
                                    textAlign: "center",
                                    color: "#374151",
                                    borderBottom: "1px solid #F1F5F9",
                                    fontSize: "14px",
                                  }}
                                >
                                  {data.refdocNumber}
                                </td>
                                <td
                                  style={{
                                    padding: "14px",
                                    textAlign: "center",
                                    color: "#374151",
                                    borderBottom: "1px solid #F1F5F9",
                                    fontSize: "14px",
                                  }}
                                >
                                  {data.netTime}
                                </td>
                                <td
                                  style={{
                                    padding: "14px",
                                    textAlign: "center",
                                    color: "#374151",
                                    borderBottom: "1px solid #F1F5F9",
                                    fontSize: "14px",
                                  }}
                                >
                                  {data.overTime}
                                </td>
                                <td
                                  style={{
                                    padding: "14px",
                                    textAlign: "center",
                                    color: "#374151",
                                    borderBottom: "1px solid #F1F5F9",
                                    fontSize: "14px",
                                  }}
                                >
                                  {data.remarks}
                                </td>

                                {printingShow === false && role === "admin" && (
                                  <td
                                    style={{
                                      textAlign: "center",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    <Tooltip title="Edit">
                                      <IconButton
                                        onClick={() => editEntry(index)}
                                        sx={{
                                          mr: 1,
                                          bgcolor: "#E8F8F8",
                                          color: "#047681",
                                          "&:hover": {
                                            bgcolor: "#047681",
                                            color: "#fff",
                                          },
                                        }}
                                      >
                                        <EditRoundedIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete">
                                      <IconButton
                                        onClick={() => deleteEntry(index)}
                                        sx={{
                                          bgcolor: "#FDECEC",
                                          color: "#dc3545",
                                          "&:hover": {
                                            bgcolor: "#dc3545",
                                            color: "#fff",
                                          },
                                        }}
                                      >
                                        <DeleteRoundedIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </td>
                                )}
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </Grid>
                  </div>
                </Card>
              )}

              <Divider
                height="100px"
                sx={{
                  marginTop: "20px",
                  borderWidth: "5px",
                  bgcolor: "#336699",
                }}
              />
              {/* <button
                id="download"
                style={{
                  fontFamily: "Roboto",
                  float: "right",
                  marginTop: "100px",
                }}
                onClick={handletrue}
              >
                Download
              </button> */}

              <DownloadButton
                componentRef={componentRef}
                filename="Timesheet Summary"
                setPrintingShow={setPrintingShow}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default TimeSheet;
