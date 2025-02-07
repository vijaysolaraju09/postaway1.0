import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/likedPosts.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import { FaHeart, FaComment } from "react-icons/fa";

import ProfileImg from "./ProfileImg";
import EditPostModal from "./EditPostModal";

const LikedPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [postIds, setPostIds] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currUserId, setCurrUserId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userIdResponse = await axios.get(
          "/api/users/get-user-id-of-logged-in-user"
        );
        setCurrUserId(userIdResponse.data);
      } catch (err) {
        console.log("Error while fetching logged in user: " + err);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postIdsResponse = await axios.get(
          `/api/likes/posts-liked-by-user/${userId}`
        );
        const postIds = postIdsResponse.data;
        console.log(postIds);

        const userNameResponse = await axios.get(
          `/api/users/get-user-by-id/${userId}`
        );
        setUserName(userNameResponse.data.name);

        const postArr = await Promise.all(
          postIds.map(async (like) => {
            const postResponse = await axios.get(`/api/posts/${like.postId}`);
            return {
              ...postResponse.data,
              likes: [],
              comments: [],
              user: {},
            };
          })
        );
        console.log(postArr);
        setPosts(postArr);
      } catch (err) {
        console.log("Error while fetching user posts: " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [userId]);

  useEffect(() => {
    const fetchLikesAndComments = async () => {
      try {
        const updatedPosts = await Promise.all(
          posts.map(async (post) => {
            const likesResponse = await axios.get(
              `/api/likes/likes-for-a-post/${post._id}`
            );
            const commentsResponse = await axios.get(
              `/api/comments/comments-for-a-post/${post._id}`
            );
            const userResponse = await axios.get(
              `/api/users/get-user-by-id/${post.userId}`
            );

            return {
              ...post,
              likes: likesResponse.data || [],
              comments: commentsResponse.data || [],
              user: userResponse.data || {},
            };
          })
        );
        setPosts(updatedPosts);
      } catch (err) {
        console.log("Error while fetching likes and comments: " + err);
      }
    };

    if (posts.length > 0) {
      fetchLikesAndComments();
    }
  }, [posts.length]);

  const handleUpdatePost = async (updatedPost) => {
    try {
      const likesResponse = await axios.get(
        `/api/likes/likes-for-a-post/${updatedPost._id}`
      );
      const commentsResponse = await axios.get(
        `/api/comments/comments-for-a-post/${updatedPost._id}`
      );
      const userResponse = await axios.get(
        `/api/users/get-user-by-id/${userId}`
      );

      const likes = likesResponse.data;
      const comments = commentsResponse.data;
      const user = userResponse.data;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id
            ? { ...updatedPost, likes, comments, user }
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
        <span>{userName} has not liked any post yet.</span>
      )}
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post._id} className={styles.post}>
            <div className="d-flex justify-content-around">
              {!loading && (
                <Card className={styles.card} style={{ width: "18rem" }}>
                  <div className={styles.userInfo}>
                    <ProfileImg user={post.user} />
                    <div className={styles.userName}>{post.user?.name}</div>
                  </div>
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
                      {currUserId == post.user?.userId && (
                        <EditPostModal
                          post={post}
                          onUpdate={handleUpdatePost}
                        />
                      )}
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

export default LikedPosts;
