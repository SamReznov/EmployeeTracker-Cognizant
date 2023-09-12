import React, { useEffect, useState } from "react";
import EmployeeService from "../../servises/EmployeeService";
import Entity from "../../components/Entity";
import { Pagination } from "@mui/material";
import './EmployeeList.scss'
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "../../components/SearchBar";
import {employeePageInterface,employeeInterface,projectInterface} from '../../dataIntefaces/interfaces'
import { Button, Dropdown } from "react-bootstrap";
import ProjectService from "../../servises/ProjectService";
import { useSelector } from "react-redux";
import ExportExcel from "../../excel/ExportExcel";
import GeneralConfirmation from "../../components/ConfiramtionPOPUPS/GeneralConfirmation";






function EmployeeList(this: any) {
 
  const [page ,setPage] = useState<number|any>(1);
  const [name,setName] = useState<string|any>("");
  const [noOfPages,setNoOfPages] = useState<number|any>(1);
  const [employeePage, setEmployeePage] = useState<employeePageInterface>();
  const [projects,setProjects] = useState<projectInterface[]>([]);
  const [selectedProjectName,setSelectedProjectName] = useState<string>("Select Project");
  const [selectedProjectId,setSelectedProjectId] = useState<number|any>(0);
  const [errorMessage,setErrorMessage ] = useState("");
  const [employeeExcelData,setEmployeeExcelData]=useState<any[]>([]);
  const [showDialogue,setShowDialogue] = useState(false)
  const user  = useSelector((state:any)=>state.user.currentUser)
  const popupMessage = "Are You sure you want to export all data of "+selectedProjectName+" into excel?"
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
      EmployeeService.getEmployeeByProjectAndNamePage(page,selectedProjectId,name)
        .then((res) => {
          console.log(res.data)
          setEmployeePage(res.data);
          setNoOfPages(res.data.totalPages)
         
          console.log("no of pages " +res.data.totalPages )
          console.log("no of employee " + res.data.totalElements)
          setErrorMessage("");
        })
        .catch((err) => {
          console.log(err.response.data)
          setErrorMessage(err.response.data)
        });
        }, [page,noOfPages,selectedProjectId,name]);
        
      
      

      const onDropdownMenuSelectHandler = (e:any)=>{
        e.preventDefault();

        console.log(e.target.getAttribute("projectId"));
         setSelectedProjectId(e.target.getAttribute("projectId"));
         setNoOfPages(1);
         setPage(1);
        setSelectedProjectName(e.target.getAttribute("value"));
        
      }

    
    const onSearchHandler = (e:any)=>{
      setNoOfPages(1);
      setPage(1);
      setName(e);
    } 

    const onExportHandler = (e:any)=>{
      EmployeeService.getEmployeeByProjectAndNameForExcelData(selectedProjectId,name).then((response)=>{
      ExportExcel.exportToExcel(response.data,selectedProjectName+"_excel_export");
      })
      .catch((err)=>{
        console.log(err.data)
      })
     
    }


  return (

      <div>
        { showDialogue && <GeneralConfirmation setVisable = {setShowDialogue} message = {popupMessage} operationHandler = {onExportHandler}/>}
        

        <div className="displayFlex">
          <div className="dropdownItems">
              <span id="filterLabel">Filter By Project</span>
              <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width:'fit-content'}}>
                {selectedProjectName}
              </Dropdown.Toggle>

              <Dropdown.Menu onClick={onDropdownMenuSelectHandler}>
              <Dropdown.Item projectId={0} value="All Project">All Project</Dropdown.Item>
                {
                  projects.map((project:projectInterface)=>{
                      return <Dropdown.Item projectId={project.projectId} value={project.projectName}>{project.projectName}</Dropdown.Item>
                  })
                }

              </Dropdown.Menu>
            </Dropdown>
          </div>
          
          <div>
            <SearchBar onSearchHandler={onSearchHandler}/>
          </div>

          <div >
          <button className="btn btn-outline-success" onClick={()=>setShowDialogue(true)}>Export Data</button>
          </div>

       </div>

     
      

      {errorMessage ===""?<div className="table-container" role="table" aria-label="Destinations">
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
            Location
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
       <Pagination className="pagination"
        count={noOfPages}
        size="large"
        color="secondary"
        variant="outlined"
        shape="rounded"
        defaultPage={1}
        onChange={(event,value)=>{setPage(value)}}
      />
      </div>:<div className="errorMessage">{errorMessage}</div>}
      
      
    </div>

    
   
    
    
  );
}

export default EmployeeList;
