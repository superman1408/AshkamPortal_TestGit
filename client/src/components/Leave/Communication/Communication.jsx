import React from "react";
// import { useDispatch, useSelector } from 'react-redux';
import { Grid } from "@mui/material";
import Panel from "../../Panel/Panel";

// import Inbox from './Inbox/inbox';
// import MessageBody from './Message/MessageBody';
// import { getPosts } from '../../../actions/posts';

const Communication = () => {
  // const user = JSON.parse(localStorage.getItem("profile"));
  // const [currentId, setCurrentId] = useState(user.result.id);
  // const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts );

  // console.log(posts);

  // useEffect(() => {
  //   dispatch(getPosts());
  // },[dispatch,currentId]);

  return (
    <Grid sx={{ display: "flex", flexDirection: "col", padding: "2px" }}>
      <Grid sx={{ display: "flex", flexDirection: "row", marginRight: "10px" }}>
        <Panel />
      </Grid>
      <h1>Messages</h1>
      <br />
      {/* <div>
        {
          user && (
              posts.map((post) => (
                post.name === user.result.name && (
                  <div key={post.name} >
                    <Inbox  post={post}  setCurrentId={setCurrentId}/>
                  </div>
                )
              ))
          )
        }
      </div> */}
      {/* <div>
        {
          user && (
            posts.map((post) => (
              post._id === currentId && (
                <div key={post.contact}  className='grid grid-row gap-1' >
                  <MessageBody   post={post} currentId={currentId}/>
                </div>
              )
            ))
          )
        }
      </div> */}
    </Grid>
  );
};

export default Communication;
