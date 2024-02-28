import mongoose from "mongoose";

import AuthenticateUser from "../model/authDetails.js";

// ________________________get operation___________________________

export const getPosts = async (req, res) => {
  try {
    const postMessage = await AuthenticateUser.find({});
    // console.log(postMessage);
    res.status(200).json(postMessage);
    // console.log("postMessage", postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const postMessage = await AuthenticateUser.findById(id);
    res.status(200).json(postMessage);
  } catch (error) {
    console.log(error);
  }
};

// ________________________create operation___________________________

export const createPost = async (req, res) => {
  const Post = req.body;
  const newPost = new AuthenticateUser(Post);
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

  const updatedPost = await AuthenticateUser.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

// ________________________delete operation___________________________

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id found");

  await AuthenticateUser.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

// __________________________________________________________________________________

export const sendData = async (req, res) => {
  const { id } = req.params;
  const value = req.body;
  console.log("value", value);
  console.log("value of this part is working");
  console.log(id);

  const post = await AuthenticateUser.findById(id);
  post.recipient.push(value.recipient);
  post.requiredMessage.push(value.requiredMessage);
  post.subject.push(value.subject);
  console.log(value.recipient);

  const updatePost = await AuthenticateUser.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatePost);
};

export const updatedStatus = async (req, res) => {
  console.log("Yes i can change the status");
  const { id } = req.params;
  // console.log(id);
  const value = req.body;
  // console.log(value);

  const post = await AuthenticateUser.findById(id);

  post.status.push(value.status);

  const statusUpdate = await AuthenticateUser.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(statusUpdate);
};

// _________________________To Do List Status_____________________________
export const todoList = async (req, res) => {
  const { id } = req.params;
  const value = req.body;

  const user = await AuthenticateUser.findById(id);

  try {
    user.projectCode.push(value.projectCode);
    user.activityCode.push(value.activityCode);
    user.date.push(value.date);
    user.netTime.push(value.netTime);
    user.overTime.push(value.overTime);

    const updatedPost = await AuthenticateUser.findByIdAndUpdate(id, user, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// ____________________________delete activity______________________________

export const deleteActivity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id found");

  await AuthenticateUser.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

// _________________________Skill Data Status_____________________________
export const skillData = async (req, res) => {
  const { id } = req.params;
  const value = req.body;
  console.log(value);

  const user = await AuthenticateUser.findById(id);
  console.log("user");

  try {
    user.skill1.push(value.formData.skill1);
    user.skill2.push(value.formData.skill2);
    user.skill3.push(value.formData.skill3);

    const updatedPost = await AuthenticateUser.findByIdAndUpdate(id, user, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
