import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/postaway-logo.png";
import CreatePost from "../components/CreatePost";
import { FaRegUserCircle } from "react-icons/fa";
import ManageButton from "../components/ManageButton";
import PlaceholderBox from "../components/PlaceholderBox";
import Post from "../components/Post";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../components/Logout";
import { setUserInfo } from "../store/slices/userSlice";
import Followers from "../components/Followers";
import Following from "../components/Following";
import { API_URL } from "../utils/helper";

function Home() {
  // const [userInfo, setUserInfo] = useState("");
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const { userName, userId, followerIds, followingIds } = useSelector(
    (state) => state.user
  );
  // console.log(useSelector((state) => state.user));

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/posts/all`);
      setPosts(response.data.reverse());
      setLoadingPosts(false);
    } catch (err) {
      console.log("Error while fetching posts: " + err);
    }
  };
  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/users/get-user-by-id/${userId}`
      );

      dispatch(setUserInfo(response.data));
    } catch (err) {
      console.log("Error while fetching userInfo: " + err);
    }
  };
  useEffect(() => {
    fetchPosts();
    const info = Cookies.get("userInfo");
    const userInfo = JSON.parse(info);

    fetchUserDetails(userInfo._id);
  }, []);

  return (
    <div className={styles.container}>
      {/* column 1 */}
      <div className={styles.column1}>
        <div className={styles.stickyComponents}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          <div className={`${styles.createPost} ${styles.clickable}`}>
            <CreatePost />
          </div>

          <div className={`${styles.userProfile} ${styles.clickable}`}>
            <Link to={`/profile/${userId}`} className={styles.profileLink}>
              <div className={styles.icon}>
                <FaRegUserCircle />
              </div>
              <h2>My Profile</h2>
            </Link>
          </div>

          <div className={styles.manageButton}>
            <ManageButton />
          </div>
        </div>
      </div>

      {/* column 2 */}
      <div className={styles.column2}>
        {isAuth && (
          <div className={styles.greetings}>
            <h2>Welcome, {userName}!</h2>
          </div>
        )}

        <div className={styles.postContainer}>
          {loadingPosts ? (
            <>
              <PlaceholderBox />
              <PlaceholderBox />
              <PlaceholderBox />
            </>
          ) : posts?.length === 0 ? (
            <div>No posts available</div>
          ) : (
            posts?.map((post) => (
              <>
                <Post key={post.id} post={post} fetchPosts={fetchPosts} />
              </>
            ))
          )}
        </div>
      </div>

      {/* column 3 */}
      <div className={styles.column3}>
        <div className={styles.stickyComponents}>
          {isAuth ? (
            <>
              <div className={`text-center ${styles.info}`}>
                <Logout />
              </div>
              <div className={styles.followers}>
                <Followers followerIds={followerIds} />
              </div>
              <div className={styles.following}>
                <Following followingIds={followingIds} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
