import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import Evolve from "./UnderTrial/Evolve";
import { getPosts } from "../../../action/posts";
import LeaveTable from "./leaveTable";
import Combo from "../../ComboBox/ComboBox";
import ChartComponent from "../pieGraph";

// import AttendanceCombo from "./AttendanceCombo";
// import AttendanceDetail from "./AttendanceDetail";

const LeaveTableDisplay = () => {
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

  const verify = () => {
    const department = user?.result?.department?.toLowerCase();
    const role = user?.result?.role?.toLowerCase();

    if (!department || !role) return false;

    return (
      (department === "human resource" && role === "manager") ||
      role === "admin"
    );
  };


  
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {!isLoading && (
        <>
          {verify() === true && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "1rem",
              }}
            >
              <Combo posts={posts} setCurrentId={setCurrentId} />
            </div>
          )}
          <LeaveTable currentId={currentId} posts={posts} />
        </>
      )}
    </div>
  );
};

export default LeaveTableDisplay;
