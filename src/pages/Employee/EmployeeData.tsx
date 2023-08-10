import React, { useEffect, useState } from "react";

import EmployeeService from "../../servises/EmployeeService";
import Entity from "../../components/Entity";
//import { Pagination,Row,Col,PaginationItem,PaginationLink } from "reactstrap";
import { Pagination } from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";
import { useOutletContext } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {employeePageInterface,employeeInterface} from '../../dataIntefaces/interfaces'
import EmployeeList from "./EmployeeList";




function EmployeeData() {
 
  const [selectedOutlet,setSelectedOutlet] = useOutletContext<any>();
 


    const EmployeeListPageData = {
      label:"EMPLOYEE",
      routes:["/addEmployee","/updateEmployee","deleteEmployee"]
    }

    

    useEffect(()=>{
      setSelectedOutlet(EmployeeListPageData);
    },[])

  

 

  return (

    <div>
        <EmployeeList/>
    </div>
    
  );
}

export default EmployeeData;
