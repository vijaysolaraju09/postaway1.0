import { useState } from "react";
import styles from "../styles/profilecontent.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserPosts from "./UserPosts";
import LikedPosts from "./LikedPosts";

const ProfileContent = ({ userId }) => {
  const [key, setKey] = useState("posts");
  return (
    <Tabs
      defaultActiveKey="posts"
      id="fill-tab-example"
      className="mb-3"
      fill
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="posts" title="Posts" className={styles.postsTab}>
        <UserPosts userId={userId} />
      </Tab>
      <Tab eventKey="likedPosts" title="Liked Posts">
        <LikedPosts userId={userId} />
      </Tab>
    </Tabs>
  );
};

export default ProfileContent;
