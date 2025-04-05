import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

const signUp = async (req, res) => {
  try {
    const { userName, fullName, email, password } = req.body;

    // Check if all required fields are provided
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { userName }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //! after all chenges it to password format that more secure
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        fullName: newUser.fullName,
        email: newUser.email,
        profileImage: newUser.profileImage,
        coverImage: newUser.coverImage,
        followers: newUser.followers,
        following: newUser.following,
      },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try{
    const { userName, password } = req.body
    const user = await User.findOne({userName})
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password || "");
    if (!isPasswordValid ) {
      return res.status(401).json({ message: "Invalid password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        coverImage: user.coverImage,
        followers: user.followers,
        following: user.following,
      },
    });

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true, // ตั้งค่าเป็น true เพื่อป้องกันการเข้าถึงจาก JavaScript
      secure: true, // ตั้งค่าเป็น true ใน Production
      sameSite: "none", // ตั้งค่าเป็น 'none' เพื่อให้ทำงานได้ใน cross-site
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { signUp, login, logout };
