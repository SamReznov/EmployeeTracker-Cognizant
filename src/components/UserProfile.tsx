import React from "react";
import { useSelector } from "react-redux";


const Profile = () => {
  const user  = useSelector((state:any)=>state.user.currentUser)
  const isLoading  = useSelector((state:any)=>state.user.isFetching)

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    user && (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    )
  );
};

export default Profile;
