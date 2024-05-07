// import { } from "bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalarySlipData } from "../../../action/posts";
import { Typography, Button } from "@mui/material";

const SlipDownload = () => {
  const dispatch = useDispatch();
  const salary = useSelector((state) => state.salary);
  



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
        <Typography>Its working</Typography>
        <Button onClick={handleDispatch}>Click it</Button>
      </div>
    </>
  );
};

export default SlipDownload;
