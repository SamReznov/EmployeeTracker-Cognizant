import { useState } from "react";
import { loginFailure,loginStart, loginSuccess } from "./userRedux";
import axios from "axios"


export const login =async (dispatch:any,user:any) =>{

    
    
   
    dispatch(loginStart({}));
    try{
        const res = await axios.post("http://localhost:8080/api/users/authenticate",user)
        dispatch(loginSuccess(res.data))
        console.log(res.data)
        localStorage.setItem('token',res.data.token)
        console.log("Local storage-------"+localStorage)

    }
    catch(err){
        dispatch(loginFailure)
    }
}