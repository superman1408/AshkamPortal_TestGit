import React, { useEffect, useState } from "react";
import Uploading from "./PayslipLayout/Uploading";
import SlipDownload from "./PayslipDownload/SlipDownload";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import { getPosts, getSalarySlipData } from "../../action/posts";
import { useParams } from "react-router-dom";
import Panel from "../Panel/Panel";

const PayslipDisplay = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentId, setCurrentId] = useState(id);
  const dispatch = useDispatch();
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
        // user.result.role === "admin" ||
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

  // const [post, setPost] = useState();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            {verify() === true && (
              <div>
                <Uploading
                  posts={posts}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              </div>
            )}
          </Grid>

          <Grid>
            <SlipDownload
              posts={posts}
              currentId={currentId}
              salary={salary}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PayslipDisplay;
