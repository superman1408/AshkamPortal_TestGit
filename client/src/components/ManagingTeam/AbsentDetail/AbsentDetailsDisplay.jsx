import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPosts } from "../../../action/posts";
import AbsentDetails from "./AbsentDetails";
import AbsentComboBox from "../../ComboBox/ComboBox";
import Panel from "../../Panel/Panel";
import { useParams } from "react-router-dom";
import { Card, Divider } from "@mui/material";

const AbsentDetailsDisplay = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts);

  const [currentId, setCurrentId] = useState(id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (posts) {
      dispatch(getPosts()).then(() => {
        // eslint-disable-next-line array-callback-return
        posts.map((post) => {
          if (post._id === currentId) {
            setCurrentId(post._id);
          }
        });
      });
    }
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      {/* <div>
        <Panel />
      </div> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: { xs: "20px", md: "50px" },
            width: { xs: "90%", sm: "80%", md: "60%" },
            padding: "16px",
          }}
        >
          <AbsentComboBox posts={posts} setCurrentId={setCurrentId} />
          <Divider
            sx={{
              margin: "20px 0",
              borderWidth: "5px",
              bgcolor: "#e55d17",
            }}
          />
          <AbsentDetails posts={posts} currentId={currentId} />
        </Card>
      </div>
    </div>
  );
};

export default AbsentDetailsDisplay;
