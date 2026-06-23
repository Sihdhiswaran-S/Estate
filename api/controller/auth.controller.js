import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandle } from "../Utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  console.log(req.body);
  console.log("signup controller");
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user", error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validuser = await User.findOne({ email });
    if (!validuser) {
      return next(errorHandle(404, "User not found"));
      console.log("vu "+validuser);
    }
    const isPasswordValid = bcrypt.compareSync(password, validuser.password);
    if (!isPasswordValid) {
      return next(errorHandle(401, "Invalid password"));
    }
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const {password:pass,...rest}=validuser._doc;
     res
       .cookie("access_token", token, { httpOnly: true })
       .status(200)
       .json({ rest, message: "User signed in successfully" });
  } catch (error) {
    next(error);
  }
};
