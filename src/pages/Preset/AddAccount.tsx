import React from "react";
import './AddAccount.scss';
import AppHeader from "../../containers/header/AppHeader";
import AppFooter from "../../containers/footer/AppFooter";


function AddAccount() {
    return(
    <div>
      <AppHeader/>
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
        <AppFooter/>
    </div>
    );
}
export default AddAccount;