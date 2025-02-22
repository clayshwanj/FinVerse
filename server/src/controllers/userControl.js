import User from "../database/models/user";
import bcrypt from "bcryptjs";

//CREATE a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

//READ all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "User not found" });
  }
};

//UPDATE a user by ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

//DELETE a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// export const signUp = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     if ((!name, !email, !password)) {
//       res.status(400).json({ message: "fill the name ,email , password" });
//     }
//     const user = await User.findOne({ email });
//     if (user) {
//       res.status(400).json({ message: "user exist" });
//     }
//     const newUser = await User.create();
//     res.status(200).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: "server error" });
//   }
// };
