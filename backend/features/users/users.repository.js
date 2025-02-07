import { log } from "console";
import { UserModel } from "./users.schema.js";

export default class UserRepository {
  async addUser(name, email, password) {
    try {
      const newUser = new UserModel({
        name,
        email,
        password,
        postIds: [],
        followerIds: [],
        followingIds: [],
        otp: null,
        otpExpires: null,
      });
      await newUser.save();
      console.log("user created");

      return newUser;
    } catch (err) {
      console.error("Error while creating user account:", err);
      throw err;
    }
  }

  async getUser(email, password) {
    try {
      const user = await UserModel.findOne({ email, password });
      return user;
    } catch (err) {
      console.error("Error while searching user:", err);
      throw err;
    }
  }

  async getOneUser(userId) {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (err) {
      console.error("Error while getting one user:", err);
      throw err;
    }
  }

  async getAllUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (err) {
      console.error("Error while fetching all users:", err);
      throw err;
    }
  }

  async addFollower(currUserId, userId) {
    try {
      if (currUserId !== userId) {
        await UserModel.findByIdAndUpdate(userId, {
          $addToSet: { followerIds: currUserId },
        });
        await UserModel.findByIdAndUpdate(currUserId, {
          $addToSet: { followingIds: userId },
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error while adding follower:", err);
      throw err;
    }
  }

  async removeFollowing(currUserId, userId) {
    try {
      await UserModel.findByIdAndUpdate(userId, {
        $pull: { followerIds: currUserId },
      });
      await UserModel.findByIdAndUpdate(currUserId, {
        $pull: { followingIds: userId },
      });
      return true;
    } catch (err) {
      console.error("Error while removing following:", err);
      throw err;
    }
  }

  async removeFollower(currUserId, userId) {
    try {
      await UserModel.findByIdAndUpdate(currUserId, {
        $pull: { followerIds: userId },
      });
      await UserModel.findByIdAndUpdate(userId, {
        $pull: { followingIds: currUserId },
      });
      return true;
    } catch (err) {
      console.error("Error while removing follower:", err);
      throw err;
    }
  }

  async isFollower(currUserId, userId) {
    try {
      const user = await UserModel.findById(userId);
      if (user) {
        const isFollower = user.followerIds.includes(currUserId);
        return isFollower;
      }
      return false;
    } catch (err) {
      console.error("Error while checking if is follower:", err);
      throw err;
    }
  }

  async setOtp(userId, email, otp, otpExpires) {
    try {
      await UserModel.findByIdAndUpdate(userId, { otp, otpExpires });
      return true;
    } catch (err) {
      console.error("Error while setting OTP:", err);
      throw err;
    }
  }

  async verifyOtp(userId, email, otp) {
    try {
      const user = await UserModel.findOne({ _id: userId, otp });
      if (user && user.otpExpires > Date.now()) {
        user.email = email;
        await user.save();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error while verifying OTP:", err);
      throw err;
    }
  }

  async newUserName(userId, newUserName) {
    try {
      await UserModel.findByIdAndUpdate(userId, { name: newUserName });
      return true;
    } catch (err) {
      console.error("Error while updating user name:", err);
      throw err;
    }
  }
}
