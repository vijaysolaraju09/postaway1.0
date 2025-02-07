import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import styles from "../styles/login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // startLoading();
      const response = await axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Unable to create account :(");
    } finally {
      // stopLoading();
    }
  };
  return (
    <div className={styles.wrapper}>
      <form action="" onSubmit={handleSignUp}>
        <h1>Signup</h1>
        {error && <p className="alert alert-danger">{error}</p>}
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FaRegUserCircle />
        </div>
        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MdOutlineMail />
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TbLockPassword />
        </div>

        <button type="submit" className={`btn ${styles.btn}`}>
          Signup
        </button>
        <div className={styles.registerLink}>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
