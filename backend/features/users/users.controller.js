import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import crypto from "crypto";

import UsersModel from "./users.model.js";
import transporter from "../../middlewares/emailTransporter.middleware.js";
import UserRepository from "./users.repository.js";
import { log } from "console";

const secretKey = process.env.JWT_SECRET;
// console.log("Secret key: " + secretKey);

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      console.log(name, email, password);
      const newUser = await this.userRepository.addUser(name, email, password);
      res.status(201).send(newUser);
    } catch (err) {
      console.error("Error signing up user:", err);
      res.status(500).send("Internal server error");
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.getUser(email, password);
      if (user) {
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
          },
          secretKey,
          {
            expiresIn: "24h",
          }
        );
        res.cookie("jwtToken", token, {
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.cookie("userId", user._id, {
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.cookie("userInfo", JSON.stringify(user), {
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).send({
          jwtToken: token,
          user: user,
        });
      } else {
        res.status(401).send("Invalid credentials");
      }
    } catch (err) {
      console.error("Error signing in user:", err);
      res.status(500).send("Internal server error");
    }
  }

  async getUserFromId(req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await this.userRepository.getOneUser(userId);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      console.error("Error fetching user by ID:", err);
      res.status(500).send("Internal server error");
    }
  }

  getUserIdOfLoggedInUser(req, res, next) {
    try {
      if (req.cookies.userId) {
        res.status(200).send(req.cookies.userId);
      } else {
        res.status(401).send("Login first");
      }
    } catch (err) {
      console.error("Error getting logged in user ID:", err);
      res.status(500).send("Internal server error");
    }
  }

  async addFollower(req, res, next) {
    try {
      const currUserId = req.cookies.userId;
      const userId = req.params.userId;
      await this.userRepository.addFollower(currUserId, userId);
      res.status(201).send("Follower added");
    } catch (err) {
      console.error("Error adding follower:", err);
      res.status(500).send("Internal server error");
    }
  }

  async removeFollowing(req, res, next) {
    try {
      const currUserId = req.cookies.userId;
      const userId = req.params.userId;
      await this.userRepository.removeFollowing(currUserId, userId);
      res.status(201).send("Following removed");
    } catch (err) {
      console.error("Error removing following:", err);
      res.status(500).send("Internal server error");
    }
  }

  async removeFollower(req, res, next) {
    try {
      const currUserId = req.cookies.userId;
      const userId = req.params.userId;
      await this.userRepository.removeFollower(currUserId, userId);
      res.status(201).json({ message: "Follower removed" });
    } catch (err) {
      console.error("Error removing follower:", err);
      res.status(500).send("Internal server error");
    }
  }

  async getIsFollower(req, res, next) {
    try {
      const currUserId = req.cookies.userInfo._id;
      const userId = req.params.userId;
      const result = await this.userRepository.isFollower(currUserId, userId);
      res.status(200).send(result);
    } catch (err) {
      console.error("Error checking if user is a follower:", err);
      res.status(500).send("Internal server error");
    }
  }

  async sendOtp(req, res, next) {
    try {
      const { email } = req.body;
      const userId = req.cookies.userId;
      const otp = crypto.randomInt(1000, 9999).toString();
      const otpExpires = Date.now() + 5 * 60 * 1000; // valid for 5 minutes

      await this.userRepository.setOtp(userId, email, otp, otpExpires);

      await transporter.sendMail({
        to: email,
        subject: "Your OTP",
        text: `Your OTP code is ${otp}`,
      });

      res.status(200).json({ message: "OTP sent" });
    } catch (err) {
      console.error("Error sending OTP:", err);
      res.status(500).json({ error: "Error sending OTP" });
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const { email, otp } = req.body;
      const userId = req.cookies.userId;

      const isValid = await this.userRepository.verifyOtp(userId, email, otp);
      if (isValid) {
        res.status(200).json({ message: "OTP verified" });
      } else {
        res.status(400).json({ error: "Invalid or expired OTP" });
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      res.status(500).json({ error: "Error verifying OTP" });
    }
  }

  async changeUserName(req, res, next) {
    try {
      const { newUserName } = req.body;
      const userId = req.cookies.userId;
      await this.userRepository.newUserName(userId, newUserName);
      res.status(201).json({ message: "UserName updated successfully" });
    } catch (err) {
      console.error("Error changing username:", err);
      res.status(500).json({ error: "Error changing username" });
    }
  }
}
