import React from "react";
import './AddService.scss';
import AppHeader from "../../containers/header/AppHeader";
import AppFooter from "../../containers/footer/AppFooter";


function AddService() {
    return(
    <div>
      <AppHeader/>
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
        <AppFooter/>
    </div>
    );
}
export default AddService;