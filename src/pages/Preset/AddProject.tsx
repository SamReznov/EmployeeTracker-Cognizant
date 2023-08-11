import React from "react";
import './AddProject.scss';
import AppHeader from "../../containers/header/AppHeader";
import AppFooter from "../../containers/footer/AppFooter";


function AddProject() {
    return(
    <div>
      <AppHeader/>
      <div className="Id">
        <label>Enter your Project Id: </label>
        <input
              className="input-style"
              placeholder="ProjectId"
              name="ProjectId"
              value=""
             
            
            />
        </div>
        <div className="Name">

             <label>Enter your Project Name: </label>
        <input
              className="input-style"
              placeholder="ProjectName"
              name="ProjectName"
              value=""
             
            />
        
        </div>
        <AppFooter/>
    </div>
    );
}
export default AddProject;