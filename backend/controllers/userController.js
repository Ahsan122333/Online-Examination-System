import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, -"password");
    res.status(200).json({ allUsers });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// }
export const getUserType = async (req, res) => {
  const { email } = req.params;
  try {
    const userCheck = await User.findOne({ email: email });
    const user_type = userCheck.user_type;
    res.status(200).json({ user_type });
  } catch (error) {
    console.error("Error getting user type:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// exports.updateUserProfile = async (req, res) => {
//   // Implement logic to update user profile information
// };

// exports.deleteUserProfile = async (req, res) => {
//   // Implement logic to delete user profile
// };
