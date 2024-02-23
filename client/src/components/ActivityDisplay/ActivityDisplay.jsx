import React, { useEffect, useState } from "react";

// import TimeSheet from "./TimeSheet/TimeSheet";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import TimeSheetForm from "./TimeSheetForm/TimeSheetForm";
// import TimeTrial from "./UnderTrial/TimeTrial";
// import TimeSheetTable from "./TimeSheet/TimeSheetTable";
// import Form from "./TimeSheetForm/Form";
import Evolve from "./UnderTrial/Evolve";
import { fetchPosts } from "../../api";

import './Style.css';


const ActivityDisplay = () => {
  const [currentId, setCurrentId] = useState(null);
  const { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentId(id);
    if (!posts) {
      dispatch(fetchPosts());
    }
  }, [currentId, id, dispatch, posts]);

  // console.log(posts)

  return (
    <>
        <div><Evolve currentId={currentId} posts={posts}/></div>
    </>
  );
};

export default ActivityDisplay;
