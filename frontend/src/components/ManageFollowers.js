import { useEffect, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "../styles/manage.module.css";
// import axios from 'axios';
import Alert from "react-bootstrap/Alert";
import { FaUserSlash } from "react-icons/fa";
import ShortProfileByUserId from "./ShortProfileByUserId";
import { useDispatch, useSelector } from "react-redux";
import { removeFollower } from "../store/slices/userSlice";
import axios from "axios";
import { API_URL } from "../utils/helper";

const ManageFollowers = ({ name, ...props }) => {
  const { followerIds: initialFollowerIds } = useSelector(
    (state) => state.user
  );
  // console.log(initialFollowerIds);

  const [followerIds, setFollowerIds] = useState(initialFollowerIds);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setFollowerIds(initialFollowerIds);
  }, [initialFollowerIds]);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const handleRemoveFollower = async (followerId) => {
    try {
      const removeResponse = await axios.delete(
        `${API_URL}/api/users/remove-follower/${followerId}`
      );
      console.log(removeResponse.data);
      dispatch(removeFollower(followerId));
      setFollowerIds((prevFollowerIds) =>
        prevFollowerIds.filter((f) => f !== followerId)
      );
    } catch (err) {
      console.log("Error while removing follower: " + err);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Button variant="" onClick={toggleShow}>
          <div className={styles.text}>
            <h3>{name}</h3>
          </div>
        </Button>
        <Offcanvas
          show={show}
          onHide={handleClose}
          {...props}
          className={styles.offCanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Manage Followers</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {followerIds.length != 0 &&
              followerIds.map((followerId) => (
                <div className={styles.userCard}>
                  <div key={followerId} className={styles.userProfile}>
                    <ShortProfileByUserId userId={followerId} />
                  </div>
                  <div className={styles.removeFollower}>
                    <button onClick={() => handleRemoveFollower(followerId)}>
                      <FaUserSlash />
                    </button>
                  </div>
                </div>
              ))}
            {followerIds.length == 0 && (
              <div>
                <Alert key="info" variant="info">
                  You don't have any follower yet.
                </Alert>
              </div>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default ManageFollowers;
