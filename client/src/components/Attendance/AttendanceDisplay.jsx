import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import Evolve from "./UnderTrial/Evolve";
import { getPosts } from "../../action/posts";
import { getAttendancePosts } from "../../action/attendance";

import AttendanceCombo from "./AttendanceCombo";
import AttendanceDetail from "./AttendanceDetail";

const AttendanceDisplay = () => {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);
  const posts = useSelector((state) => state.posts);
  const attend = useSelector((state) => state.attend);

  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState();
  const [attendDetail, setAttendDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile"));
  const role = user.result.role;

  // useEffect(() => {
  //   dispatch(getAttendancePosts());
  //   // console.log(attend);
  // }, [dispatch, attend]);

  // console.log(attend);

  useEffect(() => {
    if (posts) {
      dispatch(getPosts()).then(() => {
        // eslint-disable-next-line array-callback-return
        posts.map((p) => {
          if (p._id === currentId) {
            setNewPost(p);
          }
        });
      });
    }
    setIsLoading(false);
  }, [isLoading, dispatch, posts]);

  useEffect(() => {
    if (!attend) {
      dispatch(getAttendancePosts()).then(() => {
        // eslint-disable-next-line array-callback-return
        console.log(attend);

        attend.map((a) => {
          if (a._id === currentId) {
            setAttendDetail(a);
          }
        });
      });
    }

    setIsLoading(false);
  }, [isLoading, dispatch, attend]);

  const verify = () => {
    try {
      if (
        user.result.role === "admin" ||
        (user.result.department.toLowerCase() === "human resource" &&
          user.result.role === "manager")
        // user.result.role === "admin"
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Home
      {!isLoading && (
        <>
          {verify() === true && (
            <AttendanceCombo posts={posts} setCurrentId={setCurrentId} />
          )}
          <AttendanceDetail
            currentId={currentId}
            attend={attend}
            posts={posts}
          />
        </>
      )}
    </div>
  );
};

export default AttendanceDisplay;
