import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

import styles from "../styles/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "../store/slices/authSlice";
import { setUserInfo } from "../store/slices/userSlice";
import { API_URL } from "../utils/helper";

axios.defaults.withCredentials = true;
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // startLoading();
      const response = await axios.post(`${API_URL}/api/users/signin`, {
        email,
        password,
      });
      dispatch(setAuthState(true));
      const info = response.data.user;
      Cookies.set("userInfo", JSON.stringify(info), {
        expires: 1, // Cookie expires in 1 day
        path: "/", // Cookie accessible across the app
      });
      Cookies.set("jwtToken", JSON.stringify(response.data.jwtToken), {
        expires: 1, // Cookie expires in 1 day
        path: "/", // Cookie accessible across the app
      });
      dispatch(setUserInfo(info));
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      // stopLoading();
    }
  };
  return (
    <div className={styles.wrapper}>
      <form action="" onSubmit={handleLogin}>
        <h1>Login</h1>
        {error && <p className="alert alert-danger">{error}</p>}
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
        {/* <div className={styles.rememberForgot}>
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="#">Forgot Password</a>
        </div> */}
        <button type="submit" className={`btn ${styles.btn}`}>
          Login
        </button>
        <div className={styles.registerLink}>
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
