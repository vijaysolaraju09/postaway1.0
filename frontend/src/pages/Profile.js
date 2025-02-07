import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/profile.module.css";
import { FaAt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import ManageButton from "../components/ManageButton";
import getColorForLetter from "../components/ColourMapping";
import ProfileContent from "../components/ProfileContent";
import EditProfile from "../components/EditProfile";
import logo from "../assets/postaway-logo.png";

import { useSelector } from "react-redux";
import { Logout } from "../components/Logout";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [currUserId, setCurrUserId] = useState(null);
  const { userName } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCurrUserId = async () => {
      const userIdResponse = await axios.get(
        `/api/users/get-user-id-of-logged-in-user`
      );
      setCurrUserId(userIdResponse.data);
    };
    fetchCurrUserId();

    const fetchUser = async () => {
      const userResponse = await axios.get(
        `/api/users/get-user-by-id/${userId}`
      );
      setUser(userResponse.data);
    };
    fetchUser();
  }, [userId, user.name, userName]);

  let bgColor;
  if (user.name) {
    bgColor = getColorForLetter(user.name[0]);
    return (
      <div className={styles.container}>
        {/* column 1 */}

        <div className={styles.column1}>
          <div className={styles.stickyComponents}>
            <div className={styles.logo}>
              <Link to="/">
                <img src={logo} />
              </Link>
            </div>

            <div className={`${styles.createPost} ${styles.clickable}`}>
              <CreatePost />
            </div>

            <div className={`${styles.manageButton} `}>
              <ManageButton />
            </div>
          </div>
        </div>

        <div className={styles.column2}>
          <div className={styles.userInfo}>
            <div className="d-flex">
              <div
                className={styles.profileCircle}
                style={{ backgroundColor: bgColor }}
              >
                {user.name[0]}
              </div>
              <div>
                <div className={styles.userName}>
                  <FaAt /> {user.name}
                </div>
                <div className="d-flex">
                  <div className={`${styles.noOfPosts} ${styles.userStats}`}>
                    {user.postIds.length <= 1 && (
                      <span>
                        <span className={styles.number}>
                          {user.postIds.length}
                        </span>{" "}
                        Post
                      </span>
                    )}
                    {user.postIds.length > 1 && (
                      <span>
                        <span className={styles.number}>
                          {user.postIds.length}
                        </span>{" "}
                        Posts
                      </span>
                    )}
                  </div>
                  <div
                    className={`${styles.noOfFollowers} ${styles.userStats}`}
                  >
                    {user.followerIds.length <= 1 && (
                      <span>
                        <span className={styles.number}>
                          {user.followerIds.length}
                        </span>{" "}
                        Follower
                      </span>
                    )}
                    {user.followerIds.length > 1 && (
                      <span>
                        <span className={styles.number}>
                          {user.followerIds.length}
                        </span>{" "}
                        Followers
                      </span>
                    )}
                  </div>
                  <div
                    className={`${styles.noOfFollowing} ${styles.userStats}`}
                  >
                    <span>
                      <span className={styles.number}>
                        {user.followingIds.length}
                      </span>{" "}
                      Following
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`d-flex align-items-center  ${styles.textualInfo}`}>
              <div className={`me-4 ${styles.nameAndProfile}`}>
                {currUserId == user._id && <EditProfile />}
              </div>
              <Logout />
            </div>
          </div>

          <div className={styles.userContent}>
            <ProfileContent userId={userId} />
            <div className={styles.postsAndLiked}></div>
            <div className={styles.content}></div>
          </div>
        </div>
      </div>
    );
  } else {
    bgColor = "violet";
    return null;
  }
};

export default Profile;
