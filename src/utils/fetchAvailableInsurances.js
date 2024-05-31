import axios from "axios";

export const fetchAvailableInsurances = async () => {
  try {
    const token = localStorage.getItem("authorization");
    if (!token) throw new Error("Unauthorized: Token not found");
    const userResponse = await axios.get("https://techbuzzers.somee.com/getInsurancePolicies", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return userResponse.data;
  } catch (err) {
    return err.message;
  }
};
