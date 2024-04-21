import styles from "./Counter.module.css";
import { useEffect, useState } from "react";
import useAuthUser from "../../Hooks/useAuthUser";
import { fetchCount, updateCount } from "../../API/Count";
import LogoutBtn from "../../components/buttons/LogoutBtn";
import Loading from "../Loading";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const { username, isLoading } = useAuthUser();

  useEffect(() => {
    if (!username) {
      return;
    }

    const loadCount = async () => {
      const { success, data, error } = await fetchCount();

      if (!success) {
        alert(error);
        setIsDisabled(true);
        return;
      }

      setCount(data.count);
    };

    loadCount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.page_container}>
      <div className={styles.counter_container}>
        <h1>{`Welcome ${username}`}</h1>
        <button
          disabled={isDisabled}
          onClick={() => {
            updateCount(count + 1);
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
      </div>

      <LogoutBtn />
    </div>
  );
};

export default Counter;
