import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Evolve from "./TimeSheet/TimeSheet";
import { getPosts } from "../../action/posts";

import "./Style.css";

import ComboBox from "../ComboBox/ComboBox";
import { getTimesheetPosts } from "../../action/timesheet";

const ActivityDisplay = () => {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);
  const posts = useSelector((state) => state.posts);
  const tSheet = useSelector((state) => state.tSheet);
  const dispatch = useDispatch();
  const [post, setPost] = useState();
  const [timesheetDetail, setTimesheetDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile"));
  const role = user.result.role;

  // console.log(tSheet);

  useEffect(() => {
    if (posts) {
      dispatch(getPosts()).then(() => {
        console.log("Activity Display is recieving the posts..!!!@@@@@@");
        // eslint-disable-next-line array-callback-return
        posts.map((post) => {
          if (post._id === currentId) {
            setPost(post);
          }
        });
      });
    }
    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    if (!tSheet) {
      dispatch(getTimesheetPosts()).then(() => {
        console.log(
          "Activity Display is recieving the posts in Timesheet..!!!@@@@@@"
        );
        // eslint-disable-next-line array-callback-return
        tSheet.map((t) => {
          if (t._id === currentId) {
            setTimesheetDetail(t);
          }
        });
      });
    }
    setIsLoading(false);
  }, [isLoading]);

  // console.log(tSheet);

  return (
    <div>
      {!isLoading && (
        <>
          {role === "manager" && (
            <ComboBox posts={posts} setCurrentId={setCurrentId} />
          )}
          {role === "admin" && (
            <ComboBox posts={posts} setCurrentId={setCurrentId} />
          )}
          <Evolve currentId={currentId} posts={posts} tSheet={tSheet} />
        </>
      )}
    </div>
  );
};

export default ActivityDisplay;
