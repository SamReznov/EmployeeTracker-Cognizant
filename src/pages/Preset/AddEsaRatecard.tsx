import React from "react";
import './AddEsaRatecard.scss';


function AddEsaRatecard() {
    return(
    <div>
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
    </div>
    );
}
export default AddEsaRatecard;