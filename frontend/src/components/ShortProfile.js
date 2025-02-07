import { Link } from "react-router-dom";
import ProfileImg from "./ProfileImg";
import styles from "../styles/shortProfile.module.css";

const ShortProfile = ({ user }) => {
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

export default ShortProfile;
