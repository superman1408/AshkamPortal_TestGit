import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Evolve from "./UnderTrial/Evolve";
import { getPosts } from "../../action/posts";

import './Style.css';

import ComboBox from "./UnderTrial/ComboBox";


const ActivityDisplay = () => {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [post, setPost] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    // setCurrentId(id);
    if (!post) {
      dispatch(getPosts()).then(() => {
        console.log("Activity Display is recieving the posts..!!!@@@@@@")
        // eslint-disable-next-line array-callback-return
        posts.map((post) => {
          if (post._id === currentId) {
            setPost(post);
            setRole(post.role);
          }
        })
      })
    }
  }, [currentId, id, dispatch, posts, post]);







  return (
    <>
      {
        role === "manager"  && (
          <ComboBox posts={posts} setCurrentId={setCurrentId}/>
        )
      }
      {
        role === "admin"  && (
          <ComboBox posts={posts} setCurrentId={setCurrentId}/>
        )
      }
      <Evolve currentId={currentId} posts={posts}/>
    </>
  );
};

export default ActivityDisplay;
