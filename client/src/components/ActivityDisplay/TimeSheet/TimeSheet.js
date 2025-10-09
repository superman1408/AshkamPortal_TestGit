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
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";

import "./Style1.css"; // Import CSS file for styling

// import ProjectCodePopUp from "./ProjectCodePopUp";

import ActivityCodePopUp from "./ActivityCodePopUp";

import { getPosts } from "../../../action/posts";

import {
  timesheetList,
  deleteTimesheet,
  updateTimesheet,
  getTimesheetPosts,
} from "../../../action/timesheet";

import LOGO from "../../../assets/AshkamLogoTransparentbc.png";

// import ArchiveTimesheet from "./ArchiveTimesheet";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ArchiveIcon from "@mui/icons-material/Archive";

import LoadingSpinner from "../../ReactSpinner/reactSpinner";

function TimeSheet({ currentId, posts, timesheetData }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [entries, setEntries] = useState([]);
  const [projectCode, setProjectCode] = useState("");
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

  const [projectopen, setProjectOpen] = useState(false);

  const [activityopen, setActivityOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for filter
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const user = JSON.parse(localStorage.getItem("profile"));
  // eslint-disable-next-line no-unused-vars
  const [role, setRole] = useState(user?.result?.role);

  const [printingShow, setPrintingShow] = useState(false);

  const [disable, setDisabled] = useState(true);

  const matches = useMediaQuery("(min-width:1120px)");

  const loggedInUserId = user?.result?._id;

  // const role = user?.result?.role;

  // For enabling form only for login users
  useEffect(() => {
    if (loggedInUserId === currentId || role === "admin") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [loggedInUserId, currentId, role]);

  // useEffect(() => {
  //   array.length = 0;
  //   dispatch(getPosts()).then(() => {
  //     // eslint-disable-next-line array-callback-return
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, currentId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    const newEntry = {
      projectCode,
      activityCode,
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
            }
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
        'Invalid entry! Please check your input values and try again. Selected Date must not fall under "SUNDAY" & 2nd-4th "SATURDAY".'
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
      0
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
        'Invalid entry! Please check your input values and try again. Selected Date must not fall under "SUNDAY" & 2nd-4th "SATURDAY".'
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
    setActivityCode(array[index].activityCode);
    setDate(array[index].date);
    setNetTime(array[index].netTime);
    setOverTime(array[index].overTime);
    setRemarks(array[index].remarks);
  };

  const componentRef = useRef();

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const dateTime = `${currentDate} ${currentTime}`;

  const downloadPdf = useReactToPrint({
    content: () => componentRef.current,
    dateTime,

    documentTitle: "TimeSheet Summary",
    onBeforePrint: () => setPrintingShow(true),
    onAfterPrint: () => {
      setPrintingShow(false);
    },
  });

  const handletrue = () => {
    setPrintingShow(true);
    setTimeout(() => {
      downloadPdf();
    }, 10);
  };

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
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                width: "flex",
                padding: "15px",
                backgroundColor: "white",
                margin: "10px 8px 0px 20px",
                borderRadius: "12px",
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
                      defaultValue={date}
                      onChange={handleCheck}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label
                      style={{ color: "#16355d", fontFamily: "Roboto" }}
                      htmlFor="projectCode"
                    >
                      Project Code:
                    </label>

                    <input
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
                    />
                    {/* ______________________________________pop window contents_____________________________________________ */}
                  </div>

                  <div className="form-group">
                    <label
                      style={{ color: "#16355d", fontFamily: "Roboto" }}
                      htmlFor="activityCode"
                    >
                      Activity Code:
                    </label>
                    <input
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
                      id="activityCode"
                      // value={activityCode}
                      defaultValue={activityCode}
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
                      htmlFor="netTime"
                    >
                      Net Time (hrs):
                    </label>
                    <input
                      type="number"
                      id="netTime"
                      // value={netTime}
                      defaultValue={netTime}
                      onChange={(e) => setNetTime(parseFloat(e.target.value))}
                      step="0.1"
                      // max={8}
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
                      // value={overTime}
                      defaultValue={overTime}
                      onChange={(e) => setOverTime(parseFloat(e.target.value))}
                      step="0.1"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      style={{ color: "#16355d", fontFamily: "Roboto" }}
                      htmlFor="overTime"
                    >
                      Remarks:
                    </label>
                    <input
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
                      id="remarks"
                      placeholder="Enter text (max 50 chars)"
                      maxLength={50} // ✅ correct way in React
                      // value={overTime}
                      defaultValue={remarks}
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
                      <button
                        style={{
                          fontFamily: "Roboto",
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          opacity: isSubmitting ? 0.6 : 1,
                        }}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div style={{ display: "flex" }}>
                            Submitting...
                            <LoadingSpinner size={16} color="#999" />
                          </div>
                        ) : editIndex !== -1 ? (
                          "Update"
                        ) : (
                          "Submit"
                        )}
                      </button>

                      <button
                        style={{ fontFamily: "Roboto" }}
                        type="button"
                        onClick={clearForm}
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </fieldset>
              </form>
            </Card>
            {/* Card for Total Net Time */}
            <Card
              item
              xs={12}
              md={3} // make it a bit wider for visibility
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                background: "linear-gradient(135deg, #ffffff, #f0f4ff)",
                margin: "10px 8px 0px 20px",
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#16355d",
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Total Net Time
              </Typography>

              <Typography
                sx={{
                  color: "#0d325c",
                  fontFamily: "Roboto",
                  fontSize: "28px",
                  fontWeight: 700,
                }}
              >
                {monthlyTotalNetTime} h
              </Typography>

              <Typography
                sx={{
                  color: "#5a6a85",
                  fontFamily: "Roboto",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                Calculated for this month
              </Typography>
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
                  <Grid item>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {/* <Select>Year</Select> */}
                      <select
                        style={{
                          backgroundColor: "#0d325c",
                          color: "white",
                          padding: "5px",
                          fontFamily: "Roboto",
                        }}
                        value={selectedYear}
                        onChange={(e) =>
                          setSelectedYear(parseInt(e.target.value))
                        }
                      >
                        {Array.from(
                          new Set(
                            array.map((entry) =>
                              new Date(entry.date).getFullYear()
                            )
                          )
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
                          backgroundColor: "#0d325c",
                          color: "white",
                          padding: "5px",
                        }}
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
                          {isStatus ? "Active" : "Inactive"}
                        </Button>
                      )}
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
                            padding: "5px",
                            backgroundColor: "#f2f2f2",
                            borderCollapse: "collapse",
                            border: "1px solid black",
                            // marginLeft: "auto",
                            // marginRight: "auto",
                            // borderRadius: "12px",
                            width: "100%",
                            marginBottom: "10px",
                            maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                          }}
                        >
                          {/* <thead> */}
                          <tr
                            height="50px"
                            style={{
                              // backgroundColor: "lightgray",
                              color: "black",
                              // textAlign: "center",
                              fontSize: "20px",
                              fontWeight: "600",
                              border: "1px solid black",
                              borderRadius: "12px",
                            }}
                          >
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
                                      <tr key={index}>
                                        <th
                                          style={{
                                            border: "1px solid black",
                                            textAlign: "center",
                                            fontFamily: "Roboto",
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
                                            border: "1px solid black",
                                            textAlign: "center",
                                            fontFamily: "Roboto",
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
                                      <tr key={index}>
                                        <th
                                          style={{
                                            border: "1px solid black",
                                            textAlign: "center",
                                            fontFamily: "Roboto",
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
                                            border: "1px solid black",
                                            textAlign: "center",
                                            fontFamily: "Roboto",
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
                            <th
                              style={{
                                textAlign: "center",
                                width: "30%",
                                color: "#16355d",
                                fontFamily: "Roboto",
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
                                  (a, b) => new Date(a.date) - new Date(b.date)
                                )
                            ).map((data, index) => (
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
                                <td
                                  style={{
                                    color: "#e55d17",
                                    padding: "10px",
                                    textAlign: "center",
                                  }}
                                >
                                  {data.remarks}
                                </td>

                                {printingShow === false && role === "admin" && (
                                  <td
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                      padding: "10px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <button
                                      id="editButton"
                                      style={{ fontFamily: "Roboto" }}
                                      onClick={() => editEntry(index)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      id="deleteButton"
                                      style={{ fontFamily: "Roboto" }}
                                      onClick={() => deleteEntry(index)}
                                    >
                                      Delete
                                    </button>
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
              <button
                id="download"
                style={{
                  fontFamily: "Roboto",
                  float: "right",
                  marginTop: "100px",
                }}
                onClick={handletrue}
              >
                Download
              </button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default TimeSheet;
