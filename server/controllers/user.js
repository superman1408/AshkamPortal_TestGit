import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import AuthenticateUser from '../model/authDetails.js';


export const signin = async (req,res) => {
    // const { email, password } = req.body;
    console.log("HELLO SIGN UP");
    res.status(200).send('sign IN');

    // try {
    //     const existingUser = await AuthenticateUser.findOne({ email: email});

    //     if (!existingUser) return res.status(404).json({message: "User does not exist"});

    //     const isPasswordsMatch = await bcrypt.compare(password, existingUser.password);

    //     if (!isPasswordsMatch) return res.status(400).json({message: "Passwords do not match"});

    //     const token = jwt.sign({email: existingUser.email, id: existingUser._id },'test', {expiresIn:"1h"});

    //     res.status(200).json({result: existingUser, token});

    // } catch (error) {
    //     // res.status(400).json({message:'Something went wrong'});
    //     console.log(error);
    // }
};




export const signup = async (req,res) => {
    // const { firstName, lastName, email, password, confirmPassword, role } = req.body;
    console.log("HELLO SIGN UP");
    res.status(200).send('sign UP');

    // try {
    //     const existingUser = await AuthenticateUser.findOne({ email });

    //     if(existingUser) return res.status(400).json({message: "User already exist bro"});

    //     if(password !== confirmPassword) return res.status(400).json({message: "Passwords do not match"});

    //     const hashedPassword = await bcrypt.hash(password, 12);

    //     const result = await AuthenticateUser.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword});

    //     const token = jwt.sign({ email: result.email, id: result._id}, 'test', {expiresIn:"1h"});

    //     res.status(200).json({result, token});


    // } catch (error) {
    //     // res.status(500).json({message:'Something went wrong'});
    //     console.log(error);
    // }
};
