// fetch last count of user
const fetchCount = async () => {
  const sessionToken = sessionStorage.getItem("session_token");
  const url = "http://localhost:8081/user/getcount";

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

// update count of user
const updateCount = async (count) => {
  const sessionToken = sessionStorage.getItem("session_token");
  const url = "http://localhost:8081/user/count";

  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: sessionToken, count: count }),
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

export { fetchCount, updateCount };
