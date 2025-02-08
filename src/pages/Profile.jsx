import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "../hooks";

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuthState();
  const isCurrentUser = user.$id === id;

  return (
    <div>
      <h1>Profile</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
