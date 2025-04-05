import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to User เพราะ เราจะเก็บ id ของ user ที่ follow 
        ref: "User", // Reference to User model
        default: [], // Default to an empty array
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to User
        ref: "User", // Reference to User model 
        default: [], // Default to an empty array
      },
    ],

    profileImage: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", userSchema);

export default User;