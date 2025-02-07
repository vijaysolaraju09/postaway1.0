import React, { useContext, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaUserEdit } from "react-icons/fa";

import styles from "../styles/editProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail, setUserName } from "../store/slices/userSlice";
import { API_URL } from "../utils/helper";

const EditProfile = () => {
  let { userName, userEmail } = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpReceived, setOtpReceived] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newEmail, setNewEmail] = useState(userEmail);
  const [newUserName, setNewUserName] = useState(userName);
  const otpRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
    if (otpVerified) {
      setOtpSent(false);
      setOtpReceived(false);
      setOtp(["", "", "", ""]);
      handleShowEditEmail();
    }
  };
  const handleShow = () => setShow(true);
  const handleShowEditEmail = () => setShowEditEmail(!showEditEmail);
  const handleUserNameChange = (e) => setNewUserName(e.target.value);
  const handleEmailIdChange = (e) => setNewEmail(e.target.value);

  const sendOtp = async () => {
    try {
      setOtpSent(true);
      const response = await axios.post(`${API_URL}/api/users/send-otp`, {
        email: newEmail,
      });
      if (response.status === 200) {
        setOtpReceived(true);
        setOtpSent(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
        setOtpReceived(false);
        setOtpSent(false);
      }
    } catch (error) {
      toast.error("Error sending OTP");
      setOtpReceived(false);
      setOtpSent(false);
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join("");
    try {
      const response = await axios.post(`${API_URL}/api/users/verify-otp`, {
        email: newEmail,
        otp: otpString,
      });
      if (response.status === 200) {
        setOtpVerified(true);
        dispatch(setUserEmail(newEmail));
        toast.success(response.data.message);
        toast.success("Email-ID updated successfully");
        handleClose();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log("Error verifying otp: " + error);
      toast.error("Invalid OTP");
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs.current[index + 1].current.focus();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/users/verify-otp`, {
        newUserName,
      });
      dispatch(setUserName(newUserName));
      // userName = newUserName;
      console.log(newUserName);
      console.log(userName);
      toast.success("User name updated");
      handleClose();
    } catch (err) {
      console.log("Error while updating name: " + err);
      toast.error("Error while updating name");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Profile <FaUserEdit />
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <div className={styles.modal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newUserName}
                  onChange={handleUserNameChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" disabled>
                <Form.Label>
                  {showEditEmail ? "Old Email ID" : "Email ID"}
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    value={userEmail}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    disabled
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={handleShowEditEmail}
                  >
                    Change Email-id
                  </Button>
                </InputGroup>
              </Form.Group>

              {showEditEmail && (
                <Form.Group controlId="formNewEmail" disabled>
                  <Form.Label>New Email ID</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      value={newEmail}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={handleEmailIdChange}
                    />

                    {!otpSent && (
                      <Button variant="outline-secondary" onClick={sendOtp}>
                        Send OTP
                      </Button>
                    )}

                    {otpSent && (
                      <div>
                        <Button variant="outline-secondary" disabled>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          {/* <span className="visually-hidden">Loading...</span> */}
                        </Button>
                      </div>
                    )}
                  </InputGroup>

                  {otpReceived && (
                    <div>
                      <Form.Group controlId="formOtp">
                        <Form.Label>Enter OTP</Form.Label>
                        <div className="d-flex">
                          {otp.map((digit, index) => (
                            <Form.Control
                              key={index}
                              ref={otpRefs.current[index]}
                              type="text"
                              value={digit}
                              onChange={(e) =>
                                handleOtpChange(index, e.target.value)
                              }
                              maxLength="1"
                              className="otp-input me-2"
                              style={{ width: "50px", textAlign: "center" }}
                            />
                          ))}
                        </div>
                        <Button
                          variant="primary"
                          className="mt-3"
                          onClick={verifyOtp}
                        >
                          Verify OTP
                        </Button>
                      </Form.Group>
                    </div>
                  )}
                </Form.Group>
              )}

              {/* Future feature */}
              {/* <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={userPassword}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Save Changes
              </Button> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default EditProfile;
