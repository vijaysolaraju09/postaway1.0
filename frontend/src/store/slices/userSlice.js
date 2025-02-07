import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userName: "",
  userId: "",
  userEmail: "",
  userPassword: "",
  followerIds: [],
  followingIds: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userName = action.payload.name;
      state.userId = action.payload._id;
      state.userEmail = action.payload.email;
      state.userPassword = action.payload.password;
      state.followerIds = action.payload.followerIds || [];
      state.followingIds = action.payload.followingIds || [];
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserPassword: (state, action) => {
      state.userPassword = action.payload;
    },
    setFollowerIds: (state, action) => {
      state.followerIds = action.payload;
    },
    setFollowingIds: (state, action) => {
      state.followingIds = action.payload;
    },
    addFollowing: (state, action) => {
      if (!state.followingIds.includes(action.payload)) {
        state.followingIds.push(action.payload);
      }
    },
    removeFollowing: (state, action) => {
      state.followingIds = state.followingIds.filter(
        (id) => id !== action.payload
      );
    },
    removeFollower: (state, action) => {
      state.followerIds = state.followerIds.filter(
        (id) => id !== action.payload
      );
    },
    fetchUserInfo: (state) => {
      const info = Cookies.get("userInfo");
      if (info) {
        const userInfo = JSON.parse(info);
        state.userName = userInfo.name;
        state.userId = userInfo._id;
        state.userEmail = userInfo.email;
        state.userPassword = userInfo.password;
        state.followerIds = userInfo.followerIds || [];
        state.followingIds = userInfo.followingIds || [];
      }
    },
  },
});

export const {
  setUserInfo,
  setUserName,
  setUserId,
  setUserEmail,
  setUserPassword,
  setFollowerIds,
  setFollowingIds,
  addFollowing,
  removeFollowing,
  removeFollower,
  fetchUserInfo,
} = userSlice.actions;

export default userSlice.reducer;
