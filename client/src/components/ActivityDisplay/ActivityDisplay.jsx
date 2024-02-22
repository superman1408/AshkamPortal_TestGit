import React, { useEffect, useState } from "react";

// import TimeSheet from "./TimeSheet/TimeSheet";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import TimeSheetForm from "./TimeSheetForm/TimeSheetForm";
// import TimeTrial from "./UnderTrial/TimeTrial";
import TimeSheetTable from "./TimeSheet/TimeSheetTable";
import Form from "./TimeSheetForm/Form";
import Evolve from "./UnderTrial/Evolve";
import { getPosts } from "../../action/posts";

import './Style.css';


const ActivityDisplay = () => {
  const [currentId, setCurrentId] = useState(null);
  const { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentId(id);
    if (posts) {
      dispatch(getPosts());
    }
  }, [currentId, id, dispatch, posts]);

  // console.log(posts)

  return (
    // <div>ActivityDisplay</div>
    <>
      <h2 style={{ color: "#16355d", marginLeft: "50px", fontWeight: "bold" }}>Time Sheet Activity Display</h2>
      <div className="time-sheet-container" style={{ display: "flex",  flexDirection: 'row',  justifyContent:'space-evenly' }} >
        <div><Form currentId={currentId}/></div>
        <div><TimeSheetTable currentId={currentId} posts={posts} /></div>
      </div>
    
      {/* <div><Evolve currentId={currentId}/></div> */}
      {/* <div>
        <TimeSheetForm currentId={currentId} />
      </div> */}
      {/* <div>
        {posts.map(
          (post) =>
            post._id === currentId && (
              <div key={post._id}>
                <TimeSheet post={post} currentId={currentId} />
              </div>
            )
          // <TimeSheet post={post} currentId={currentId}/>
        )}
      </div> */}
    </>
  );
};

export default ActivityDisplay;
