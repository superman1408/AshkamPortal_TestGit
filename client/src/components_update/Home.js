import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../action/posts";

import Form from "../components_update/Form/form";
import Posts from "../components_update/Posts/posts";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <>
      <div>
        <div>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
      <div>
        <Posts setCurrentId={setCurrentId} />
      </div>
    </>
  );
};

export default Home;
