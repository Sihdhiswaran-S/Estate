import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandle } from "../Utils/error.js";
export const testUserRoute = (req, res) => {
  res.json({ message: "User route is working!" });
};
export const userUpdate = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandle(403, "You can update only your account!"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true },
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
