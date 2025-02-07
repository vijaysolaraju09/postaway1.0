import Cookies from "js-cookie";

export const isAuthenticated = () => {
  const jwtToken = Cookies.get("jwtToken");
  return Boolean(jwtToken);
};
