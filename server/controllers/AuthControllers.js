import User from "./../models/UserModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const Register = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const user = await User.signup(data);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const Login = async (req, res) => {
  const { userNameOrEmail , password } = req.body;
  try {
    const user = await User.login(userNameOrEmail, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};