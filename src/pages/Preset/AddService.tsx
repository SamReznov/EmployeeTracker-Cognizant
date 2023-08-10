import React from "react";
import './AddService.scss';


function AddService() {
    return(
    <div>
      <div className="Id">
        <label>Enter your Service Id: </label>
        <input
              className="input-style"
              placeholder="ServiceId"
              name="ServiceId"
              value=""
             
            
            />
        </div>
        <div className="Name">

             <label>Enter your Service Name: </label>
        <input
              className="input-style"
              placeholder="ServiceName"
              name="ServiceName"
              value=""
             
            />
        
        </div>
    </div>
    );
}
export default AddService;