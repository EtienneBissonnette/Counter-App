import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../API/Auth";
import Logo from "../../components/Logo";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clickEffect, setClickEffect] = useState({});

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);

    setClickEffect({
      transform: "translate(0px, -0.5px)",
      stroke: "#ad77e1",
    });
    const clickEffectTimeout = setTimeout(() => {
      setClickEffect({});
    }, 50);
    return () => clearTimeout(clickEffectTimeout);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    setClickEffect({
      transform: "translate(0px, -0.5px)",
      filter: "brightness(80%)",
    });
    const clickEffectTimeout = setTimeout(() => {
      setClickEffect({});
    }, 50);
    return () => clearTimeout(clickEffectTimeout);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { success, data, error } = await userLogin({ username, password });

    if (!success) {
      alert(error);
      return;
    }

    sessionStorage.setItem("session_token", data.token);
    navigate("/");
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <div className={styles.logo_container}>
        <Logo clickEffect={clickEffect} />
      </div>

      <div>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            maxLength={25}
            required={true}
            placeholder="Your username"
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required={true}
            placeholder="Your password"
          />
        </label>
      </div>
      <div>
        <button type="submit">LOGIN</button>
      </div>
    </form>
  );
};

export default Login;
