import React from "react";

import { useSelector } from "react-redux";

import Post from "./Post/post";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  // console.log(posts);
  return (
    <>
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </>
  );
};

export default Posts;
