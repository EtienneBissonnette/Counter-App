import styles from "./LogoutBtn.module.css";
import { useNavigate } from "react-router-dom";
const LogoutBtn = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
    sessionStorage.clear()
  };
  
  return (
    <button className={styles.button} onClick={handleClick}>
      LOGOUT
    </button>
  );
};

export default LogoutBtn;
