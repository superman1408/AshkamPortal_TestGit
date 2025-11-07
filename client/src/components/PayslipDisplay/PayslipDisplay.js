import React, { useEffect, useState } from "react";
import Uploading from "./PayslipLayout/Uploading";
import SlipDownload from "./PayslipDownload/SlipDownload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography, Card, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import LoadingSpinner from ".././ReactSpinner/reactSpinner";
import { CircularProgress } from "@mui/material";

import {
  getPosts,
  getSalarySlipData,
  deleteSalarySlip,
} from "../../action/posts";
import { useParams } from "react-router-dom";
import Panel from "../Panel/Panel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PayslipDisplay = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentId, setCurrentId] = useState(id);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts);

  const salary = useSelector((state) => state.salary);

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch(getPosts());
  //     await dispatch(getSalarySlipData());
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await Promise.all([
          dispatch(getPosts()),
          dispatch(getSalarySlipData()),
        ]);

        setIsLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const verify = () => {
    try {
      if (
        user.result.role === "admin" ||
        (user.result.department.toLowerCase() === "human resource" &&
          user.result.role === "manager")
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Logic for deleting the entry......!!!
  // const deleteEntry = (index) => {
  //   if (window.confirm("Are you sure you want to delete this?")) {
  //     dispatch(deleteSalarySlip(currentId, index))
  //       .then(() => {
  //         setIsLoading(true);
  //         // setEntries(entries.filter((_, i) => i !== index)); // remove from UI
  //         alert("✅ Deleted successfully!");
  //         // navigate(0); // ✅ refresh current route (React way of reload)
  //         dispatch(getSalarySlipData()); // 🔄 refresh data
  //       })
  //       .catch((err) => {
  //         alert("Error While Deleting!");
  //         return console.log("Error in deleting the file..!!");
  //       });
  //   }
  // };

  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this?")) {
  //     dispatch(deleteSalarySlip(id))
  //       .then(() => {
  //         setIsLoading(true);
  //         alert("✅ Deleted successfully!");
  //         dispatch(getSalarySlipData()).then(() => {
  //           setIsLoading(true);
  //         }); // 🔄 refresh data
  //       })
  //       .catch((err) => {
  //         alert("Error While Deleting!");
  //         return console.log("Error in deleting the file..!!");
  //       });
  //   }
  // };
  //

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        setIsLoading(true); // Show loading spinner/button

        await dispatch(deleteSalarySlip(id)); // Delete API call
        await dispatch(getSalarySlipData()); // Refresh data

        // Optional: brief info message before actual delete
        alert("🕓 Deleting the file, please wait...");

        alert("✅ Deleted successfully!");
      } catch (err) {
        console.error("Error while deleting the file:", err);
        alert("❌ Error while deleting!");
      } finally {
        setIsLoading(false); // Hide spinner/button
      }
    }
  };

  // const [post, setPost] = useState();

  const handleGoBack = () => {
    navigate(-1); // this means "go back one step in history"
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex" }}>
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
        <div>
          <strong
            style={{
              color: "#16355d",
              marginLeft: "50px",
              fontFamily: "Roboto",
              fontSize: "30px",
            }}
          >
            Salary Slip
          </strong>
        </div>
      </div>
      <Grid
        sx={{
          display: "flex",
          marginTop: "20px",
          "@media(max-Width:600px)": { flexDirection: "column" },
        }}
      >
        <Grid>
          <Panel />
        </Grid>

        {/*--------------------------------------------------------------------------------------------------  */}
        <Grid>
          <Grid>
            <Card
              elevation={4}
              sx={{ margin: "10px", width: { xs: "auto", md: "1000px" } }}
            >
              {verify() && (
                <>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      textAlign: "center",
                      padding: "2px",
                      fontWeight: "bolder",
                      fontFamily: "Roboto",
                      color: "#16355d",
                    }}
                  >
                    Upload Payslip
                  </Typography>
                  <Uploading
                    posts={posts}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                  />
                </>
              )}
            </Card>
          </Grid>

          <Grid>
            <Card elevation={4} sx={{ margin: "10px" }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                  textAlign: "center",
                  padding: "2px",
                  fontWeight: "bolder",
                  fontFamily: "Roboto",
                  color: "#16355d",
                }}
              >
                Download Payslip
              </Typography>
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
                <SlipDownload
                  posts={posts}
                  currentId={currentId}
                  salary={salary}
                  isLoading={isLoading}
                  deleteEntry={handleDelete}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PayslipDisplay;
