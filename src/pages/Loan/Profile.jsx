import React from 'react';
import { useOutletContext } from 'react-router-dom';
import LoadingSpinner from "../../components/LoadingSpinner";

const Profile = () => {
  const [profile] = useOutletContext();

  const handleError = (error) => {
    console.error('Error displaying profile:', error);
    return <div>Error retrieving profile data.</div>; // Display user-friendly message
  };

  const formatJSON = (data) => {
    try {
      // Attempt to stringify the data for basic formatting
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return handleError(error); // Use error handling function
    }
  };

  return (
    <div>
      {profile ? (
        <pre>{formatJSON(profile)}</pre>
      ) : (
        <div className="h-screen flex justify-center items-center">
            <LoadingSpinner />
          </div>
      )}
    </div>
  );
};

export default Profile;
