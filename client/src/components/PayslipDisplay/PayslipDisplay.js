import React, { useEffect, useState } from "react";
import Uploading from "./PayslipLayout/Uploading";
import SlipDownload from "./PayslipDownload/SlipDownload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";

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

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getPosts());
      await dispatch(getSalarySlipData());
      setIsLoading(false);
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
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      setIsLoading(true); // start loading early

      dispatch(deleteSalarySlip(id))
        .then(() => {
          return dispatch(getSalarySlipData()); // refresh data
        })
        .then(() => {
          setIsLoading(false); // stop loading
          alert("✅ Deleted successfully!");
        })
        .catch((err) => {
          setIsLoading(false);
          alert("❌ Error while deleting!");
          console.error("Error in deleting the file:", err);
        });
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
              <SlipDownload
                posts={posts}
                currentId={currentId}
                salary={salary}
                isLoading={isLoading}
                deleteEntry={handleDelete}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PayslipDisplay;
