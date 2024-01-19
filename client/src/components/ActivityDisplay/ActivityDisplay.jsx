import React, { useEffect, useState } from "react";

<<<<<<< HEAD
import TimeSheet from "./TimeSheet/TimeSheet";
import { useParams } from "react-router-dom";
// import TimeSheetForm from './TimeSheetForm/TimeSheetForm';
=======



import TimeSheet from './TimeSheet/TimeSheet';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TimeSheetForm from './TimeSheetForm/TimeSheetForm';
import { getPosts } from '../../action/posts';
>>>>>>> 5e877d696af845e64f38556efb48fd3457cde5d2

const ActivityDisplay = () => {
  const [currentId, setCurrentId] = useState(null);
  const { id } = useParams();
  const  posts  = useSelector((state) => state.posts );
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentId(id);
<<<<<<< HEAD
  }, [currentId, id]);
=======
    if (posts) {
      dispatch(getPosts());
    }
  },[currentId, id, dispatch, posts]);

  // console.log(posts)






>>>>>>> 5e877d696af845e64f38556efb48fd3457cde5d2

  return (
    // <div>ActivityDisplay</div>
    <div>
<<<<<<< HEAD
      {/* <TimeSheetForm/> */}
=======
        <TimeSheetForm currentId={currentId}/>

        {
          posts.map((post) => (
            post._id === currentId && (
              <div key={post._id}>
                <TimeSheet post={post} currentId={currentId} />
              </div>
              
            )
            // <TimeSheet post={post} currentId={currentId}/>
          ))
        }
        
        
    </div>
  )
}
>>>>>>> 5e877d696af845e64f38556efb48fd3457cde5d2

      <TimeSheet currentId={currentId} />
    </div>
  );
};

export default ActivityDisplay;
