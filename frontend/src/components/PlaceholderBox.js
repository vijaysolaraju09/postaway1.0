import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import styles from "../styles/home.module.css";

const PlaceholderBox = () => (
  <div className={styles.placeholderBox}>
    <Card style={{ width: "38rem" }}>
      <Placeholder
        as={Card.Text}
        animation="glow"
        className={styles.headerHolder}
      >
        <div className={styles.userNameHolder}>
          <Placeholder className={styles.profileHolder} xs={3} />
          <Placeholder className={styles.nameHolder} xs={4} />
        </div>
        <Placeholder.Button
          className={styles.followHolder}
          variant="primary"
          xs={3}
        />
      </Placeholder>
      <Card.Img variant="top" src="../../placeholder_image.png" />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={3} />
      </Card.Body>
    </Card>
  </div>
);
export default PlaceholderBox;
