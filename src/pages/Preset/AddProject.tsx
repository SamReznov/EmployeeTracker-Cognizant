import React from "react";
import './AddProject.scss';


function AddProject() {
    return(
    <div>
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
    </div>
    );
}
export default AddProject;