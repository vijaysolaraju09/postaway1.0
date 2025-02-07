import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/createPost.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { API_URL } from "../utils/helper";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const CreatePost = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.container}>
      <div className={styles.clickable} onClick={handleShow}>
        <div className={styles.icon}>
          <CiCirclePlus />
        </div>
        <h2>Create</h2>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>Create new post</Modal.Title>
        </Modal.Header>
        <form
          action={`${API_URL}/api/posts`}
          method="post"
          enctype="multipart/form-data"
        >
          <Modal.Body className={styles.modalBody}>
            <div className="mb-3">
              <label for="formFile" className="form-label">
                Upload picture
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                name="imagePath"
              />
            </div>
            <div className={`form-floating`}>
              <textarea
                className="form-control"
                placeholder="Post away your thoughts here..."
                id="floatingTextarea"
                name="caption"
              ></textarea>
              <label for="floatingTextarea" className={styles.labelClass}>
                Captions
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default CreatePost;
