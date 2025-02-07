import styles from "../styles/addComment.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/helper";

const AddComment = ({ postId, onCommentPosted }) => {
  let [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    try {
      // setComment(JSON.stringify(comment))
      e.preventDefault();
      console.log(comment);
      await axios.post(`${API_URL}/api/comments/${postId}`, {
        content: comment,
      });
      setComment("");
      onCommentPosted();
    } catch (err) {
      console.log("Error posting comment: " + err);
    }
  };

  return (
    <div className={styles.container}>
      <Form.Label>
        <h3>Comment</h3>
      </Form.Label>
      <Form.Control
        as="textarea"
        className={styles.commentBox}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        className={`btn ${styles.commentBtn}`}
        onClick={handleSubmit}
      >
        Post Comment
      </button>
    </div>
  );
};

export default AddComment;
