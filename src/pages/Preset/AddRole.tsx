import React from "react";
import './AddRole.scss';
import AppHeader from "../../containers/header/AppHeader";
import AppFooter from "../../containers/footer/AppFooter";


function AddRole() {
    return(
    <div>
      <AppHeader/>
      <div className="Id">
        <label>Enter your Role Id: </label>
        <input
              className="input-style"
              placeholder="RoleId"
              name="RoleId"
              value=""
             
            
            />
        </div>
        <div className="Name">

             <label>Enter your Role Name: </label>
        <input
              className="input-style"
              placeholder="RoleName"
              name="RoleName"
              value=""
             
            />
        
        </div>
        <AppFooter/>
    </div>
    );
}
export default AddRole;