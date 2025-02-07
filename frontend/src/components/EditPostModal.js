import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/editPostModel.module.css";
import Form from "react-bootstrap/Form";

const EditPostModal = ({ post, onUpdate }) => {
  const [show, setShow] = useState(false);
  const [caption, setCaption] = useState(post.caption);
  const [imagePath, setImagePath] = useState(post.imagePath);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCaptionChange = (e) => setCaption(e.target.value);
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    if (selectedFile) {
      formData.append("imagePath", selectedFile);
    } else {
      formData.append("imagePath", imagePath);
    }

    try {
      const response = await axios.put(`/api/posts/${post._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onUpdate(response.data);
      handleClose();
    } catch (err) {
      console.error("Error updating the post: " + err);
    }
  };

  return (
    <>
      <Button className={styles.primaryButton} onClick={handleShow}>
        Edit Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={styles.container}
        centered
      >
        <div className={styles.main}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formCaption">
                <Form.Label>Caption</Form.Label>
                <Form.Control
                  type="text"
                  value={caption}
                  onChange={handleCaptionChange}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>Image</Form.Label>
                {imagePath && (
                  <img
                    src={imagePath}
                    alt="Current Post"
                    className={styles.previewImage}
                  />
                )}
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default EditPostModal;
