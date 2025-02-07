import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeAuthState } from "../store/slices/authSlice";
export const Logout = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    // document.cookie = `jwtToken=''; max-age=0; userInfo=''`;
    const allCookies = Cookies.get();
    for (let cookie in allCookies) {
      Cookies.remove(cookie);
    }

    dispatch(changeAuthState());
    navigate("/login");
    console.log("Logout called");

    // handleLogout();
  };

  if (!isAuth) {
    return null;
  }

  return (
    <button className="btn btn-danger" onClick={logout}>
      Log Out
    </button>
  );
};
