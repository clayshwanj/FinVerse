import User from "../database/models/user.js";
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

//Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = `${BASE_URL}/auth/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: `Finverse <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset - Finverse",
      html: `<p>Reset your password by clicking the link below:</p>
             <a href="${resetLink}">Reset Password</a>`,
    });

    res.json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending reset email" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.json({ message: "Password reset successfully. You can now log in!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
