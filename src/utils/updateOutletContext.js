import { fetchUserDetails } from "./fetchUserDetails";
import { fetchUserTransactions } from "./fetchUserTransactions";

const updateOutletContext = async (setProfile, setTransactions, setIsLoading) => {
  console.log("updating context");
  setIsLoading(true);
  fetchUserDetails().then((profile) => {
    setProfile(profile);
    fetchUserTransactions().then((transactions) => {
      setTransactions(transactions);
      setIsLoading(false);
    });
  });
};

export default updateOutletContext;
