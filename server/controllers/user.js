import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import AuthenticateUser from "../model/authDetails.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await AuthenticateUser.findOne({ email: email });

    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const isPasswordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordsMatch)
      return res.status(400).json({ message: "Passwords do not match" });

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
      },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};




export const signup = async (req, res) => {
  const { email, password, confirmPassword, role, firstName, lastName } = req.body;

  // Checking for empty fields
  const admin_code = req.params;
  const secretCode = process.env.ADMIN_SECRET_CODE;
  
    

  try {
    const existingUser = await AuthenticateUser.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exist bro" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    if (role === "admin") {
      if (admin_code.code !== secretCode) 
      return res.status(400).json({ message: "Secret Code do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await AuthenticateUser.create({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    // console.log(error);
  }
};


export const reset = async (req, res) => {
  const { emailToChange, passwordtoChange, confirmPasswordToCompare } = req.body;

  const admin_code = req.params;
  const secretCode = process.env.ADMIN_SECRET_CODE;
  


  try {
    const existingUser = await AuthenticateUser.findOne({email : emailToChange});

    if (!existingUser)
      return res.status(400).json({ message: "User not available in data base" });

    
    if (passwordtoChange !== confirmPasswordToCompare)
        return res.status(400).json({ message: "Passwords do not match" });
    
    if (admin_code.code !== secretCode) 
      return res.status(400).json({ message: "Secret Code do not match" });
    
    
    const hashedPassword = await bcrypt.hash(passwordtoChange, 12);
    existingUser.password = hashedPassword;

    await existingUser.save();

    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong in reset..!!"});
  }
};
