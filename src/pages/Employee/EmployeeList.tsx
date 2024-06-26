import React, { useEffect, useState } from "react";

import EmployeeService from "../../servises/EmployeeService";
import Entity from "../../components/Entity";
//import { Pagination,Row,Col,PaginationItem,PaginationLink } from "reactstrap";
import { Pagination } from "@mui/material";
import './EmployeeList.scss'
import "bootstrap/dist/css/bootstrap.css";
import { useOutletContext } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import {employeePageInterface,employeeInterface,projectInterface} from '../../dataIntefaces/interfaces'
import { Dropdown } from "react-bootstrap";
import ProjectService from "../../servises/ProjectService";
import { useSelector } from "react-redux";





function EmployeeList() {
 
  const [page ,setPage] = useState<number|any>(1);
  const [noOfPages,setNoOfPages] = useState<number|any>(1);
  const [employeePage, setEmployeePage] = useState<employeePageInterface>();
  const [projects,setProjects] = useState<projectInterface[]>([]);
  const [selectedProjectName,setSelectedProjectName] = useState<string>("Select Project");
  const [selectedProjectId,setSelectedProjectId] = useState<number|any>(0);
  

  const user  = useSelector((state:any)=>state.user.currentUser)

  useEffect(()=>{
    ProjectService.getProject().then((res)=>{
      setProjects(res.data);
      console.log(res.data)
      console.log(user) 
    })
    .catch((err)=>{
      console.log(err.data)
    })
  },[])
    

    useEffect(() => {
      EmployeeService.getEmployeeByPage(page,selectedProjectId)
  
        .then((res) => {
          console.log(res.data)
          setEmployeePage(res.data);
          setNoOfPages(res.data.totalPages)
         
          console.log("no of pages " +res.data.totalPages )
          console.log("no of employee " + res.data.totalElements)
          
        })
        .catch((err) => {
          console.log(err);
        });
        }, [page,noOfPages,selectedProjectId]);
        
      
      

      const onClickHandler = (e:any)=>{
        e.preventDefault();

        console.log(e.target.getAttribute("projectId"));
         setSelectedProjectId(e.target.getAttribute("projectId"));
         setNoOfPages(1);
         setPage(1);
        setSelectedProjectName(e.target.getAttribute("value"));
        
      }
  

 

  return (

      <div>
          <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" >
            {selectedProjectName}
          </Dropdown.Toggle>

          <Dropdown.Menu onClick={onClickHandler}>
          <Dropdown.Item projectId={0} value="All Project">All Project</Dropdown.Item>
            {
              projects.map((project:projectInterface)=>{
                  return <Dropdown.Item projectId={project.projectId} value={project.projectName}>{project.projectName}</Dropdown.Item>
              })
            }

          </Dropdown.Menu>
    </Dropdown>
      
      <div className="table-container" role="table" aria-label="Destinations">
        <div className="flex-table header" role="rowgroup">
          <div className="flex-row first" role="columnheader">
            Emp Id{}
          </div>

          <div className="flex-row" role="columnheader">
            First Name
          </div>

          <div className="flex-row" role="columnheader">
            Last Name
          </div>

          <div className="flex-row" role="columnheader">
            Ofc Location
          </div>

          <div className="flex-row" role="columnheader">
            Update Operation
          </div>

          <div className="flex-row" role="columnheader">
            More Details
          </div>
        </div>
        

        {employeePage?.content.map((item: employeeInterface, index: any) => {
          return (
            <div>
              <Entity
    
                {...{ ...item }}
              />
            </div>
          );
        })}
       
      </div>
      <Pagination className="pagination"
        count={noOfPages}
        size="large"
        color="secondary"
        variant="outlined"
        shape="rounded"
        defaultPage={1}
        onChange={(event,value)=>{setPage(value)}}
      />
      
    </div>

    
   
    
    
  );
}

export default EmployeeList;
