const VITE_BACKEND_HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME

//Authenticate user
const userAuth = async () => {
  const sessionToken = sessionStorage.getItem("session_token");
  const url = `http://${VITE_BACKEND_HOSTNAME}:8081/authenticate`;

  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: sessionToken }),
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "An unknown error occurred");
      }
      return { success: true, data };
    })
    .catch((error) => {
      console.error("Error:", error.message);
      return { success: false, error: error.message };
    });
};

//Create new user or login user
const userLogin = async (user) => {
  const url = `http://${VITE_BACKEND_HOSTNAME}:8081/login`;

  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "An unknown error occurred");
      }
      return { success: true, data };
    })
    .catch((error) => {
      console.error("Error:", error.message);
      return { success: false, error: error.message };
    });
};

export { userAuth, userLogin };
