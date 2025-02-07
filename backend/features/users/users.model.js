export default class UserModel {
  constructor(
    userId,
    name,
    email,
    password,
    postIds,
    followerIds,
    followingIds,
    otp = null,
    otpExpires = null
  ) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.postIds = postIds;
    this.followerIds = followerIds;
    this.followingIds = followingIds;
    this.otp = otp;
    this.otpExpires = otpExpires;
  }

  static addUser(name, email, password) {
    const newUser = new UserModel(
      users.length + 1,
      name,
      email,
      password,
      [],
      [],
      []
    );
    users.push(newUser);
    return newUser;
  }

  static getUser(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }

  static getOneUser(userId) {
    const user = users.find((u) => u.userId == userId);
    return user;
  }

  static getAllUsers() {
    return users;
  }

  static addFollower(currUserId, userId) {
    const currUser = users.find((u) => u.userId == currUserId);

    const user = users.find((u) => u.userId == userId);
    const followerIndex = user.followerIds.findIndex((f) => f == currUserId);

    if (currUserId != userId) {
      // the curr user is not already a follower of user
      user.followerIds.push(currUserId);
      currUser.followingIds.push(userId);
    }
  }

  static removeFollowing(currUserId, userId) {
    const currUser = users.find((u) => u.userId == currUserId);
    const followingIndex = currUser.followingIds.findIndex((f) => f == userId);

    const user = users.find((u) => u.userId == userId);
    const followerIndex = user.followerIds.findIndex((f) => f == currUserId);

    if (followerIndex != -1) {
      if (followingIndex != -1) {
        user.followerIds.splice(followerIndex, 1);
        currUser.followingIds.splice(followingIndex, 1);
      }
    }
  }

  static removeFollower(currUserId, userId) {
    const currUser = users.find((u) => u.userId == currUserId);
    const followerIndex = currUser.followerIds.findIndex((f) => f == userId);

    const user = users.find((u) => u.userId == userId);
    const followingIndex = user.followingIds.findIndex((f) => f == currUserId);

    // console.log(currUser.followerIds);
    // console.log('FollowerIndex ' + followerIndex);
    if (followerIndex != -1) {
      if (followingIndex != -1) {
        currUser.followerIds.splice(followerIndex, 1);
        user.followingIds.splice(followingIndex, 1);
        return true;
      }
    } else {
      return false;
    }
  }

  static isFollower(currUserId, userId) {
    const user = users.find((u) => u.userId == userId);
    const index = user.followerIds.findIndex((f) => f == currUserId);
    if (index == -1) {
      return false;
    } else {
      return true;
    }
  }

  static setOtp(userId, email, otp, otpExpires) {
    const user = users.find((u) => u.userId == userId);
    if (user) {
      user.otp = otp;
      user.otpExpires = otpExpires;
    }
  }

  static verifyOtp(userId, email, otp) {
    const user = users.find((u) => u.userId == userId);
    if (user && user.otp == otp && Date.now() < user.otpExpires) {
      user.email = email;
      return true;
    }
    return false;
  }

  static newUserName(userId, newUserName) {
    const user = users.find((u) => u.userId == userId);
    if (user) {
      user.name = newUserName;
    }
  }
}

const users = [
  {
    userId: 1,
    name: "John",
    email: "aditya.education212@gmail.com",
    password: "abcd",
    postIds: [2],
    followerIds: [2],
    followingIds: [2],
    otp: null,
    otpExpires: null,
  },
  {
    userId: 2,
    name: "Doe",
    email: "doe@email.com",
    password: "abcd",
    postIds: [1, 3],
    followerIds: [1],
    followingIds: [1],
    otp: null,
    otpExpires: null,
  },
  {
    userId: 3,
    name: "Dan",
    email: "dan@email.com",
    password: "abcd",
    postIds: [],
    followerIds: [1, 2],
    followingIds: [1],
    otp: null,
    otpExpires: null,
  },
];
