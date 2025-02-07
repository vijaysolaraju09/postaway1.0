import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import styles from "../styles/manage.module.css";
import { MdOutlineManageAccounts } from "react-icons/md";
import ManageFollowers from "./ManageFollowers";
import ManageFollowing from "./ManageFollowing";
// import ManageFollowers from "./ManageFollowers";
// import ManageFollowers from "./ManageFollowers";
// import ManageFollowing from "./ManageFollowing";

const ManageButton = () => {
  const [uniqueId] = useState(
    `followersCollapse-${Math.random().toString(36).substring(2, 15)}`
  );

  return (
    <div className={styles.container}>
      <div className={styles.clickableWrapper}>
        <a
          className={` ${styles.btn} collapsed`}
          data-bs-toggle="collapse"
          data-bs-target={`#${uniqueId}`}
          role="button"
          aria-expanded="false"
          aria-controls={uniqueId}
        >
          <div className={styles.manageButton}>
            <div className={styles.icon}>
              <MdOutlineManageAccounts />
            </div>
            <div>
              <h2>Manage</h2>
            </div>
          </div>
        </a>
      </div>
      <div
        className={`collapse ${styles.myCollapse} ${styles.contentWrapper}`}
        id={uniqueId}
      >
        <div className={`card card-body ${styles.contentBox}`}>
          <div className={styles.clickableWrapper}>
            <ManageFollowers name="Followers" placement="end" scroll="true" />
          </div>
          <div className={styles.clickableWrapper}>
            <ManageFollowing name="Following" placement="end" scroll="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageButton;
