import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import './PoData.scss';
import { useOutletContext } from "react-router-dom";
import POEntity from "../../components/POEntity";
import POService from "../../servises/POService";
import { Pagination } from "@mui/material";
import {poInterface} from '../../dataIntefaces/interfaces'
import POList from "./POList";
import { Dropdown } from "react-bootstrap";
import UploadPOBLOBData from "./UploadPOBLOBData";
// interface POList{
//     poNumber: string,
//     poManager: string,
//     dateIssued: string,
//     expiryDate: string,
//     extension: string,
//     account: string
// }



const PoData = () => {
  const [selectedOutlet,setSelectedOutlet] = useOutletContext<any>();
  const [selectedOption,setSelectedOption] = useState<string>("View PO Data");
  
    const PoPageData = {
      label:"PO",
      routes:["/addPO","/updatePO","/deletePO"]
    }

 
    
    useEffect(()=>{
      setSelectedOutlet(PoPageData);
      
    },[])

    const onClickHandler = (e:any)=>{
      e.preventDefault();
      console.log(e.target.getAttribute("value"))
      setSelectedOption(e.target.getAttribute("value"));
      
    }


    return (
      <div className="App">
        
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" >
            {selectedOption}
          </Dropdown.Toggle>

          <Dropdown.Menu onClick={onClickHandler}>
          <Dropdown.Item  value="View PO Data">View PO Data</Dropdown.Item>
          <Dropdown.Item  value="Upload PO BLOB Data">Upload PO BLOB Data</Dropdown.Item>

          </Dropdown.Menu>
      </Dropdown>
        {selectedOption==="View PO Data"?<POList/>:<UploadPOBLOBData/>}
      </div>
    );
}
export default PoData;