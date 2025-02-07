import styles from "../styles/profileImg.module.css";
import getColorForLetter from "./ColourMapping";

const ProfileImg = ({ user }) => {
  if (!user || !user.name) {
    return (
      <div
        className={styles.profileCircle}
        style={{ backgroundColor: "violet" }}
      >
        U
      </div>
    );
  }
  const bgColor = getColorForLetter(user.name[0]);
  return (
    <div className={styles.profileCircle} style={{ backgroundColor: bgColor }}>
      {user.name[0]}
    </div>
  );
};

export default ProfileImg;
