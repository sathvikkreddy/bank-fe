import { fetchUserDetails } from "./fetchUserDetails";
import { fetchUserTransactions } from "./fetchUserTransactions";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

const updateOutletContext = async (
  setProfile,
  setTransactions,
  setIsLoading
) => {
  try {
    console.log("updating context");
    setIsLoading(true);

    const profile = await fetchUserDetails();
    setProfile(profile);

    const transactions = await fetchUserTransactions();
    setTransactions(transactions);
  } catch (error) {
    if (error.message === "Unauthorized") {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("authorization");
      redirect("/login");
    } else {
      toast.error(`Error: ${error.message}`);
    }
  } finally {
    setIsLoading(false);
  }
};

export default updateOutletContext;
