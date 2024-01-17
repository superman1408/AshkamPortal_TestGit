import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

// import Post from "./Post/post";
import { getPosts } from "../../action/posts";

const Posts = ({ setCurrentId }) => {
  // const user = JSON.parse(localStorage.getItem("profile"));
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [posts,dispatch]);

  // console.log(posts);
  return (
    <>
    Hello
      {/* {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))} */}
    </>
  );
};

export default Posts;
