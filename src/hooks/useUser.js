import axios from "axios";
import { useState, useEffect } from "react";

function useUserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Replace this with your logic to fetch user details
        const token = localStorage.getItem("authorization");
        if (!token) new Error("Unauthorized");
        setIsLoading(true);
        const userResponse = await axios.get(
          "https://techbuzzers.somee.com/GetAllUserDetails",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        setUserDetails(userResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return { userDetails, isLoading, error };
}

export default useUserDetails;
