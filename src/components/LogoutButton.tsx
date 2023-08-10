import React from "react";

import { logOut } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import type { Dispatch } from 'redux'
import { type } from "os";
import { useNavigate } from "react-router-dom";
const LogoutButton = () => {
  
const dispatch:Dispatch = useDispatch();
const navigate=useNavigate()
const onClickhandler =(e:any)=>{
  e.preventDefault();
  dispatch(logOut({}))
  navigate("/login")
}
  return (
    <div>
      <button className="btn btn-outline-info" onClick={onClickhandler}>
      Log Out
    </button>
    </div>
  );
};

export default LogoutButton;
