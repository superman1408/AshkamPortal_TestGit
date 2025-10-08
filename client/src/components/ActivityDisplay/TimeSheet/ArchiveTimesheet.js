import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../action/posts";
import { Grid, Button, Divider, Box, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import LOGO from "../../../assets/AshkamLogoTransparentbc.png";

import ComboBox from "./ComboBox";

const ArchiveTimesheet = () => {
  const posts = useSelector((state) => state.posts || []);

  const { id } = useParams(); // from the URL
  const [currentId, setCurrentId] = useState(id); // local state
  const [printingShow, setPrintingShow] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const user = JSON.parse(localStorage.getItem("profile"));

  const role = user.result.role;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts());
    setIsLoading(false);
  }, [dispatch, isLoading]);

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

  const handleGoBack = () => {
    navigate(-1);
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

  return (
    <div>
      {(role === "admin" || role === "manager") && (
        <ComboBox posts={posts} setCurrentId={setCurrentId} />
      )}

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
        Archive Time Sheet
      </strong>

      {/* Main Body */}
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
                  <td style={{ padding: "5px" }}>TIME SHEET SUMMARY</td>
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
                                {post?.firstName.charAt(0).toUpperCase() +
                                  post?.firstName.slice(1).toLowerCase() +
                                  " " +
                                  post?.lastName.charAt(0).toUpperCase() +
                                  post?.lastName.slice(1).toLowerCase()}
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
                                {/* {MONTHS[selectedMonth]} */}
                                {post.date[0]} to{" "}
                                {post.date[post.date.length - 1]}
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
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
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
                </tr>
              </thead>
              <tbody>
                {array
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((data, index) => (
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
        </div>
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
          margin: "40px",
        }}
        onClick={handletrue}
      >
        Download
      </button>
    </div>
  );
};

export default ArchiveTimesheet;
