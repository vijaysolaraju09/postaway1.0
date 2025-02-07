import { useEffect, useState } from "react";
import styles from "../styles/showComments.module.css";
import axios from "axios";
import CommentCard from "./CommentCard";

const ShowComments = ({ comments }) => {
  // const [comments,setComments] = useState([]);

  // useEffect(()=>{

  //     const fetchComments = async () => {
  //         const commentsResponse = await axios.get(`/api/comments/${postId}`);
  //         // console.log(commentsResponse.data);
  //         setComments(commentsResponse.data);
  //     }

  //     fetchComments();
  // },[]);

  return (
    <div className={styles.container}>
      {comments.map((comment, index) => (
        <div key={index} className={styles.comment}>
          <CommentCard comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default ShowComments;
