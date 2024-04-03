import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import Evolve from "./UnderTrial/Evolve";
import { getPosts } from "../../action/posts";

import AttendanceCombo from "./AttendanceCombo";
import AttendanceDetail from "./AttendanceDetail";

const AttendanceDisplay = () => {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile"));
  const role = user.result.role;

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

  // const handleUserChange = () => {
  //   // Reset totalHours to null when user changes
  //   setTotalHours(null);
  // };

  return (
    <div>
      
      {!isLoading && (
        <>
          {role === "manager" && (
            <AttendanceCombo
              posts={posts}
              setCurrentId={setCurrentId}
              // onUserChange={handleUserChange}
            />
          )}
          {role === "admin" && (
            <AttendanceCombo posts={posts} setCurrentId={setCurrentId} />
          )}
          <AttendanceDetail currentId={currentId} posts={posts} />
        </>
      )}
    </div>
  );
};

export default AttendanceDisplay;
