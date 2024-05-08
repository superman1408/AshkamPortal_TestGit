import React, { useEffect, useState } from "react";
import Uploading from "./PayslipLayout/Uploading";
import SlipDownload from "./PayslipDownload/SlipDownload";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../action/posts";
import { useParams } from "react-router-dom";

const PayslipDisplay = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [currentId, setCurrentId] = useState(id);
  const [post, setPost] = useState();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (posts) {
      dispatch(getPosts());

      posts.map((post) => {
        if (post._id === currentId) {
          setPost(post);
        }
      });
    }
  }, [dispatch, currentId]);

  return (
    <div>
      <Uploading />
      <SlipDownload posts={posts} currentId={currentId} />
    </div>
  );
};

export default PayslipDisplay;
