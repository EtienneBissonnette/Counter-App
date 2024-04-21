import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../API/Auth";

const useAuthUser = () => {
  const [username, setUsername] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      setIsLoading(true);
      const { success, data, error } = await userAuth();

      if (!success) {
        alert(`Issue authenticating: ${error}`);
        navigate("/login");
        setIsLoading(false);
        return;
      }

      setUsername(data.user);
      setIsLoading(false);
    };

    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { username, isLoading };
};
export default useAuthUser;
