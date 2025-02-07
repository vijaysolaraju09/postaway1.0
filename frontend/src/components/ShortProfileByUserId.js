import { Link } from "react-router-dom";
import ProfileImg from "./ProfileImg";
import styles from "../styles/shortProfile.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/helper";

const ShortProfileByUserId = ({ userId }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const userResponse = await axios.get(
        `${API_URL}/api/users/get-user-by-id/${userId}`
      );
      setUser(userResponse.data);
    };
    fetchUser();
  }, [userId]);

  return (
    <Link
      to={`/profile/${user._id}`}
      className={`${styles.profileLink} ${styles.clickable}`}
    >
      <div className={styles.profile}>
        <div className={styles.profileImg}>
          <ProfileImg user={user} />
        </div>
        <div className={styles.userName}>{user.name}</div>
      </div>
    </Link>
  );
};

export default ShortProfileByUserId;
