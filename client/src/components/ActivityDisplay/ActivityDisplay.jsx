import React, { useEffect, useState } from 'react';




import TimeSheet from './TimeSheet/TimeSheet';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import TimeSheetForm from './TimeSheetForm/TimeSheetForm';
import { getPosts } from '../../action/posts';

const ActivityDisplay = () => {
  const [ currentId, setCurrentId] = useState(null);
  const { id } = useParams();
  const { posts } = useSelector((state) => state.posts );
  const dispatch = useDispatch();


  useEffect(() => {
    setCurrentId(id);
    if (!posts) {
      dispatch(getPosts());
    }
  },[currentId, id, dispatch, posts]);




  return (
    // <div>ActivityDisplay</div>
    <div>
        {/* <TimeSheetForm/> */}
        
        <TimeSheet posts={posts} currentId={currentId}/>
    </div>
  )
}

export default ActivityDisplay;