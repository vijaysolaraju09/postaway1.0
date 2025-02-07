import { useState, useEffect } from "react";
import styles from "../styles/commentCard.module.css";
import axios from "axios";
import ShortProfile from "./ShortProfile";
import { API_URL } from "../utils/helper";

const CommentCard = ({ comment }) => {
  const [user, setUser] = useState({});
  // console.log(comment);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(
          `${API_URL}/api/users/get-user-by-id/${comment.userId}`
        );
        // console.log(userResponse.data);
        setUser(userResponse.data);
        // console.log(user);
      } catch (err) {
        console.log("Error while fetching user of comment section: " + err);
      }
    };
    fetchUser();
  }, [comment.userId]);

  return (
    <div className={styles.container}>
      <div className={styles.userProfile}>
        <ShortProfile user={user} />
      </div>
      <div className={styles.commentContent}>{comment.content}</div>
    </div>
  );
};

export default CommentCard;
