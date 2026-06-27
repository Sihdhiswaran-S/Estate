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
    }
    const isPasswordValid = bcrypt.compareSync(password, validuser.password);
    if (!isPasswordValid) {
      return next(errorHandle(401, "Invalid password"));
    }
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password: pass, ...rest } = validuser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ rest, message: "User signed in successfully" });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  console.log("google auth controller");
  try {
    const { email, name, photoURL } = req.body;
    if (!email) {
      return next(
        errorHandle(400, "Email is required for Google authentication"),
      );
    }

    const user = await User.findOne({ email });
    console.log("google auth user", user);

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ rest });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcrypt.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashPassword,
        avatar: photoURL,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ rest });
    }
  } catch (error) {
    next(error);
  }
};
