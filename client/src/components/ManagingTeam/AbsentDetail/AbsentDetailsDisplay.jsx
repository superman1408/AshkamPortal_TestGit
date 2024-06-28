import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPosts } from "../../../action/posts";
import AbsentDetails from "./AbsentDetails";
import AbsentComboBox from "./ComboBox";
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
    <div style={{ alignItems: "center", justifyContent: "center" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "50px",
          justifyContent: "center",
        }}
      >
        <AbsentComboBox posts={posts} setCurrentId={setCurrentId} />
        <Divider
          sx={{
            margin: "20px 0px 20px 0px",
            borderWidth: "7px",
            bgcolor: "#e55d17",
          }}
        />
        <AbsentDetails posts={posts} currentId={currentId} />
      </Card>
    </div>
  );
};

export default AbsentDetailsDisplay;
