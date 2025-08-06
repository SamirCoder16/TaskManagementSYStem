import user from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!email || !password || !fullName) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ message: "User already exists try another email " });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry time for this cookies
    });

    res.status(201).json({ success: true, user: newUser, token: token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID format" });
    }
    const findUser = await user.findById(userId).select("-password");

    if (!findUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newUser = {
      fullName: findUser.fullName,
      email: findUser.email,
      createdAt: findUser.createdAt,
      updatedAt: findUser.updatedAt,
    };

    res.status(200).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await user.find().select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal server error" });
   }  
}