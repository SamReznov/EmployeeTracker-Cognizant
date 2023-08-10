import React from "react";
import './AddRole.scss';


function AddRole() {
    return(
    <div>
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
    </div>
    );
}
export default AddRole;