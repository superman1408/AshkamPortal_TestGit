import mongoose from "mongoose";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import AuthDetails from "../model/authDetails.js";

// export const SignIn = async (req, res) => {
//   const Auth = req.body;
//   const newAuth = new AuthDetails(Auth);
//   try {
//     await newAuth.save();
//     res.status(201).json(newAuth);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await AuthDetails.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "user doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
  }
};

const newLocal = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await AuthDetails.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "user already exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password doesn't match" });

    const hidePassword = await bcrypt.hash(password, 12);
    const result = await AuthDetails.create({
      email,
      password: hidePassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
  }
};
export const signUp = newLocal;
