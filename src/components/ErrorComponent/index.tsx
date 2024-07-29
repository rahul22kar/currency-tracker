import { Button } from "antd";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";

interface Props {
  message: string;
  retry?: () => void;
  homeButton?: boolean;
}

const ErrorComponent = ({ message, homeButton, retry }: Props) => {
  return (
    <div className={styles["container"]}>
      <p className={styles["error-message"]}>{message}</p>
      <div className={styles["buttons"]}>
        {!!retry && <Button onClick={retry}>Retry</Button>}
        {!!homeButton && (
          <Button className={styles["home-button"]} type={"primary"}>
            <Link to={"/"}>Go home</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent;
