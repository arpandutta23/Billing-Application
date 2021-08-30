import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetUser } from "../action/userAction";
import img1 from "../img/img1.png";

const Profile = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetUser());
  }, []);

  const result = useSelector((state) => state.profile);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Profile</h1>
      <div className="card">
        <img
          src={img1}
          alt="Avatar"
          style={{ width: "50%", marginLeft: "5.5rem" }}
        ></img>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h3>Name - {result?.username}</h3>
            <h3>E-mail - {result?.email}</h3>
            <h3>Businessname - {result?.businessName}</h3>
            <h3>Address - {result?.address}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
