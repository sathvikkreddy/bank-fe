import axios from "axios";

export default useUser = async () => {
  const response = await axios.get("https://api.example.com/data", {
    headers: {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
    },
  });
  const user = response.body;
  return user;
};
