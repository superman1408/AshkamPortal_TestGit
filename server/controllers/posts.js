import mongoose from "mongoose";

import PostMessage from "../model/postMessage.js";

// ________________________get operation___________________________

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    // console.log(postMessage);
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const postMessage = await PostMessage.findById(id);
    res.status(200).json(postMessage);
  } catch (error) {
    console.log(error);
  }
};

// ________________________create operation___________________________

export const createPost = async (req, res) => {
  const Post = req.body;
  const newPost = new PostMessage(Post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// ________________________update operation___________________________

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("no post with that id found");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

// _________________________update Status_____________________________

// ________________________delete operation___________________________

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id found");

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export const sendData = async (req, res) => {
  const { id } = req.params;
  const value = req.body;
  // console.log(id);

  const post = await PostMessage.findById(id);
  post.recipient.push(value.recipient);
  post.requiredMessage.push(value.requiredMessage);
  post.subject.push(value.subject);

  const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatePost);
};

export const updatedStatus = async (req, res) => {
  console.log("Yes i can change the status");
  const { id } = req.params;
  console.log(id);
  const value = req.body;
  console.log(value);

  const post = await PostMessage.findById(id);

  post.status.push(value.status);

  const statusUpdate = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(statusUpdate);
};
