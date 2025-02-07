import express from "express";
import UserController from "./users.controller.js";

const router = express.Router();

const userController = new UserController();

router.get("/get-user-by-id/:userId", (req, res) => {
  userController.getUserFromId(req, res);
});
router.get("/get-user-id-of-logged-in-user", (req, res) => {
  // this can be ommitted
  userController.getUserIdOfLoggedInUser(req, res);
});
router.get("/is-follower/:userId", (req, res) => {
  userController.getIsFollower(req, res);
});
router.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
router.post("/signin", (req, res) => {
  console.log("hi");

  userController.signIn(req, res);
});
router.post("/add-following/:userId", (req, res) => {
  userController.addFollower(req, res);
});
router.post("/send-otp", (req, res) => {
  userController.sendOtp(req, res);
});
router.post("/verify-otp", (req, res) => {
  userController.verifyOtp(req, res);
});
router.post("/update-name", (req, res) => {
  userController.changeUserName(req, res);
});
router.delete("/remove-following/:userId", (req, res) => {
  userController.removeFollowing(req, res);
});
router.delete("/remove-follower/:userId", (req, res) => {
  userController.removeFollower(req, res);
});

export default router;
