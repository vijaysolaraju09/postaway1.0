import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/userPosts.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import { FaHeart, FaComment } from "react-icons/fa";
import EditPostModal from "./EditPostModal";
import { API_URL } from "../utils/helper";
// import EditPostModal from "./EditPostModal";

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await axios.get(
          `${API_URL}/api/posts/user-posts/${userId}`
        );
        const postsData = postsResponse.data;

        const userNameResponse = await axios.get(
          `${API_URL}/api/users/get-user-by-id/${userId}`
        );
        setUserName(userNameResponse.data.name);

        const updatedPosts = await Promise.all(
          postsData.map(async (post) => {
            const likesResponse = await axios.get(
              `${API_URL}/api/likes/likes-for-a-post/${post._id}`
            );
            const commentsResponse = await axios.get(
              `${API_URL}/api/comments/comments-for-a-post/${post._id}`
            );

            setLikes(likesResponse.data);
            setComments(commentsResponse.data);

            return {
              ...post,
              likes: likesResponse.data,
              comments: commentsResponse.data,
            };
          })
        );

        setPosts(updatedPosts);
      } catch (err) {
        console.log("Error while fetching user posts: " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [userId]);

  const handleUpdatePost = async (updatedPost) => {
    try {
      const likesResponse = await axios.get(
        `${API_URL}/api/likes/likes-for-a-post/${updatedPost._id}`
      );
      const commentsResponse = await axios.get(
        `${API_URL}/api/comments/comments-for-a-post/${updatedPost._id}`
      );
      const likes = likesResponse.data;
      const comments = commentsResponse.data;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id
            ? { ...updatedPost, likes, comments }
            : post
        )
      );
    } catch (err) {
      console.log("Error while updating post: " + err);
    }
  };

  return (
    <div className={styles.container}>
      {loading && (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={8} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={6} />
          </Card.Body>
        </Card>
      )}
      {!loading && posts.length === 0 && (
        <span>{userName} has not posted anything yet.</span>
      )}
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <div className="d-flex justify-content-around">
              {!loading && (
                <Card className={styles.card} style={{ width: "18rem" }}>
                  {post.imagePath === "" && (
                    <Card.Img
                      className={styles.postImage}
                      variant="top"
                      src="/uploads/noImageAvailable.png"
                    />
                  )}
                  {post.imagePath !== "" && (
                    <Card.Img
                      className={styles.postImage}
                      variant="top"
                      src={post.imagePath}
                    />
                  )}
                  <Card.Body>
                    <Card.Text>{post.caption}</Card.Text>
                    <div className={styles.actions}>
                      <EditPostModal post={post} onUpdate={handleUpdatePost} />
                      <div className={styles.likes}>
                        <FaHeart style={{ color: "#ffffff" }} />{" "}
                        {post.likes.length}
                      </div>
                      <div className={styles.comments}>
                        <FaComment style={{ color: "#ffffff" }} />{" "}
                        {post.comments.length}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserPosts;
