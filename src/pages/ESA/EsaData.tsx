import React, { useEffect } from "react";

import './EsaData.scss';
import { useOutletContext } from "react-router-dom";
import { Pagination } from "@mui/material";
import {Container,Box} from "@mui/material";

const EsaData = () => {
  const [selectedOutlet,setSelectedOutlet] = useOutletContext<any>();

    const EsaPageData = {
      label:"ESA",
      routes:["/addESA","/updateESA","/deleteESA"]
    }

    
    useEffect(()=>{
      setSelectedOutlet(EsaPageData);
    },[])


    return(
      <div >
        This is ESA data mock up page.
      </div>
    );
}
export default EsaData;