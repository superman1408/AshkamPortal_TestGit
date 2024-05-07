// import { } from "bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalarySlipData } from "../../../action/posts";
import { Typography, Button, Grid, Card } from "@mui/material";

const SlipDownload = () => {
  const dispatch = useDispatch();
  const salary = useSelector((state) => state.salary);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(getSalarySlipData());
  }, [dispatch, salary]);

  const handleDispatch = () => {
    console.log("Button is working");
    // dispatch(getSalarySlipData()).then(() => {
    //   console.log("working...!!!");
    // });
  };

  // console.log(salary);

  return (
    <>
      <div>
        <Grid sx={{ display: "flex", marginLeft: "70px" }}>
          <Grid>
            <Card sx={{ display: "flex", padding: "10px" }}>
              <form onSubmit={handleSubmit} className="time-sheet-form">
                <div className="form-group">
                  <label
                    style={{ color: "#16355d", fontFamily: "Roboto" }}
                    htmlFor="projectCode"
                  >
                    Employee ID
                  </label>
                  <label
                    style={{ color: "#16355d", fontFamily: "Roboto" }}
                    htmlFor="projectCode"
                  >
                    {}
                  </label>
                </div>
                <div className="form-group">
                  <label
                    style={{ color: "#16355d", fontFamily: "Roboto" }}
                    htmlFor="projectCode"
                  >
                    Employee Name
                  </label>

                  <label
                    style={{ color: "#16355d", fontFamily: "Roboto" }}
                    htmlFor="projectCode"
                  >
                    {}
                  </label>
                </div>
                <div className="form-group">
                  <label
                    style={{ color: "#16355d", fontFamily: "Roboto" }}
                    htmlFor="projectCode"
                  >
                    Title:
                  </label>

                  <label style={{ color: "#16355d", fontFamily: "Roboto" }}>
                    {}
                  </label>
                  <button style={{ marginTop: "20px" }}>Download</button>
                </div>
              </form>
            </Card>
          </Grid>
        </Grid>
        <Typography>Its working</Typography>
        <Button onClick={handleDispatch}>Click it</Button>
      </div>
    </>
  );
};

export default SlipDownload;
