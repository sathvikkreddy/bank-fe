import axios from "axios";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

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
    if (userResponse.status === 401) {
      toast.error("Token expired. Login again!");
      redirect("/signin");
      return;
    }
    return userResponse.data;
  } catch (err) {
    return err.message;
  }
};
