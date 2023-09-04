import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";
import Inbox from "./Inbox/inbox";
import Message from "./Message/message";
import useStyles from "./communicationStyle";
import { getPosts } from "../../../action/posts";

const Communication = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentId, setCurrentId] = useState(user.result._id);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch,posts]);

  // console.log(posts);
  return (
    <Box container component="main" className={classes.splitScreen}>
      <div className={classes.topPane}>
        {user && (
          posts.map(
            (post) =>
              post.name === user.result.employeeName && (
                <div key={post.name}>
                  <Inbox post={post} setCurrentId={setCurrentId} />
                </div>
              )
          )
        )
          }
      </div>
      <div className={classes.bottomPane}>
        {user && (
          posts.map(
            (post) =>
              post._id === currentId && (
                <div key={post.name}>
                  <Message post={post} currentId={currentId} />
                </div>
              )
          )
        )
          }
      </div>
    </Box>
  );
};

// {
//   /* <div className="flex flex-cols-2 bg-blue-200 m-2">
// <div>
//   {user &&
//     posts.map(
//       (post) =>
//         post.name === user.result.name && (
//           <div
//             key={post.name}
//             withborder="true"
//             color="green"
//             className="flex flex-col  bg-green-200 gap-1 p-2"
//             elevation={3}
//           >
//             <Inbox post={post} setCurrentId={setCurrentId} />
//           </div>
//         )
//     )}
// </div>
// <div>
//   {user &&
//     posts.map(
//       (post) =>
//         post._id === currentId && (
//           <div key={post.name} className="grid grid-row gap-1">
//             <MessageBody post={post} currentId={currentId} />
//           </div>
//         )
//     )}
// </div>
// </div>
// );
// }; */
// }

export default Communication;
