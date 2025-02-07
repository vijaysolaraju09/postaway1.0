import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/followers.module.css";
import ShortProfile from "./ShortProfile";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../store/slices/loadingSlice";

const Followers = () => {
  const { followerIds } = useSelector((state) => state.user);
  const [followers, setFollowers] = useState([]);
  const dispatch = useDispatch();

  const getFollowers = async () => {
    try {
      dispatch(startLoading());
      let arr = [];

      for (let followerId of followerIds) {
        let userResponse = await axios.get(
          `/api/users/get-user-by-id/${followerId}`
        );
        let user = userResponse.data;
        arr.push(user);
      }
      setFollowers(arr);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    getFollowers();
    // console.log(followerIds);
    // console.log(followers);
  }, [followerIds]);

  return (
    <div className={styles.followersContainer}>
      <a
        className="btn collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#followersCollapse"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <div className={styles.followerText}>
          <div>
            <i className="fa-solid fa-check-double"></i>Followers
          </div>
          <div className={styles.followersCount}>{followers.length}</div>
        </div>
      </a>

      <div className={`collapse ${styles.myCollapse}`} id="followersCollapse">
        <div className={`card card-body ${styles.followerBox}`}>
          {followers?.length === 0 ? (
            <p>You don't have any follower</p>
          ) : (
            <div className={styles.followersList}>
              {followers?.map((follower) => (
                <ShortProfile key={follower.userId} user={follower} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Followers;
