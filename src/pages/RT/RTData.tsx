import React, { useEffect } from "react";

import './RTData.scss';
import { useOutletContext } from "react-router-dom";



const RTData =  () =>{
  const [selectedOutlet,setSelectedOutlet] = useOutletContext<any>();

    const PsaPageData = {
      label:"RT",
      routes:["/addRT","/updateRT","/deleteRT"]
    }

    
    useEffect(()=>{
      setSelectedOutlet(PsaPageData);
    },[])


    return(
      <div className="App">
        This is RT data mock up page.
      </div>
    );
}
export default RTData;