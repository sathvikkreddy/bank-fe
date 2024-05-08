import axios from "axios";
import { useState, useEffect } from "react";

function useUser() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("authorization");
      if (!token) throw new Error("Unauthorized: Token not found");

      setIsLoading(true);
      const userResponse = await axios.get(
        "https://techbuzzers.somee.com/GetUserDetails",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(userResponse.data);
      setIsLoading(false);
      return userResponse.data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  };

  useEffect(() => {
    fetchUserDetails().then();
  }, []);

  return { profile, isLoading, error };
}

export default useUser;
