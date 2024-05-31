import axios from "axios";

export const applyInsurance = async (reqBody) => {
  try {
    const token = localStorage.getItem("authorization");
    if (!token) throw new Error("Unauthorized: Token not found");
    const userResponse = await axios.post("https://techbuzzers.somee.com/applyInsuranceAndPayOneInstallment", reqBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return userResponse;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
