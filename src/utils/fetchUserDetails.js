import axios from "axios";

export const fetchUserDetails = async () => {
  try {
    const token = localStorage.getItem("authorization");
    if (!token) throw new Error("Unauthorized: Token not found");

    const userResponse = await axios.get(
      "https://techbuzzers.somee.com/GetUserDetails",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return userResponse.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw new Error(err.message);
    }
  }
};
