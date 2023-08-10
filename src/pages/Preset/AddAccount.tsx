import React from "react";
import './AddAccount.scss';


function AddAccount() {
    return(
    <div>
      <div className="Id">
        <label>Enter your Account Id: </label>
        <input
              className="input-style"
              placeholder="AccountId"
              name="AccountId"
              value=""
             
            
            />
        </div>
        <div className="Name">

             <label>Enter your Account Name: </label>
        <input
              className="input-style"
              placeholder="AccountName"
              name="AccountName"
              value=""
             
            />
        
        </div>
    </div>
    );
}
export default AddAccount;