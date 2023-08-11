import React from "react";
import './AddEsaRatecard.scss';
import AppHeader from "../../containers/header/AppHeader";
import AppFooter from "../../containers/footer/AppFooter";


function AddEsaRatecard() {
    return(
    <div>
      <AppHeader/>
      <div className="Id">
        <label>Enter your EsaValue: </label>
        <input
              className="input-style"
              placeholder="EsaValue"
              name="EsaValue"
              value=""
             
            
            />
        </div>
        <div className="Alphanumeric">

             <label>Enter your Esa Alphanumeric value: </label>
        <input
              className="input-style"
              placeholder="EsaAlphanumericValue"
              name="EsaAlphanumericValue"
              value=""
             
            />
        
        </div>
        <AppFooter/>
    </div>
    );
}
export default AddEsaRatecard;