import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/following.module.css";
import ShortProfile from "./ShortProfile";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../store/slices/loadingSlice";
import { Link } from "react-router-dom";

const Following = () => {
  const { followingIds } = useSelector((state) => state.user);
  const [followings, setFollowings] = useState([]);

  const dispatch = useDispatch();
  const getFollowings = async () => {
    try {
      dispatch(startLoading());
      let arr = [];
      for (let followingId of followingIds) {
        const userResponse = await axios.get(
          `/api/users/get-user-by-id/${followingId}`
        );
        const user = userResponse.data;
        arr.push(user);
      }
      setFollowings(arr);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    getFollowings();
  }, [followingIds]);

  return (
    <div className={styles.followingContainer}>
      <a
        className="btn collapsed"
        data-bs-toggle="collapse"
        href="#followingCollapse"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <div className={styles.followingText}>
          <div>
            <i classNaame="fa-solid fa-check"></i>Following
          </div>
          <div className={styles.followingsCount}>{followings.length}</div>
        </div>
      </a>

      <div className={`collapse ${styles.myCollapse}`} id="followingCollapse">
        <div className={`card card-body ${styles.followingBox}`}>
          {followings.length === 0 ? (
            <p>You are not following anyone!</p>
          ) : (
            <div className={styles.followingsList}>
              {followings.map((following) => (
                <ShortProfile key={following.userId} user={following} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Following;
